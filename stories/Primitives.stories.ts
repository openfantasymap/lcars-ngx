import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LCARS } from '../src/public-api';

const meta: Meta = {
  title: 'Primitives',
  decorators: [moduleMetadata({ imports: [...LCARS] })],
};
export default meta;
type S = StoryObj;

export const Elbow: S = {
  render: (args) => ({
    props: args,
    template: `<lcars-elbow [corner]="corner" [color]="color" [label]="label" [style.width.rem]="width" [style.height.rem]="height"></lcars-elbow>`,
  }),
  args: { corner: 'left-bottom', color: 'primary', label: 'DECK 5', width: 16, height: 5 },
  argTypes: {
    corner: { control: 'inline-radio', options: ['left-bottom', 'left-top', 'right-bottom', 'right-top'] },
    color: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'accent', 'danger'] },
    label: { control: 'text' },
    width: { control: { type: 'range', min: 8, max: 28, step: 0.5 } },
    height: { control: { type: 'range', min: 3, max: 16, step: 0.5 } },
  },
};

export const Bars: S = {
  render: () => ({
    template: `
      <lcars-column style="gap:0.5rem">
        <lcars-bar-group [thick]="true">
          <lcars-bar color="primary" cap="left" style="min-width:3rem"></lcars-bar>
          <lcars-bar color="primary" [fill]="true" title="SENSORS"></lcars-bar>
          <lcars-bar color="accent" cap="right" [decorated]="true" style="min-width:5rem"></lcars-bar>
        </lcars-bar-group>
        <lcars-row style="gap:0.75rem;height:12rem">
          <lcars-bar-vertical color="primary" [capTop]="true" [capBottom]="true"></lcars-bar-vertical>
          <lcars-bar-vertical color="secondary" [capTop]="true" [capBottom]="true"></lcars-bar-vertical>
          <lcars-bar-vertical color="tertiary" [capTop]="true" [capBottom]="true"></lcars-bar-vertical>
        </lcars-row>
      </lcars-column>`,
  }),
};

export const Brackets: S = {
  render: () => ({
    template: `
      <lcars-row [wrap]="true" style="gap:1rem">
        <lcars-bracket side="full" color="secondary" style="max-width:12rem">full bracket</lcars-bracket>
        <lcars-bracket side="left" color="secondary" style="max-width:12rem">left bracket</lcars-bracket>
        <lcars-bracket side="bottom" color="secondary" style="max-width:12rem">bottom bracket</lcars-bracket>
      </lcars-row>`,
  }),
};

export const TextBoxesAndReadouts: S = {
  name: 'Text boxes & readouts',
  render: () => ({
    template: `
      <lcars-column style="gap:0.75rem;align-items:flex-start">
        <lcars-textbox size="large" [middle]="true" textColor="primary">STARDATE 47988.1</lcars-textbox>
        <lcars-row [wrap]="true" style="gap:1rem">
          <lcars-readout label="Shields" value="98%"></lcars-readout>
          <lcars-readout label="Hull" value="100%" color="success"></lcars-readout>
          <lcars-readout label="Power" value="62%" color="warning"></lcars-readout>
          <lcars-readout label="Antimatter" value="11%" color="danger" [right]="true"></lcars-readout>
        </lcars-row>
      </lcars-column>`,
  }),
};
