import { Component, computed, input } from '@angular/core';
import { cx } from '../types';

@Component({
  selector: 'lcars-transporter-pad',
  standalone: true,
  template: `
    @for (i of padArray(); track i) {
      <div [class]="padCls(i)"></div>
    }
    <ng-content />
  `,
  host: { '[class]': 'cls()' },
})
export class LcarsTransporterPadComponent {
  readonly pads = input(6);
  readonly energizing = input(false);
  readonly active = input(0);
  readonly locked = input(false);
  protected readonly padArray = computed(() => Array.from({ length: this.pads() }, (_, i) => i));
  protected readonly cls = computed(() =>
    cx('lcars-transporter-pad', this.energizing() && 'lcars-transporter-pad--energizing')
  );
  protected padCls(i: number): string {
    return cx(
      'lcars-transporter-pad__pad',
      this.locked() && 'is-locked',
      !this.energizing() && i < this.active() && 'is-active'
    );
  }
}

@Component({
  selector: 'lcars-transporter',
  standalone: true,
  template: `
    <div class="lcars-transporter__subject">@if (subject()) { {{ subject() }} } @else { <ng-content /> }</div>
    <div class="lcars-transporter__beam"></div>
  `,
  host: { '[class]': 'cls()', '[style.--rate]': 'rateCss()', '[style.--progress]': 'progress()' },
})
export class LcarsTransporterComponent {
  readonly subject = input<string>('');
  readonly state = input<'materialized' | 'cycle' | 'energizing' | 'dematerializing' | 'materializing'>('materialized');
  readonly progress = input<number>();
  readonly rate = input<number>();
  protected readonly useProgress = computed(() => this.progress() !== undefined);
  protected readonly rateCss = computed(() => (this.rate() != null ? `${this.rate()}s` : null));
  protected readonly cls = computed(() =>
    cx(
      'lcars-transporter',
      this.useProgress() && 'lcars-transporter--progress',
      !this.useProgress() && this.state() === 'cycle' && 'lcars-transporter--cycle',
      !this.useProgress() && this.state() === 'energizing' && 'is-energizing',
      !this.useProgress() && this.state() === 'dematerializing' && 'is-dematerializing',
      !this.useProgress() && this.state() === 'materializing' && 'is-materializing'
    )
  );
}
