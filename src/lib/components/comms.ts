import { Component, computed, input } from '@angular/core';
import { cx, type LcarsColor } from '../types';

@Component({
  selector: 'lcars-comms',
  standalone: true,
  template: `
    @if (title() || freq()) {
      <div class="lcars-comms__header">
        @if (title()) {<span class="lcars-comms__title">{{ title() }}</span>}
        @if (freq()) {<span class="lcars-comms__freq">{{ freq() }}</span>}
      </div>
    }
    <ng-content />
  `,
  host: { class: 'lcars-comms' },
})
export class LcarsCommsComponent {
  readonly title = input<string>('');
  readonly freq = input<string>('');
}

@Component({
  selector: 'lcars-comms-channel',
  standalone: true,
  template: `
    <span class="lcars-indicator__light"></span>
    <span class="lcars-comms__name">{{ name() }}</span>
    <div class="lcars-comms__signal" [style.--signal]="signal()"><div class="lcars-comms__signal-fill"></div></div>
  `,
  host: { '[class]': 'cls()', style: 'display:grid' },
})
export class LcarsCommsChannelComponent {
  readonly name = input.required<string>();
  readonly signal = input.required<number>();
  readonly active = input(false);
  protected readonly cls = computed(() => cx('lcars-comms__channel', this.active() && 'is-active'));
}

@Component({
  selector: 'lcars-waveform',
  standalone: true,
  template: `@for (v of values(); track $index) {<span class="lcars-waveform__bar" [style.--value]="v"></span>}`,
  host: { '[class]': 'cls()' },
})
export class LcarsWaveformComponent {
  readonly values = input.required<number[]>();
  readonly color = input<LcarsColor>('accent');
  readonly live = input(false);
  protected readonly cls = computed(() =>
    cx('lcars-waveform', `lcars-waveform--${this.color()}`, this.live() && 'lcars-waveform--live')
  );
}

@Component({
  selector: 'lcars-hail',
  standalone: true,
  template: `
    <span class="lcars-hail__icon"></span>
    <div class="lcars-hail__body">
      @if (title()) {<span class="lcars-hail__title">{{ title() }}</span>}
      @if (subtitle()) {<span class="lcars-hail__subtitle">{{ subtitle() }}</span>}
    </div>
    <div class="lcars-hail__actions"><ng-content /></div>
  `,
  host: { '[class]': 'cls()' },
})
export class LcarsHailComponent {
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly variant = input<'incoming' | 'secure' | 'priority'>('incoming');
  protected readonly cls = computed(() => cx('lcars-hail', `lcars-hail--${this.variant()}`));
}
