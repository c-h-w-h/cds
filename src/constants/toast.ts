import { Interpolation, Theme } from '@emotion/react';
import { pixelToRem } from '@utils/pixelToRem';

export type ToastKind = 'alert' | 'info' | 'success' | 'warning' | 'error';

export type VerticalVariant = 'top' | 'bottom';

export type HorizontalVariant = 'left' | 'right' | 'center';

export const V_POSITION_MAP: Record<VerticalVariant, Interpolation<Theme>> = {
  top: {
    top: 0,
    marginTop: '1rem',
  },
  bottom: {
    bottom: 0,
    marginBottom: '1rem',
  },
};

export const H_POSITION_MAP: Record<HorizontalVariant, Interpolation<Theme>> = {
  left: {
    left: 0,
    marginLeft: '1rem',
  },
  right: {
    right: 0,
    marginRight: '1rem',
  },
  center: {
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
};

export const MAIN_ICON_SIZE = pixelToRem('32px');

export const CLOSE_ICON_SIZE = pixelToRem('24px');
