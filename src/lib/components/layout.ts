import { Component, Directive, computed, input } from '@angular/core';
import { cx, type LcarsTheme } from '../types';

/** Root: add `lcars` (+ optional theme) to any element. `<div lcars theme="klingon">` */
@Directive({ selector: '[lcars]', standalone: true, host: { '[class]': 'cls()' } })
export class LcarsRootDirective {
  readonly theme = input<LcarsTheme>();
  protected readonly cls = computed(() => cx('lcars', this.theme() && `lcars-theme-${this.theme()}`));
}

@Component({
  selector: 'lcars-row',
  standalone: true,
  template: `<ng-content />`,
  host: { '[class]': 'cls()' },
})
export class LcarsRowComponent {
  readonly fill = input(false);
  readonly centered = input(false);
  readonly fullCentered = input(false);
  readonly right = input(false);
  readonly spaceBetween = input(false);
  readonly bottom = input(false);
  readonly wrap = input(false);
  protected readonly cls = computed(() =>
    cx(
      'lcars-row',
      this.fill() && 'fill',
      this.centered() && 'centered',
      this.fullCentered() && 'full-centered',
      this.right() && 'right',
      this.spaceBetween() && 'space-between',
      this.bottom() && 'bottom',
      this.wrap() && 'wrap'
    )
  );
}

@Component({
  selector: 'lcars-column',
  standalone: true,
  template: `<ng-content />`,
  host: { '[class]': 'cls()' },
})
export class LcarsColumnComponent {
  readonly fill = input(false);
  readonly centered = input(false);
  readonly fullCentered = input(false);
  readonly centeredRight = input(false);
  readonly bottom = input(false);
  protected readonly cls = computed(() =>
    cx(
      'lcars-column',
      this.fill() && 'fill',
      this.centered() && 'centered',
      this.fullCentered() && 'full-centered',
      this.centeredRight() && 'centered-right',
      this.bottom() && 'bottom'
    )
  );
}

@Component({ selector: 'lcars-panel', standalone: true, template: `<ng-content />`, host: { class: 'lcars-panel', style: 'display:block' } })
export class LcarsPanelComponent {}

@Component({ selector: 'lcars-app', standalone: true, template: `<ng-content />`, host: { class: 'lcars-app' } })
export class LcarsAppComponent {}

@Directive({ selector: '[lcars-app-sidebar]', standalone: true, host: { class: 'lcars-app__sidebar' } })
export class LcarsAppSidebarDirective {}
@Directive({ selector: '[lcars-app-header]', standalone: true, host: { class: 'lcars-app__header' } })
export class LcarsAppHeaderDirective {}
@Directive({ selector: '[lcars-app-content]', standalone: true, host: { class: 'lcars-app__content' } })
export class LcarsAppContentDirective {}

@Component({ selector: 'lcars-spacer', standalone: true, template: ``, host: { class: 'lcars-spacer' } })
export class LcarsSpacerComponent {}
@Component({ selector: 'lcars-grow', standalone: true, template: ``, host: { class: 'lcars-grow' } })
export class LcarsGrowComponent {}
