import { Component, computed, input } from '@angular/core';
import { cx, type LcarsColor } from '../types';

@Component({
  selector: 'lcars-gauge',
  standalone: true,
  template: `
    <span class="lcars-gauge__value">{{ rounded() }}@if (unit()) {<small>{{ unit() }}</small>}</span>
    @if (label()) {<span class="lcars-gauge__label">{{ label() }}</span>}
  `,
  host: { '[class]': 'cls()', '[style.--value]': 'value()' },
})
export class LcarsGaugeComponent {
  readonly value = input.required<number>();
  readonly color = input<LcarsColor>('primary');
  readonly size = input<'sm' | 'default' | 'lg'>('default');
  readonly label = input<string>('');
  readonly unit = input<string>('%');
  protected readonly rounded = computed(() => Math.round(this.value()));
  protected readonly cls = computed(() =>
    cx('lcars-gauge', `lcars-gauge--${this.color()}`, this.size() !== 'default' && `lcars-gauge--${this.size()}`)
  );
}

@Component({
  selector: 'lcars-bargraph',
  standalone: true,
  template: `@for (v of values(); track $index) {<div class="lcars-bargraph__bar" [style.--value]="v"></div>}`,
  host: { '[class]': 'cls()' },
})
export class LcarsBarGraphComponent {
  readonly values = input.required<number[]>();
  readonly mono = input(false);
  readonly live = input(false);
  protected readonly cls = computed(() =>
    cx('lcars-bargraph', this.mono() && 'lcars-bargraph--mono', this.live() && 'lcars-bargraph--live')
  );
}

export interface LcarsCascadeLine {
  text: string;
  tone?: 'ok' | 'alert';
}
@Component({
  selector: 'lcars-cascade',
  standalone: true,
  template: `
    <div class="lcars-cascade__stream">
      @for (l of doubled(); track $index) {
        <span [class]="lineCls(l)">{{ l.text }}</span>
      }
    </div>
  `,
  host: { '[class]': 'cls()', style: 'display:block' },
})
export class LcarsDataCascadeComponent {
  readonly lines = input.required<LcarsCascadeLine[]>();
  readonly fast = input(false);
  readonly paused = input(false);
  protected readonly doubled = computed(() => [...this.lines(), ...this.lines()]);
  protected readonly cls = computed(() =>
    cx('lcars-cascade', this.fast() && 'lcars-cascade--fast', this.paused() && 'lcars-cascade--paused')
  );
  protected lineCls(l: LcarsCascadeLine): string {
    return cx('lcars-cascade__line', l.tone === 'alert' && 'is-alert', l.tone === 'ok' && 'is-ok');
  }
}

@Component({
  selector: 'lcars-warpcore',
  standalone: true,
  template: `<div class="lcars-warpcore__plasma"></div><div class="lcars-warpcore__core"></div>`,
  host: { '[class]': 'cls()', '[style.--rate]': 'rateCss()', style: 'display:block' },
})
export class LcarsWarpCoreComponent {
  readonly state = input<'running' | 'offline' | 'critical'>('running');
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
  readonly rate = input<number>();
  protected readonly rateCss = computed(() => (this.rate() != null ? `${this.rate()}s` : null));
  protected readonly cls = computed(() =>
    cx(
      'lcars-warpcore',
      this.state() === 'offline' && 'lcars-warpcore--offline',
      this.state() === 'critical' && 'lcars-warpcore--critical',
      this.orientation() === 'horizontal' && 'lcars-warpcore--horizontal'
    )
  );
}

@Component({
  selector: 'lcars-alert',
  standalone: true,
  template: `
    <span class="lcars-alert__cap"></span>
    <span class="lcars-alert__text">@if (text()) { {{ text() }} } @else { <ng-content /> }</span>
    <span class="lcars-alert__cap"></span>
  `,
  host: { '[class]': 'cls()' },
})
export class LcarsAlertComponent {
  readonly condition = input<'red' | 'yellow' | 'blue' | 'green'>('red');
  readonly flash = input(false);
  readonly solid = input(false);
  readonly text = input<string>('');
  protected readonly cls = computed(() =>
    cx('lcars-alert', `lcars-alert--${this.condition()}`, this.flash() && 'lcars-alert--flash', this.solid() && 'lcars-alert--solid')
  );
}
