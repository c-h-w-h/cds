import { ReactNode } from 'react';

import { DefaultProps } from './DefaultProps';

export type DefaultPropsWithChildren<T extends HTMLElement> =
  DefaultProps<T> & {
    children: ReactNode;
  };
