import { ClassAttributes, HTMLAttributes, ReactNode } from 'react';

export type DefaultProps<T extends HTMLElement> = ClassAttributes<T> &
  HTMLAttributes<T> & {
    children?: ReactNode;
  };
