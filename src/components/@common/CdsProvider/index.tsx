import Global from '@components-common/Global';
import { COLOR, ColorSet } from '@constants/color';
import {
  DRAWER_PORTAL_ROOT_ID,
  TOAST_PORTAL_ROOT_ID,
  MODAL_PORTAL_ROOT_ID,
} from '@constants/portal';
import { ThemeProvider } from '@emotion/react';
import { ReactNode } from 'react';

interface CdsProviderProps {
  themeColor: Partial<ColorSet>;
  children: ReactNode;
}

export interface Theme {
  color: ColorSet;
}

const CdsProvider = ({ themeColor, children }: CdsProviderProps) => {
  const color = {
    ...COLOR,
    ...themeColor,
  };

  return (
    <>
      <Global />
      <ThemeProvider theme={{ color }}>
        {children}
        <div id={DRAWER_PORTAL_ROOT_ID}></div>
        <div id={TOAST_PORTAL_ROOT_ID}></div>
        <div id={MODAL_PORTAL_ROOT_ID}></div>
      </ThemeProvider>
    </>
  );
};

export default CdsProvider;
