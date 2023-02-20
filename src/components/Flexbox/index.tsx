import { css } from '@emotion/react';
import { DefaultPropsWithChildren } from '@util-types/DefaultPropsWithChildren';
import { CSSProperties } from 'react';

interface FlexboxProps extends DefaultPropsWithChildren<HTMLDivElement> {
  direction?: CSSProperties['flexDirection'];
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  gap?: CSSProperties['gap'];
}

const Flexbox = ({
  children,
  css: style,
  direction = 'row',
  align = 'center',
  justify = 'center',
  gap = '1rem',
  ...props
}: FlexboxProps) => {
  return (
    <div
      css={[
        css`
          display: flex;
          flex-direction: ${direction};
          align-items: ${align};
          justify-content: ${justify};
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
