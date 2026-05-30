import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LCARS } from '../src/public-api';

const meta: Meta = {
  title: 'Transporter',
  decorators: [moduleMetadata({ imports: [...LCARS] })],
};
export default meta;
type S = StoryObj;

export const PadPlatform: S = {
  render: (args) => ({ props: args, template: `<lcars-transporter-pad [energizing]="energizing" [active]="active" [locked]="true" />` }),
  args: { energizing: false, active: 0 },
  argTypes: {
    energizing: { control: 'boolean' },
    active: { control: { type: 'range', min: 0, max: 6, step: 1 } },
  },
};

export const Chamber: S = {
  render: (args) => ({ props: args, template: `<lcars-transporter subject="🖖" [state]="state" [rate]="rate" />` }),
  args: { state: 'cycle', rate: 2.4 },
  argTypes: {
    state: { control: 'inline-radio', options: ['materialized', 'cycle', 'energizing', 'dematerializing', 'materializing'] },
    rate: { control: { type: 'range', min: 1, max: 5, step: 0.2 } },
  },
};

export const Progress: S = {
  name: 'Materialization progress',
  render: (args) => ({ props: args, template: `<lcars-transporter subject="🖖" [progress]="progress" />` }),
  args: { progress: 40 },
  argTypes: { progress: { control: { type: 'range', min: 0, max: 100, step: 1 } } },
};
