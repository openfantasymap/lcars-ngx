import { Component, output } from '@angular/core';

/**
 * 8-way directional pad — an interactive LCARS control (the one the core CSS set
 * doesn't otherwise provide). Emits the chosen direction. Styled via the
 * lcars-core theme custom properties.
 *
 * ```html
 * <lcars-dpad (select)="onHeading($event)" />
 * ```
 */
@Component({
  selector: 'lcars-dpad',
  standalone: true,
  host: { class: 'lcars-dpad' },
  styles: [
    `
      :host { display: inline-block; width: var(--lcars-dpad-size, 12rem); max-width: 100%; }
      svg { width: 100%; height: auto; display: block; }
      .seg { cursor: pointer; }
      .corner { fill: var(--lcars-primary, #ffcc66); }
      .cardinal { fill: var(--lcars-secondary, #99ccff); }
      .hub { fill: var(--lcars-tertiary, #cc99cc); }
      .seg:active { fill: var(--lcars-accent, #cc6699); }
    `,
  ],
  template: `
    <svg viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path class="seg corner" (click)="pick('NE')" d="m47 33v-32.35c15.992 2.4474 29.977 16.417 32.424 32.35z" />
      <path class="seg corner" (click)="pick('SW')" d="m33 47v32.35c-15.992-2.4474-29.977-16.417-32.424-32.35z" />
      <path class="seg corner" (click)="pick('SE')" d="m47 47v32.35c15.992-2.4474 29.977-16.417 32.424-32.35z" />
      <path class="seg cardinal" (click)="pick('N')" d="m34 10h12v-9.5c-3.8785-0.47437-8.044-0.4824-12 0z" />
      <path class="seg cardinal" (click)="pick('W')" d="m10 46v-12h-9.5c-0.47437 3.8785-0.4824 8.044 0 12z" />
      <path class="seg cardinal" (click)="pick('E')" d="m70 34v12h9.5c0.47437-3.8785 0.4824-8.044 0-12z" />
      <path class="seg cardinal" (click)="pick('S')" d="m46 70h-12v9.5c3.8785 0.47437 8.044 0.4824 12 0z" />
      <path class="hub" d="m11 34v12h23v23h12v-23h23v-12h-23v-23h-12v23z" />
      <path class="seg corner" (click)="pick('NW')" d="m32.977 33v-32.35c-15.992 2.4474-29.977 16.417-32.424 32.35z" />
    </svg>
  `,
})
export class LcarsDpadComponent {
  /** Emits the chosen direction: N, NE, E, SE, S, SW, W, NW. */
  readonly select = output<string>();

  protected pick(dir: string) {
    this.select.emit(dir);
  }
}
