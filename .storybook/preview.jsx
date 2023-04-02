import CdsProvider from '../src/components/@common/CdsProvider';
import React from 'react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    sort: 'requiredFirst',
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <CdsProvider>
      <Story />
    </CdsProvider>
  ),
];
