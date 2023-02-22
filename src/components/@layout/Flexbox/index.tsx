import { css } from '@emotion/react';
import { DefaultPropsWithChildren } from '@util-types/DefaultPropsWithChildren';
import { FlexContainerProps } from '@util-types/FlexContainerProps';

type FlexboxProps = DefaultPropsWithChildren<HTMLDivElement> &
  FlexContainerProps;

const Flexbox = ({
  children,
  css: style,
  direction = 'row',
  wrap = 'nowrap',
  alignContent = 'normal',
  alignItems = 'center',
  justifyContent = 'center',
  gap = '1rem',
  ...props
}: FlexboxProps) => {
  return (
    <div
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
    </div>
  );
};

export default Flexbox;
