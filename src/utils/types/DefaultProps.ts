import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes, HTMLAttributes } from 'react';

export type DefaultProps<T extends HTMLElement> = ClassAttributes<T> &
  HTMLAttributes<T> & {
    css?: Interpolation<Theme>;
  };
