import { ChildrenProps } from './ChildrenProps';
import { DefaultProps } from './DefaultProps';

export type DefaultPropsWithChildren<T extends HTMLElement> = DefaultProps<T> &
  ChildrenProps;
