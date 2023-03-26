import Global from '@components-common/Global';
import { PORTAL_ROOT_ID } from '@constants/portal';
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
        <div id={PORTAL_ROOT_ID}></div>
      </ThemeProvider>
    </>
  );
};

export default CdsProvider;
