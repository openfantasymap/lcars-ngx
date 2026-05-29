import { Component, computed, input } from '@angular/core';
import { cx, type LcarsStatus } from '../types';

@Component({
  selector: 'lcars-conduit',
  standalone: true,
  template: `<div class="lcars-conduit__plasma"></div>`,
  host: { '[class]': 'cls()', '[style.--load]': 'load()', '[style.--rate]': 'rateCss()', style: 'display:block' },
})
export class LcarsConduitComponent {
  readonly load = input.required<number>();
  readonly rate = input<number>();
  readonly state = input<'normal' | 'critical' | 'offline'>('normal');
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  protected readonly rateCss = computed(() => (this.rate() != null ? `${this.rate()}s` : null));
  protected readonly cls = computed(() =>
    cx(
      'lcars-conduit',
      this.state() === 'critical' && 'lcars-conduit--critical',
      this.state() === 'offline' && 'lcars-conduit--offline',
      this.orientation() === 'vertical' && 'lcars-conduit--vertical'
    )
  );
}

@Component({
  selector: 'lcars-power',
  standalone: true,
  template: `
    @if (title() || total()) {
      <div class="lcars-power__header">
        @if (title()) {<span class="lcars-power__title">{{ title() }}</span>}
        @if (total()) {<span class="lcars-power__total">{{ total() }}</span>}
      </div>
    }
    <ng-content />
  `,
  host: { class: 'lcars-power' },
})
export class LcarsPowerComponent {
  readonly title = input<string>('');
  readonly total = input<string>('');
}

@Component({
  selector: 'lcars-power-row',
  standalone: true,
  template: `
    <span class="lcars-power__label">{{ label() }}</span>
    <div class="lcars-power__bar" [style.--value]="value()"><div class="lcars-power__fill"></div></div>
    <span class="lcars-power__value">{{ display() || rounded() + '%' }}</span>
  `,
  host: { '[class]': 'cls()', style: 'display:grid' },
})
export class LcarsPowerRowComponent {
  readonly label = input.required<string>();
  readonly value = input.required<number>();
  readonly state = input<'nominal' | 'warning' | 'critical' | 'offline'>('nominal');
  readonly display = input<string>('');
  protected readonly rounded = computed(() => Math.round(this.value()));
  protected readonly cls = computed(() => cx('lcars-power__row', this.state() !== 'nominal' && `is-${this.state()}`));
}

@Component({
  selector: 'lcars-msd',
  standalone: true,
  template: `
    <div [class]="sec('lcars-msd__saucer', saucer())"></div>
    <div [class]="sec('lcars-msd__neck', neckStatus())"></div>
    <div [class]="sec('lcars-msd__hull', hull())"></div>
    <div class="lcars-msd__strut lcars-msd__strut--left"></div>
    <div class="lcars-msd__strut lcars-msd__strut--right"></div>
    <div [class]="sec('lcars-msd__nacelle lcars-msd__nacelle--left', nacelleLeft())"></div>
    <div [class]="sec('lcars-msd__nacelle lcars-msd__nacelle--right', nacelleRight())"></div>
    @if (name()) {<span class="lcars-msd__label">{{ name() }}</span>}
  `,
  host: { class: 'lcars-msd' },
})
export class LcarsMsdComponent {
  readonly saucer = input<LcarsStatus>('nominal');
  readonly neck = input<LcarsStatus>();
  readonly hull = input<LcarsStatus>('nominal');
  readonly nacelleLeft = input<LcarsStatus>('nominal');
  readonly nacelleRight = input<LcarsStatus>('nominal');
  readonly name = input<string>('');
  protected readonly neckStatus = computed(() => this.neck() ?? this.saucer());
  protected sec(extra: string, status: LcarsStatus): string {
    return cx('lcars-msd__section', extra, `is-${status}`);
  }
}
