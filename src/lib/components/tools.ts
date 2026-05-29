import { Component, computed, input, model } from '@angular/core';
import { cx, type LcarsColor } from '../types';

@Component({
  selector: 'button[lcars-button], a[lcars-button]',
  standalone: true,
  template: `@if (badge() !== undefined) {<span class="lcars-button__badge">{{ badge() }}</span>}<ng-content />`,
  host: { '[class]': 'cls()' },
})
export class LcarsButtonComponent {
  readonly color = input<LcarsColor>('primary');
  readonly shape = input<'default' | 'rounded' | 'left' | 'square'>('default');
  readonly inactive = input(false);
  readonly badge = input<string | number>();
  protected readonly cls = computed(() =>
    cx(
      'lcars-button',
      `lcars-button--${this.color()}`,
      this.shape() !== 'default' && `lcars-button--${this.shape()}`,
      this.inactive() && 'lcars-button--inactive'
    )
  );
}

@Component({
  selector: 'lcars-toggle',
  standalone: true,
  template: `
    <label [class]="cls()">
      <input
        type="checkbox"
        class="lcars-toggle__input"
        [checked]="checked()"
        [disabled]="disabled()"
        (change)="checked.set($any($event.target).checked)"
      />
      <span class="lcars-toggle__track"><span class="lcars-toggle__knob"></span></span>
      @if (label()) {<span class="lcars-toggle__label">{{ label() }}</span>}
    </label>
  `,
})
export class LcarsToggleComponent {
  readonly label = input<string>('');
  readonly color = input<LcarsColor>('success');
  readonly disabled = input(false);
  /** two-way bindable: [(checked)] */
  readonly checked = model(false);
  protected readonly cls = computed(() =>
    cx('lcars-toggle', `lcars-toggle--${this.color()}`, this.disabled() && 'is-disabled')
  );
}

@Component({
  selector: 'lcars-slider',
  standalone: true,
  template: `
    <div class="lcars-slider__track">
      <div class="lcars-slider__fill"></div>
      <div class="lcars-slider__knob"></div>
    </div>
    @if (showValue() && orientation() === 'horizontal') {<span class="lcars-slider__value">{{ rounded() }}%</span>}
  `,
  host: { '[class]': 'cls()', '[style.--value]': 'value()', style: 'display:block' },
})
export class LcarsSliderComponent {
  readonly value = input.required<number>();
  readonly color = input<LcarsColor>('primary');
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly showValue = input(false);
  protected readonly rounded = computed(() => Math.round(this.value()));
  protected readonly cls = computed(() =>
    cx('lcars-slider', this.orientation() === 'vertical' && 'lcars-slider--vertical', `lcars-slider--${this.color()}`)
  );
}

@Component({
  selector: 'lcars-keypad',
  standalone: true,
  template: `<ng-content />`,
  host: { '[class]': 'cls()', '[style.--cols]': 'cols()' },
})
export class LcarsKeypadComponent {
  readonly cols = input(3);
  readonly mono = input(false);
  protected readonly cls = computed(() => cx('lcars-keypad', this.mono() && 'lcars-keypad--mono'));
}

@Component({
  selector: 'button[lcars-keypad-key]',
  standalone: true,
  template: `<ng-content />`,
  host: { '[class]': 'cls()' },
})
export class LcarsKeypadKeyComponent {
  readonly wide = input(false);
  readonly accent = input(false);
  protected readonly cls = computed(() =>
    cx('lcars-keypad__key', this.wide() && 'lcars-keypad__key--wide', this.accent() && 'lcars-keypad__key--accent')
  );
}

@Component({
  selector: 'lcars-indicator',
  standalone: true,
  template: `<span class="lcars-indicator__light"></span>@if (label()) {<span class="lcars-indicator__label">{{ label() }}</span>}<ng-content />`,
  host: { '[class]': 'cls()' },
})
export class LcarsIndicatorComponent {
  readonly state = input<'online' | 'standby' | 'offline' | 'alert'>('online');
  readonly label = input<string>('');
  protected readonly cls = computed(() => cx('lcars-indicator', `lcars-indicator--${this.state()}`));
}
