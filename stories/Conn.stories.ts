import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LCARS } from '../src/public-api';

const meta: Meta = {
  title: 'Conn',
  decorators: [moduleMetadata({ imports: [...LCARS] })],
};
export default meta;
type S = StoryObj;

export const Compass: S = {
  render: (args) => ({ props: args, template: `<lcars-compass [heading]="heading" [mark]="mark" />` }),
  args: { heading: 87, mark: 21 },
  argTypes: {
    heading: { control: { type: 'range', min: 0, max: 359, step: 1 } },
    mark: { control: { type: 'range', min: 0, max: 90, step: 1 } },
  },
};

export const Scanner: S = {
  render: () => ({
    template: `
      <lcars-scanner [rate]="3" [scopeR]="9">
        <lcars-scanner-contact [range]="40" [bearing]="30" />
        <lcars-scanner-contact [range]="65" [bearing]="120" kind="neutral" />
        <lcars-scanner-contact [range]="85" [bearing]="210" kind="hostile" />
        <lcars-scanner-contact [range]="55" [bearing]="300" kind="hostile" />
      </lcars-scanner>`,
  }),
};

export const StellarMap: S = {
  render: () => ({
    template: `
      <lcars-starmap>
        <lcars-star [x]="12" [y]="22" />
        <lcars-star [x]="30" [y]="70" variant="giant" />
        <lcars-star [x]="48" [y]="30" />
        <lcars-star [x]="82" [y]="55" variant="giant" />
        <lcars-star [x]="62" [y]="80" variant="dim" />
        <lcars-starmap-course [x]="28" [y]="55" length="12.47rem" [angle]="-17.6" />
        <lcars-starmap-ship [x]="28" [y]="55" [rot]="72.4" />
        <lcars-starmap-waypoint [x]="82" [y]="28" />
        <lcars-starmap-label>SECTOR 001 · DEEP SPACE</lcars-starmap-label>
      </lcars-starmap>`,
  }),
};

export const Helm: S = {
  render: (args) => ({
    props: args,
    template: `<lcars-helm [warp]="warp" [impulse]="impulse" [throttle]="throttle" [readouts]="readouts" />`,
  }),
  args: {
    warp: 6.2, impulse: 75, throttle: 80,
    readouts: [{ label: 'Heading', value: '087' }, { label: 'ETA', value: '00:18', color: 'success' }],
  },
  argTypes: {
    warp: { control: { type: 'range', min: 0, max: 9, step: 0.1 } },
    impulse: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    throttle: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
};
