import { css } from '@emotion/react';
import { DefaultPropsWithChildren } from '@util-types/DefaultPropsWithChildren';
import { FlexContainerProps } from '@util-types/FlexContainerProps';

type ListProps = DefaultPropsWithChildren<HTMLUListElement> &
  FlexContainerProps;

const List = ({
  children,
  css: style,
  direction = 'column',
  wrap = 'nowrap',
  alignContent = 'normal',
  alignItems = 'center',
  justifyContent = 'center',
  gap = '1rem',
  ...props
}: ListProps) => {
  return (
    <ul
      css={[
        css`
          display: flex;
          flex-direction: ${direction};
          flex-wrap: ${wrap};
          align-content: ${alignContent};
          align-items: ${alignItems};
          justify-content: ${justifyContent};
          gap: ${gap};
        `,
        style,
      ]}
      {...props}
    >
      {children}
    </ul>
  );
};

export default List;
