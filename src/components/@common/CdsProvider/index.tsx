import Global from '@components-common/Global';
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
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export default CdsProvider;
