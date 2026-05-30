import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LCARS } from '../src/public-api';

const meta: Meta = {
  title: 'Tools',
  decorators: [moduleMetadata({ imports: [...LCARS] })],
};
export default meta;
type S = StoryObj;

export const Button: S = {
  render: (args) => ({
    props: args,
    template: `<button lcars-button [color]="color" [shape]="shape" [inactive]="inactive">{{ label }}</button>`,
  }),
  args: { color: 'primary', shape: 'rounded', label: 'Engage', inactive: false },
  argTypes: {
    color: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'accent', 'danger', 'warning', 'success'] },
    shape: { control: 'inline-radio', options: ['default', 'rounded', 'left', 'square'] },
    label: { control: 'text' },
    inactive: { control: 'boolean' },
  },
};

export const Toggles: S = {
  render: () => ({
    template: `
      <lcars-column style="gap:0.75rem;align-items:flex-start">
        <lcars-toggle label="Inertial Dampers" [checked]="true" color="success" />
        <lcars-toggle label="Tractor Beam" [checked]="true" color="warning" />
        <lcars-toggle label="Self Destruct" color="danger" />
      </lcars-column>`,
  }),
};

export const Slider: S = {
  render: (args) => ({ props: args, template: `<lcars-slider [value]="value" [color]="color" [showValue]="true" style="max-width:24rem" />` }),
  args: { value: 72, color: 'primary' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    color: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'danger'] },
  },
};

export const Keypad: S = {
  render: () => ({
    template: `
      <lcars-keypad [cols]="3">
        <button lcars-keypad-key>1</button><button lcars-keypad-key>2</button><button lcars-keypad-key>3</button>
        <button lcars-keypad-key>4</button><button lcars-keypad-key>5</button><button lcars-keypad-key>6</button>
        <button lcars-keypad-key>7</button><button lcars-keypad-key>8</button><button lcars-keypad-key>9</button>
        <button lcars-keypad-key>*</button><button lcars-keypad-key>0</button><button lcars-keypad-key>#</button>
      </lcars-keypad>`,
  }),
};

export const Indicators: S = {
  render: () => ({
    template: `
      <lcars-column style="gap:0.6rem;align-items:flex-start">
        <lcars-indicator state="online" label="Life Support" />
        <lcars-indicator state="standby" label="Transporters" />
        <lcars-indicator state="offline" label="Holodeck 3" />
        <lcars-indicator state="alert" label="Hull Breach" />
      </lcars-column>`,
  }),
};

export const Dpad: S = {
  render: () => ({ template: `<lcars-dpad (select)="onPick($event)" />`, props: { onPick: (d: string) => console.log('dir', d) } }),
};
