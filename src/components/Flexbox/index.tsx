import { css } from '@emotion/react';
import { DefaultPropsWithChildren } from '@util-types/DefaultPropsWithChildren';
import { CSSProperties } from 'react';

interface FlexboxProps extends DefaultPropsWithChildren<HTMLDivElement> {
  direction?: CSSProperties['flexDirection'];
  wrap?: CSSProperties['flexWrap'];
  alignContent?: CSSProperties['alignContent'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  gap?: CSSProperties['gap'];
}

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
