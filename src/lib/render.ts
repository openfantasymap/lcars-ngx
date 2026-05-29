import {
  Component,
  ComponentRef,
  Directive,
  Type,
  ViewContainerRef,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  LcarsRowComponent,
  LcarsColumnComponent,
  LcarsPanelComponent,
  LcarsSpacerComponent,
  LcarsGrowComponent,
} from './components/layout';

/**
 * A node in a JSON-described screen. `type` selects a structural layout node
 * (`row`/`column`/`panel`/`spacer`/`grow`) or a registry widget key. Structural
 * nodes recurse through `content`; any other field is passed to the resolved
 * widget by its registry definition.
 */
export interface LcarsNode {
  type: string;
  content?: LcarsNode[];
  [key: string]: unknown;
}

/** How a registry widget is built from a node. */
export interface LcarsWidgetDef {
  /** The standalone component to render. */
  component: Type<unknown>;
  /** Map node fields → component (signal) inputs. */
  inputs?: (node: LcarsNode) => Record<string, unknown>;
  /** Subscribe to Angular outputs by name (e.g. `checkedChange`). */
  outputs?: Record<string, (event: unknown, node: LcarsNode) => void>;
  /** Listen to native DOM events on the host element (e.g. `click`). */
  events?: Record<string, (event: Event, node: LcarsNode) => void>;
  /** Text content projected into the component (e.g. a button label). */
  text?: (node: LcarsNode) => string;
}

/** Maps a node `type` to the widget that renders it. App-supplied. */
export type LcarsWidgetRegistry = Record<string, LcarsWidgetDef>;

interface OutputSub {
  unsubscribe(): void;
}

/**
 * Materializes a registry widget for a node: creates the component, sets its
 * inputs, subscribes its outputs, binds native events, and projects text.
 * (NgComponentOutlet can't bind outputs/events, hence the manual approach.)
 */
@Directive({ selector: '[lcarsWidgetOutlet]', standalone: true })
export class LcarsWidgetOutletDirective implements OnInit, OnDestroy {
  readonly def = input.required<LcarsWidgetDef>({ alias: 'lcarsWidgetOutlet' });
  readonly node = input.required<LcarsNode>();

  private readonly vcr = inject(ViewContainerRef);
  private readonly doc = inject(DOCUMENT);
  private ref?: ComponentRef<unknown>;
  private subs: OutputSub[] = [];
  private detach: Array<() => void> = [];

  ngOnInit(): void {
    const def = this.def();
    const node = this.node();

    const text = def.text ? def.text(node) : undefined;
    const projectableNodes =
      text !== undefined && text !== null ? [[this.doc.createTextNode(String(text))]] : undefined;

    this.ref = projectableNodes
      ? this.vcr.createComponent(def.component, { projectableNodes })
      : this.vcr.createComponent(def.component);

    const inputs = def.inputs ? def.inputs(node) : {};
    for (const key of Object.keys(inputs)) {
      this.ref.setInput(key, inputs[key]);
    }

    if (def.outputs) {
      const instance = this.ref.instance as Record<string, { subscribe?: (fn: (e: unknown) => void) => OutputSub }>;
      for (const key of Object.keys(def.outputs)) {
        const out = instance[key];
        if (out && typeof out.subscribe === 'function') {
          this.subs.push(out.subscribe((e: unknown) => def.outputs![key](e, node)));
        }
      }
    }

    if (def.events) {
      const el = this.ref.location.nativeElement as HTMLElement;
      for (const evt of Object.keys(def.events)) {
        const handler = (e: Event) => def.events![evt](e, node);
        el.addEventListener(evt, handler);
        this.detach.push(() => el.removeEventListener(evt, handler));
      }
    }

    this.ref.changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
    this.detach.forEach((fn) => fn());
    this.ref?.destroy();
  }
}

/**
 * Recursive, registry-driven screen renderer. Structural node types map to the
 * lcars layout components and recurse over `content`; everything else resolves
 * through the supplied registry. Reusable across any LCARS app — it carries no
 * domain knowledge; the consumer's registry owns widget semantics.
 *
 * ```html
 * <lcars-render [node]="screen" [registry]="myRegistry" />
 * ```
 */
@Component({
  selector: 'lcars-render',
  standalone: true,
  imports: [
    LcarsRowComponent,
    LcarsColumnComponent,
    LcarsPanelComponent,
    LcarsSpacerComponent,
    LcarsGrowComponent,
    LcarsWidgetOutletDirective,
  ],
  template: `
    @switch (node().type) {
      @case ('row') {
        <lcars-row [fill]="flag('fill')">
          @for (c of children(); track $index) {
            <lcars-render [node]="c" [registry]="registry()" />
          }
        </lcars-row>
      }
      @case ('column') {
        <lcars-column [fill]="flag('fill')">
          @for (c of children(); track $index) {
            <lcars-render [node]="c" [registry]="registry()" />
          }
        </lcars-column>
      }
      @case ('panel') {
        <lcars-panel>
          @for (c of children(); track $index) {
            <lcars-render [node]="c" [registry]="registry()" />
          }
        </lcars-panel>
      }
      @case ('spacer') { <lcars-spacer /> }
      @case ('grow') { <lcars-grow /> }
      @default {
        @if (def(); as d) {
          <ng-container [lcarsWidgetOutlet]="d" [node]="node()" />
        }
      }
    }
  `,
})
export class LcarsRenderComponent {
  readonly node = input.required<LcarsNode>();
  readonly registry = input.required<LcarsWidgetRegistry>();

  protected readonly def = computed(() => this.registry()[this.node().type]);
  protected readonly children = computed(() => this.node().content ?? []);

  protected flag(key: string): boolean {
    return !!(this.node() as Record<string, unknown>)[key];
  }
}
