import { Component, computed, input } from '@angular/core';
import { cx, len, type LcarsColor } from '../types';

@Component({
  selector: 'lcars-elbow',
  standalone: true,
  template: `@if (label()) {<span class="lcars-elbow__label">{{ label() }}</span>}<ng-content />`,
  host: {
    '[class]': 'cls()',
    '[style.--lcars-elbow-arm]': 'armCss()',
    '[style.--lcars-elbow-bar]': 'barCss()',
  },
})
export class LcarsElbowComponent {
  readonly corner = input<'left-top' | 'left-bottom' | 'right-top' | 'right-bottom'>('left-bottom');
  readonly color = input<LcarsColor>('primary');
  readonly arm = input<string | number>();
  readonly bar = input<string | number>();
  readonly label = input<string>('');
  protected readonly cls = computed(() => cx('lcars-elbow', this.corner(), `lcars-elbow--${this.color()}`));
  protected readonly armCss = computed(() => len(this.arm()));
  protected readonly barCss = computed(() => len(this.bar()));
}

@Component({
  selector: 'lcars-bar',
  standalone: true,
  template: `@if (title()) {<span [class]="titleCls()">{{ title() }}</span>}<ng-content />`,
  host: { '[class]': 'cls()', style: 'display:block' },
})
export class LcarsBarComponent {
  readonly color = input<LcarsColor>('primary');
  readonly cap = input<'left' | 'right' | 'both'>();
  readonly fill = input(false);
  readonly decorated = input(false);
  readonly title = input<string>('');
  readonly titleSide = input<'left' | 'right'>('right');
  protected readonly cls = computed(() =>
    cx(
      'lcars-bar',
      `lcars-bar--${this.color()}`,
      this.fill() && 'fill',
      this.cap() && `cap-${this.cap()}`,
      this.decorated() && 'lcars-bar--decorated'
    )
  );
  protected readonly titleCls = computed(() => cx('lcars-bar__title', this.titleSide() === 'left' && 'left'));
}

@Component({
  selector: 'lcars-bar-group',
  standalone: true,
  template: `<ng-content />`,
  host: { '[class]': 'cls()' },
})
export class LcarsBarGroupComponent {
  readonly thick = input(false);
  protected readonly cls = computed(() => cx('lcars-bar-group', this.thick() && 'lcars-bar-group--thick'));
}

@Component({
  selector: 'lcars-bar-vertical',
  standalone: true,
  template: ``,
  host: { '[class]': 'cls()', style: 'display:block' },
})
export class LcarsBarVerticalComponent {
  readonly color = input<LcarsColor>('primary');
  readonly capTop = input(false);
  readonly capBottom = input(false);
  protected readonly cls = computed(() =>
    cx('lcars-bar-vertical', `lcars-bar-vertical--${this.color()}`, this.capTop() && 'cap-top', this.capBottom() && 'cap-bottom')
  );
}

@Component({
  selector: 'lcars-bracket',
  standalone: true,
  template: `<ng-content />`,
  host: { '[class]': 'cls()', style: 'display:block' },
})
export class LcarsBracketComponent {
  readonly side = input<'full' | 'left' | 'right' | 'top' | 'bottom'>('full');
  readonly color = input<LcarsColor>('primary');
  readonly solid = input(false);
  protected readonly cls = computed(() =>
    cx('lcars-bracket', `lcars-bracket--${this.side()}`, `lcars-bracket--${this.color()}`, this.solid() && 'lcars-bracket--solid')
  );
}

@Component({
  selector: 'lcars-textbox',
  standalone: true,
  template: `<ng-content />`,
  host: { '[class]': 'cls()' },
})
export class LcarsTextBoxComponent {
  readonly size = input<'default' | 'big' | 'large' | 'huge'>('default');
  readonly align = input<'left' | 'center' | 'right'>('left');
  readonly middle = input(false);
  readonly bottom = input(false);
  readonly textColor = input<LcarsColor>();
  protected readonly cls = computed(() =>
    cx(
      'lcars-textbox',
      this.size() !== 'default' && `lcars-textbox--${this.size()}`,
      this.align() === 'center' && 'lcars-textbox--center',
      this.align() === 'right' && 'lcars-textbox--right',
      this.middle() && 'lcars-textbox--middle',
      this.bottom() && 'lcars-textbox--bottom',
      this.textColor() && `lcars-textbox--text-${this.textColor()}`
    )
  );
}

@Component({
  selector: 'lcars-readout',
  standalone: true,
  template: `
    @if (label()) {<span class="lcars-readout__label">{{ label() }}</span>}
    @if (value() !== undefined) {<span class="lcars-readout__value">{{ value() }}</span>}
    <ng-content />
  `,
  host: { '[class]': 'cls()' },
})
export class LcarsReadoutComponent {
  readonly label = input<string>('');
  readonly value = input<string | number>();
  readonly color = input<LcarsColor>();
  readonly right = input(false);
  protected readonly cls = computed(() =>
    cx('lcars-readout', this.color() && `lcars-readout--${this.color()}`, this.right() && 'lcars-readout--right')
  );
}
