import type { StorybookConfig } from '@storybook/angular';

// Storybook 9: essentials are built in; add only the MCP addon.
const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.ts'],
  addons: ['@storybook/addon-mcp'],
  framework: { name: '@storybook/angular', options: {} },
  core: { disableTelemetry: true },
};

export default config;
