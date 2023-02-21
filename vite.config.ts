import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: resolve(__dirname, './src/components'),
      },
      {
        find: '@components-common',
        replacement: resolve(__dirname, './src/components/@common'),
      },
      {
        find: '@components-layout',
        replacement: resolve(__dirname, './src/components/@layout'),
      },
      {
        find: '@constants',
        replacement: resolve(__dirname, './src/constants'),
      },
      {
        find: '@styles',
        replacement: resolve(__dirname, './src/styles'),
      },
      {
        find: '@utils',
        replacement: resolve(__dirname, './src/utils'),
      },
      {
        find: '@util-types',
        replacement: resolve(__dirname, './src/utils/types'),
      },
    ],
  },
});
