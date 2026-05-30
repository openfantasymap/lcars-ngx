import type { Preview } from '@storybook/angular';
import { componentWrapperDecorator } from '@storybook/angular';
import '@openfantasymap/lcars-core/css';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'LCARS theme / faction skin',
    defaultValue: 'tng',
    toolbar: {
      icon: 'paintbrush',
      dynamicTitle: true,
      items: [
        { value: 'tng', title: 'Federation · TNG' },
        { value: 'picard', title: 'Federation · Picard' },
        { value: 'ds9', title: 'Federation · DS9' },
        { value: 'voyager', title: 'Federation · Voyager' },
        { value: 'klingon', title: 'Klingon Empire' },
        { value: 'romulan', title: 'Romulan Star Empire' },
        { value: 'cardassian', title: 'Cardassian Union' },
        { value: 'ferengi', title: 'Ferengi Alliance' },
      ],
    },
  },
};

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    controls: { matchers: { color: /(color|background)$/i }, expanded: true },
    options: {
      storySort: {
        order: ['Introduction', 'Primitives', 'Tools', 'Systems', 'Navigation', 'Conn', 'Engineering', 'Communications', 'Transporter'],
      },
    },
  },
  decorators: [
    // Wrap every story in a themed .lcars root so tokens + font apply.
    componentWrapperDecorator(
      (story) => `<div class="lcars lcars-theme-{{theme}}" style="padding:1.5rem;min-height:100vh;background:var(--lcars-bg)">${story}</div>`,
      ({ globals }) => ({ theme: globals['theme'] || 'tng' })
    ),
  ],
};

export default preview;
