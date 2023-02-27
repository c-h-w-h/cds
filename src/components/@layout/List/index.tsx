import Flexbox from '@components-layout/Flexbox';
import { Interpolation, Theme } from '@emotion/react';
import { FlexContainerProps } from '@utils/types/FlexContainerProps';
import { ReactNode } from 'react';

type ListProps = FlexContainerProps & {
  children: ReactNode;
  css?: Interpolation<Theme>;
};

const List = ({ flexDirection = 'column', children, ...props }: ListProps) => {
  return (
    <Flexbox as={'ul'} flexDirection={flexDirection} {...props}>
      {children}
    </Flexbox>
  );
};

export default List;
