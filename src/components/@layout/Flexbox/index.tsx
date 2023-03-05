import styled from '@emotion/styled';
import { DefaultPropsWithChildren } from '@util-types/DefaultPropsWithChildren';
import { FlexContainerProps } from '@util-types/FlexContainerProps';

type FlexboxProps = DefaultPropsWithChildren<HTMLDivElement> &
  FlexContainerProps;

const Flexbox = styled.div<FlexboxProps>(
  ({
    css,
    flexDirection = 'row',
    flexWrap = 'nowrap',
    alignContent = 'normal',
    alignItems = 'center',
    justifyContent = 'center',
    gap = '1rem',
  }) => {
    return [
      {
        display: 'flex',
        flexDirection,
        flexWrap,
        alignContent,
        alignItems,
        justifyContent,
        gap,
      },
      css?.toString(),
    ];
  },
);

export default Flexbox;
