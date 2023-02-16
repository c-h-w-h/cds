import { COLOR } from '@constants/color';

export interface Theme {
  color: typeof COLOR;
}

export const theme: Theme = {
  color: COLOR,
} as const;
