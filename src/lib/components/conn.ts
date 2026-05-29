import { Component, computed, input } from '@angular/core';
import { cx, len, type LcarsColor } from '../types';

@Component({
  selector: 'lcars-compass',
  standalone: true,
  template: `
    <span class="lcars-compass__cardinal lcars-compass__cardinal--n">N</span>
    <span class="lcars-compass__cardinal lcars-compass__cardinal--e">E</span>
    <span class="lcars-compass__cardinal lcars-compass__cardinal--s">S</span>
    <span class="lcars-compass__cardinal lcars-compass__cardinal--w">W</span>
    <div class="lcars-compass__needle"></div>
    <div class="lcars-compass__hub"></div>
    <div class="lcars-compass__readout">{{ headingText() }}@if (mark() !== undefined) {<small>MARK {{ markRounded() }}</small>}</div>
  `,
  host: { '[class]': 'cls()', '[style.--heading]': 'heading()', '[style.--compass-size]': 'sizeCss()' },
})
export class LcarsCompassComponent {
  readonly heading = input.required<number>();
  readonly mark = input<number>();
  readonly color = input<LcarsColor>();
  readonly size = input<string | number>();
  protected readonly headingText = computed(() => String(Math.round(this.heading())).padStart(3, '0'));
  protected readonly markRounded = computed(() => Math.round(this.mark() ?? 0));
  protected readonly sizeCss = computed(() => len(this.size()));
  protected readonly cls = computed(() => cx('lcars-compass', this.color() && `lcars-compass--${this.color()}`));
}

@Component({
  selector: 'lcars-scanner',
  standalone: true,
  template: `<div class="lcars-scanner__grid"></div><div class="lcars-scanner__sweep"></div><ng-content /><div class="lcars-scanner__hub"></div>`,
  host: { class: 'lcars-scanner', '[style.--rate]': 'rateCss()', '[style.--scope-r]': 'scopeCss()', style: 'display:block' },
})
export class LcarsScannerComponent {
  readonly rate = input<number>();
  readonly scopeR = input<string | number>();
  protected readonly rateCss = computed(() => (this.rate() != null ? `${this.rate()}s` : null));
  protected readonly scopeCss = computed(() => len(this.scopeR()));
}

@Component({
  selector: 'lcars-scanner-contact',
  standalone: true,
  template: ``,
  host: { '[class]': 'cls()', '[style.--range]': 'range()', '[style.--bearing]': 'bearing()' },
})
export class LcarsScannerContactComponent {
  readonly range = input.required<number>();
  readonly bearing = input.required<number>();
  readonly kind = input<'default' | 'hostile' | 'neutral'>('default');
  protected readonly cls = computed(() =>
    cx('lcars-scanner__contact', this.kind() !== 'default' && `lcars-scanner__contact--${this.kind()}`)
  );
}

@Component({
  selector: 'lcars-starmap',
  standalone: true,
  template: `<ng-content />`,
  host: { class: 'lcars-starmap', style: 'display:block' },
})
export class LcarsStarmapComponent {}

@Component({
  selector: 'lcars-star',
  standalone: true,
  template: ``,
  host: { '[class]': 'cls()', '[style.--x]': 'x()', '[style.--y]': 'y()' },
})
export class LcarsStarComponent {
  readonly x = input.required<number>();
  readonly y = input.required<number>();
  readonly variant = input<'giant' | 'dim'>();
  protected readonly cls = computed(() => cx('lcars-starmap__star', this.variant() && `lcars-starmap__star--${this.variant()}`));
}

@Component({
  selector: 'lcars-starmap-ship',
  standalone: true,
  template: ``,
  host: { class: 'lcars-starmap__ship', '[style.--x]': 'x()', '[style.--y]': 'y()', '[style.--rot]': 'rot()' },
})
export class LcarsStarmapShipComponent {
  readonly x = input.required<number>();
  readonly y = input.required<number>();
  readonly rot = input(0);
}

@Component({
  selector: 'lcars-starmap-waypoint',
  standalone: true,
  template: ``,
  host: { class: 'lcars-starmap__waypoint', '[style.--x]': 'x()', '[style.--y]': 'y()' },
})
export class LcarsStarmapWaypointComponent {
  readonly x = input.required<number>();
  readonly y = input.required<number>();
}

@Component({
  selector: 'lcars-starmap-course',
  standalone: true,
  template: ``,
  host: {
    class: 'lcars-starmap__course',
    '[style.--x]': 'x()',
    '[style.--y]': 'y()',
    '[style.--len]': 'lenCss()',
    '[style.--angle]': 'angle()',
  },
})
export class LcarsStarmapCourseComponent {
  readonly x = input.required<number>();
  readonly y = input.required<number>();
  readonly length = input.required<string | number>();
  readonly angle = input.required<number>();
  protected readonly lenCss = computed(() => len(this.length()));
}

@Component({
  selector: 'lcars-starmap-label',
  standalone: true,
  template: `<ng-content />`,
  host: { class: 'lcars-starmap__label' },
})
export class LcarsStarmapLabelComponent {}

export interface LcarsHelmReadout {
  label: string;
  value: string | number;
  color?: LcarsColor;
}
@Component({
  selector: 'lcars-helm',
  standalone: true,
  template: `
    <div class="lcars-helm__head">
      <div class="lcars-helm__metric">
        <span class="lcars-helm__label">Warp</span>
        <span class="lcars-helm__value">{{ warp().toFixed(1) }}</span>
      </div>
      <div class="lcars-helm__metric" style="align-items:flex-end">
        <span class="lcars-helm__label">Impulse</span>
        <span class="lcars-helm__value">{{ impulseRounded() }}%</span>
      </div>
    </div>
    <div class="lcars-helm__bar lcars-helm__bar--warp" style="--segments:9"><div class="lcars-helm__fill"></div></div>
    <div class="lcars-helm__bar lcars-helm__bar--impulse" style="--segments:10"><div class="lcars-helm__fill"></div></div>
    <span class="lcars-helm__throttle-label">Throttle · {{ throttleRounded() }}%</span>
    <div class="lcars-helm__bar lcars-helm__bar--throttle" style="--segments:20"><div class="lcars-helm__fill"></div></div>
    @if (readouts().length) {
      <div class="lcars-helm__readouts">
        @for (r of readouts(); track $index) {
          <div [class]="readoutCls(r)">
            <span class="lcars-readout__label">{{ r.label }}</span>
            <span class="lcars-readout__value">{{ r.value }}</span>
          </div>
        }
      </div>
    }
    <ng-content />
  `,
  host: { class: 'lcars-helm', '[style.--warp]': 'warp()', '[style.--impulse]': 'impulse()', '[style.--throttle]': 'throttle()' },
})
export class LcarsHelmComponent {
  readonly warp = input.required<number>();
  readonly impulse = input.required<number>();
  readonly throttle = input.required<number>();
  readonly readouts = input<LcarsHelmReadout[]>([]);
  protected readonly impulseRounded = computed(() => Math.round(this.impulse()));
  protected readonly throttleRounded = computed(() => Math.round(this.throttle()));
  protected readoutCls(r: LcarsHelmReadout): string {
    return cx('lcars-readout', r.color && `lcars-readout--${r.color}`);
  }
}
