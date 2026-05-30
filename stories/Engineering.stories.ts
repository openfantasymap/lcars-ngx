import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LCARS } from '../src/public-api';

const meta: Meta = {
  title: 'Engineering',
  decorators: [moduleMetadata({ imports: [...LCARS] })],
};
export default meta;
type S = StoryObj;

export const Conduit: S = {
  render: (args) => ({
    props: args,
    template: `
      <lcars-column style="gap:0.5rem;max-width:24rem">
        <lcars-conduit [load]="load" [state]="state" style="width:24rem" />
        <lcars-conduit [load]="90" style="width:24rem" />
        <lcars-conduit [load]="30" state="critical" style="width:24rem" />
      </lcars-column>`,
  }),
  args: { load: 70, state: 'normal' },
  argTypes: {
    load: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    state: { control: 'inline-radio', options: ['normal', 'critical', 'offline'] },
  },
};

export const PowerDistribution: S = {
  render: () => ({
    template: `
      <lcars-power title="Power Distribution" total="EPS · 1.21 GW">
        <lcars-power-row label="Warp Drive" [value]="88" />
        <lcars-power-row label="Shields" [value]="72" />
        <lcars-power-row label="Weapons" [value]="64" state="warning" />
        <lcars-power-row label="Life Support" [value]="100" />
        <lcars-power-row label="Deflector" [value]="28" state="critical" />
      </lcars-power>`,
  }),
};

export const MasterSystemsDisplay: S = {
  name: 'Master systems display',
  render: (args) => ({
    props: args,
    template: `<lcars-msd [saucer]="saucer" [hull]="hull" [nacelleLeft]="nacelleLeft" [nacelleRight]="nacelleRight" name="USS ENTERPRISE · NCC-1701-D" />`,
  }),
  args: { saucer: 'nominal', hull: 'warning', nacelleLeft: 'nominal', nacelleRight: 'critical' },
  argTypes: {
    saucer: { control: 'inline-radio', options: ['nominal', 'warning', 'critical', 'offline'] },
    hull: { control: 'inline-radio', options: ['nominal', 'warning', 'critical', 'offline'] },
    nacelleLeft: { control: 'inline-radio', options: ['nominal', 'warning', 'critical', 'offline'] },
    nacelleRight: { control: 'inline-radio', options: ['nominal', 'warning', 'critical', 'offline'] },
  },
};
