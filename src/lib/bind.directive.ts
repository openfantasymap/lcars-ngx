import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';
import { bind, type LcarsCoreStore } from '@openfantasymap/lcars-core/js';
import { LcarsStore } from './store';

/**
 * Bind a store to this element's subtree so `data-bind-*` markup (and inline
 * SVG) updates live. Accepts the LcarsStore service or a raw core store.
 *
 *   <div lcarsBind [lcarsBind]="store"> …data-bind-* markup… </div>
 */
@Directive({ selector: '[lcarsBind]', standalone: true })
export class LcarsBindDirective implements OnInit, OnDestroy {
  readonly lcarsBind = input.required<LcarsStore | LcarsCoreStore>();
  private readonly el = inject<ElementRef<Element>>(ElementRef);
  private unbind?: () => void;

  ngOnInit(): void {
    const s = this.lcarsBind() as LcarsStore & { raw?: () => LcarsCoreStore };
    const core: LcarsCoreStore = typeof s.raw === 'function' ? s.raw() : (s as unknown as LcarsCoreStore);
    this.unbind = bind(this.el.nativeElement, core);
  }
  ngOnDestroy(): void {
    this.unbind?.();
  }
}
