import { Component, computed, input } from '@angular/core';
import { cx, type LcarsColor } from '../types';

@Component({
  selector: 'lcars-nav',
  standalone: true,
  template: `<ng-content />`,
  host: { '[class]': 'cls()' },
})
export class LcarsNavComponent {
  readonly mono = input(false);
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
  protected readonly cls = computed(() =>
    cx('lcars-nav', this.mono() && 'lcars-nav--mono', this.orientation() === 'horizontal' && 'lcars-nav--horizontal')
  );
}

@Component({
  selector: 'a[lcars-nav-item], button[lcars-nav-item]',
  standalone: true,
  template: `<ng-content />`,
  host: { '[class]': 'cls()' },
})
export class LcarsNavItemComponent {
  readonly active = input(false);
  readonly color = input<LcarsColor>();
  protected readonly cls = computed(() =>
    cx('lcars-nav__item', this.active() && 'is-active', this.color() && `lcars-nav__item--${this.color()}`)
  );
}

@Component({ selector: 'lcars-nav-spacer', standalone: true, template: ``, host: { class: 'lcars-nav__spacer' } })
export class LcarsNavSpacerComponent {}

@Component({
  selector: 'lcars-nav-group',
  standalone: true,
  template: `<ng-content />`,
  host: { class: 'lcars-nav__group' },
})
export class LcarsNavGroupComponent {}

@Component({
  selector: 'lcars-tabs',
  standalone: true,
  template: `<ng-content />`,
  host: { '[class]': 'cls()' },
})
export class LcarsTabsComponent {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  protected readonly cls = computed(() => cx('lcars-tabs', this.orientation() === 'vertical' && 'lcars-tabs--vertical'));
}

@Component({
  selector: 'button[lcars-tab]',
  standalone: true,
  template: `<ng-content />`,
  host: { '[class]': 'cls()' },
})
export class LcarsTabComponent {
  readonly active = input(false);
  protected readonly cls = computed(() => cx('lcars-tabs__tab', this.active() && 'is-active'));
}

@Component({
  selector: 'lcars-breadcrumb',
  standalone: true,
  template: `<ng-content />`,
  host: { '[class]': 'cls()' },
})
export class LcarsBreadcrumbComponent {
  readonly separator = input<'chevron' | 'ticks'>('chevron');
  protected readonly cls = computed(() => cx('lcars-breadcrumb', this.separator() === 'ticks' && 'lcars-breadcrumb--ticks'));
}

@Component({
  selector: 'a[lcars-crumb], span[lcars-crumb]',
  standalone: true,
  template: `<ng-content />`,
  host: { '[class]': 'cls()' },
})
export class LcarsCrumbComponent {
  readonly current = input(false);
  protected readonly cls = computed(() => cx('lcars-breadcrumb__crumb', this.current() && 'is-current'));
}
