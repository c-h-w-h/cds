import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes, HTMLAttributes, ReactNode } from 'react';

export type DefaultProps<T extends HTMLElement> = ClassAttributes<T> &
  HTMLAttributes<T> & {
    css?: Interpolation<Theme>;
    children?: ReactNode;
  };
