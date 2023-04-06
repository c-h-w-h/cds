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
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
  options: {
    storySort: {
      method: 'configure',
      includeNames: true,
      order: [
        'Layout', ['Container', 'Flexbox', 'Center', 'List', '*'],
        'Components', ['Spacing', 'Typography', 'Badge', 'Image', 'Button', 'Input', 'Table', 'RangeSelector', 'Dropdown', 'Select', 'Tabs', 'Carousel', '*', 'Spinner', 'Modal', 'Toast'],
        '*'
      ],
    },
  },
};

export const decorators = [
  (Story) => (
    <CdsProvider>
      {Story()}
    </CdsProvider>
  ),
];
