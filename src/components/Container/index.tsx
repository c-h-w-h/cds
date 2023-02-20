import { css } from '@emotion/react';
import { DefaultPropsWithChildren } from '@util-types/DefaultPropsWithChildren';

interface ContainerProps extends DefaultPropsWithChildren<HTMLDivElement> {
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto';
}

const Container = ({
  children,
  css: style,
  overflowX = 'hidden',
  overflowY = 'hidden',
  ...props
}: ContainerProps) => {
  return (
    <div
      css={[
        css`
          max-width: 100%;
          width: 100%;
          height: 100%;
          overflow-x: ${overflowX};
          overflow-y: ${overflowY};
        `,
        style,
      ]}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
