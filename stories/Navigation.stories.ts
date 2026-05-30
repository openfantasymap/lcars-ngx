import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LCARS } from '../src/public-api';

const meta: Meta = {
  title: 'Navigation',
  decorators: [moduleMetadata({ imports: [...LCARS] })],
};
export default meta;
type S = StoryObj;

export const Nav: S = {
  render: () => ({
    template: `
      <lcars-nav>
        <a lcars-nav-item [active]="true">Bridge</a>
        <a lcars-nav-item>Engineering</a>
        <a lcars-nav-item>Sickbay</a>
        <a lcars-nav-item>Tactical</a>
        <lcars-nav-spacer></lcars-nav-spacer>
        <a lcars-nav-item color="danger">Eject Core</a>
      </lcars-nav>`,
  }),
};

export const Tabs: S = {
  render: () => ({
    template: `
      <lcars-column style="gap:0.25rem;max-width:30rem">
        <lcars-tabs>
          <button lcars-tab [active]="true">Tactical</button>
          <button lcars-tab>Science</button>
          <button lcars-tab>Comms</button>
        </lcars-tabs>
        <lcars-panel><p style="margin:0">Panel content for the selected tab.</p></lcars-panel>
      </lcars-column>`,
  }),
};

export const Breadcrumb: S = {
  render: () => ({
    template: `
      <lcars-breadcrumb>
        <a lcars-crumb>USS Enterprise</a>
        <a lcars-crumb>Deck 5</a>
        <a lcars-crumb>Section 7</a>
        <span lcars-crumb [current]="true">Main Engineering</span>
      </lcars-breadcrumb>`,
  }),
};
