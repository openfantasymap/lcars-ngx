import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LCARS } from '../src/public-api';

const meta: Meta = {
  title: 'Introduction',
  decorators: [moduleMetadata({ imports: [...LCARS] })],
  parameters: { options: { showPanel: false } },
};
export default meta;

export const Welcome: StoryObj = {
  render: () => ({
    template: `
      <div>
        <lcars-bar-group [thick]="true" style="margin-bottom:1rem">
          <lcars-bar color="primary" cap="left" style="min-width:3rem"></lcars-bar>
          <lcars-bar color="primary" [fill]="true" title="@openfantasymap/lcars-ngx"></lcars-bar>
          <lcars-bar color="accent" cap="right" [decorated]="true" style="min-width:5rem"></lcars-bar>
        </lcars-bar-group>
        <h1 class="lcars-text-primary">LCARS · Angular</h1>
        <p>Standalone, signal-based Angular components over
           <strong>&#64;openfantasymap/lcars-core</strong>.
           Use the <strong>Theme</strong> toolbar (top bar) to switch era/faction skins.</p>
        <lcars-row [wrap]="true" style="gap:1rem;margin:1rem 0">
          <lcars-readout label="Components" value="58+"></lcars-readout>
          <lcars-readout label="Themes" value="8" color="secondary"></lcars-readout>
          <lcars-readout label="Signals" value="yes" color="success"></lcars-readout>
        </lcars-row>
        <lcars-row [wrap]="true" style="gap:0.5rem">
          <button lcars-button color="primary" shape="rounded">Primitives</button>
          <button lcars-button color="secondary" shape="rounded">Tools</button>
          <button lcars-button color="tertiary" shape="rounded">Systems</button>
          <button lcars-button color="accent" shape="rounded">Conn / Eng / Comms</button>
        </lcars-row>
      </div>`,
  }),
};
