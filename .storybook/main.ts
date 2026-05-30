import type { StorybookConfig } from '@storybook/angular';

// Storybook 9: essentials are built in; add only the MCP addon.
const config: StorybookConfig = {
  // @storybook/angular resolves globs from the project root (where angular.json
  // is), not from .storybook/ — so no leading "../" here.
  stories: ['stories/**/*.stories.ts'],
  addons: ['@storybook/addon-mcp'],
  framework: { name: '@storybook/angular', options: {} },
  core: { disableTelemetry: true },
};

export default config;
