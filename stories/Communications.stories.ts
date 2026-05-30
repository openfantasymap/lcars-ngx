import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LCARS } from '../src/public-api';

const meta: Meta = {
  title: 'Communications',
  decorators: [moduleMetadata({ imports: [...LCARS] })],
};
export default meta;
type S = StoryObj;

export const CommsPanel: S = {
  render: () => ({
    template: `
      <lcars-comms title="Subspace Comms" freq="141.55 MHz">
        <lcars-comms-channel name="Starfleet Command" [signal]="96" [active]="true" />
        <lcars-comms-channel name="USS Defiant" [signal]="78" />
        <lcars-comms-channel name="Deep Space 9" [signal]="64" />
        <lcars-comms-channel name="Emergency Channel" [signal]="12" />
      </lcars-comms>`,
  }),
};

export const Waveform: S = {
  render: (args) => ({ props: args, template: `<lcars-waveform [values]="values" [live]="live" style="width:26rem" />` }),
  args: {
    live: true,
    values: Array.from({ length: 28 }, (_, i) =>
      Math.max(6, Math.round((Math.abs(Math.sin(i * 0.6)) * 0.7 + Math.abs(Math.sin(i * 0.21)) * 0.3) * 70))),
  },
  argTypes: { live: { control: 'boolean' } },
};

export const Hail: S = {
  render: () => ({
    template: `
      <lcars-column style="gap:0.75rem;max-width:34rem">
        <lcars-hail title="Incoming Transmission" subtitle="USS Defiant · Priority One" variant="incoming">
          <button lcars-button color="success" shape="rounded">Accept</button>
          <button lcars-button color="danger" shape="rounded">Reject</button>
        </lcars-hail>
        <lcars-hail title="Secure Channel" subtitle="Encrypted · Starfleet Intelligence" variant="secure" />
        <lcars-hail title="Priority One" subtitle="Fleet-wide distress" variant="priority" />
      </lcars-column>`,
  }),
};
