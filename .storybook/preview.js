import '!style-loader!css-loader!../src/index.css';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import i18n from './i18next.js';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  i18n
}
