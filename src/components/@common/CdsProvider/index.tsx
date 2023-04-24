import Global from '@components-common/Global';
import { PORTAL_TOAST_ROOT_ID, PORTAL_MODAL_ROOT_ID } from '@constants/portal';
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
        <div id={PORTAL_TOAST_ROOT_ID}></div>
        <div id={PORTAL_MODAL_ROOT_ID}></div>
      </ThemeProvider>
    </>
  );
};

export default CdsProvider;
