import Global from '@components/Global';
import { ThemeProvider } from '@emotion/react';

import { theme } from './theme';

interface CdsProviderProps {
  children: React.ReactNode;
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
