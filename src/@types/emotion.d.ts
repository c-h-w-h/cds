/* eslint-disable @typescript-eslint/no-empty-interface */

import '@emotion/react';
import type { Theme as CdsTheme } from '@components/CdsProvider/theme';

declare module '@emotion/react' {
  export interface Theme extends CdsTheme {}
}
