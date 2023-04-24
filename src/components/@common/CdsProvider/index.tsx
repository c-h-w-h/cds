import Global from '@components-common/Global';
import {
  DRAWER_PORTAL_ROOT_ID,
  TOAST_PORTAL_ROOT_ID,
  MODAL_PORTAL_ROOT_ID,
} from '@constants/portal';
import { ThemeProvider } from '@emotion/react';
import { ReactNode } from 'react';

import { theme } from './theme';

interface CdsProviderProps {
  children: ReactNode;
}

const CdsProvider = ({ children }: CdsProviderProps) => {
  return (
    <>
      <Global />
      <ThemeProvider theme={theme}>
        {children}
        <div id={DRAWER_PORTAL_ROOT_ID}></div>
        <div id={TOAST_PORTAL_ROOT_ID}></div>
        <div id={MODAL_PORTAL_ROOT_ID}></div>
      </ThemeProvider>
    </>
  );
};

export default CdsProvider;
