import { AfterViewInit, Component, ElementRef, OnDestroy, inject, input, output } from '@angular/core';
import { loadOverview, type OverviewApi, type LcarsCoreStore } from '@openfantasymap/lcars-core/js';
import { LcarsStore } from '../store';

/**
 * General schematic from your own annotated SVG. Pass markup, an <svg>, or a
 * `.svg` URL; annotate regions with data-lcars-* (see core docs). Bind a store
 * (or autoConnect) to go live.
 *
 *   <lcars-overview [svg]="svgMarkup" title="Systems" [autoConnect]="true"
 *                   (regionSelect)="onSelect($event)"></lcars-overview>
 */
@Component({
  selector: 'lcars-overview',
  standalone: true,
  template: `
    <div class="lcars-overview__header">
      @if (title()) {<span class="lcars-overview__title">{{ title() }}</span>}
      <span class="lcars-overview__summary" [attr.data-locked]="summary() ? '' : null">{{ summary() }}</span>
    </div>
    <div class="lcars-overview__stage"></div>
    @if (legend()) {<div class="lcars-overview__legend"></div>}
  `,
  host: { class: 'lcars-overview' },
})
export class LcarsOverviewComponent implements AfterViewInit, OnDestroy {
  readonly svg = input.required<string | SVGElement>();
  readonly title = input<string>('');
  readonly summary = input<string>('');
  readonly legend = input(true);
  readonly store = input<LcarsStore | LcarsCoreStore>();
  readonly autoConnect = input(false);
  readonly regionSelect = output<{ id: string; el: Element }>();
  readonly ready = output<OverviewApi>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private unbind?: () => void;

  ngAfterViewInit(): void {
    loadOverview(this.host.nativeElement, this.svg(), {
      legend: this.legend(),
      onSelect: (id, el) => this.regionSelect.emit({ id, el }),
    }).then((ov) => {
      const s = this.store() as (LcarsStore & { raw?: () => LcarsCoreStore }) | LcarsCoreStore | undefined;
      if (s) {
        const core: LcarsCoreStore =
          typeof (s as any).raw === 'function' ? (s as any).raw() : (s as LcarsCoreStore);
        this.unbind = ov.bind(core);
      } else if (this.autoConnect()) {
        ov.connect();
        this.unbind = (ov as unknown as { _unbind?: () => void })._unbind;
      }
      this.ready.emit(ov);
    });
  }

  ngOnDestroy(): void {
    this.unbind?.();
  }
}
