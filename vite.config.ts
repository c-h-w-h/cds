import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [
      { find: '@src', replacement: resolve(__dirname, './src') },
      {
        find: '@assets',
        replacement: resolve(__dirname, './src/assets'),
      },
      {
        find: '@components',
        replacement: resolve(__dirname, './src/components'),
      },
      {
        find: '@constants',
        replacement: resolve(__dirname, './src/constants'),
      },
      {
        find: '@styles',
        replacement: resolve(__dirname, './src/styles'),
      },
    ],
  },
});
