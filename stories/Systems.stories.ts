import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LCARS } from '../src/public-api';

const meta: Meta = {
  title: 'Systems',
  decorators: [moduleMetadata({ imports: [...LCARS] })],
};
export default meta;
type S = StoryObj;

export const Gauge: S = {
  render: (args) => ({ props: args, template: `<lcars-gauge [value]="value" [color]="color" [size]="size" [label]="label" />` }),
  args: { value: 68, color: 'primary', size: 'default', label: 'Shields' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    color: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'warning', 'danger', 'success'] },
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    label: { control: 'text' },
  },
};

export const GaugeCluster: S = {
  render: () => ({
    template: `
      <lcars-row [wrap]="true" style="gap:1.5rem;align-items:center">
        <lcars-gauge [value]="100" color="success" label="Hull" />
        <lcars-gauge [value]="82" color="primary" label="Shields" />
        <lcars-gauge [value]="47" color="warning" size="sm" label="Power" />
        <lcars-gauge [value]="14" color="danger" size="sm" label="Antimatter" />
      </lcars-row>`,
  }),
};

export const BarGraph: S = {
  render: (args) => ({ props: args, template: `<lcars-bargraph [values]="values" [live]="live" style="width:26rem" />` }),
  args: { live: false, values: Array.from({ length: 12 }, (_, i) => 25 + ((i * 37 + 13) % 70)) },
  argTypes: { live: { control: 'boolean' } },
};

export const WarpCore: S = {
  render: () => ({
    template: `
      <lcars-row style="gap:2rem;align-items:center">
        <lcars-warpcore state="running" />
        <lcars-warpcore state="critical" />
        <lcars-warpcore state="offline" />
      </lcars-row>`,
  }),
};

export const Alert: S = {
  render: (args) => ({ props: args, template: `<lcars-alert [condition]="condition" [flash]="flash" [text]="text" style="max-width:38rem" />` }),
  args: { condition: 'red', flash: true, text: 'Red Alert · Hull Breach Deck 7' },
  argTypes: {
    condition: { control: 'inline-radio', options: ['red', 'yellow', 'blue', 'green'] },
    flash: { control: 'boolean' },
    text: { control: 'text' },
  },
};

export const DataCascade: S = {
  render: () => ({
    props: {
      lines: [
        { text: 'SCAN 0x4F · NOMINAL', tone: 'ok' },
        { text: 'PWR GRID 7 · 98.4%' },
        { text: 'WARN: PLASMA FLUX 0x9C', tone: 'alert' },
        { text: 'SHIELD HARMONIC · 4.7', tone: 'ok' },
        { text: 'NAV BUFFER · 0x00A1' },
      ],
    },
    template: `<lcars-cascade [lines]="lines" style="max-width:24rem" />`,
  }),
};
