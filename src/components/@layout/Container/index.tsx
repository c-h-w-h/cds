import { css } from '@emotion/react';
import { DefaultPropsWithChildren } from '@util-types/DefaultPropsWithChildren';
import { CSSProperties } from 'react';

interface ContainerProps extends DefaultPropsWithChildren<HTMLDivElement> {
  overflowX?: CSSProperties['overflowX'];
  overflowY?: CSSProperties['overflowY'];
}

const Container = ({
  children,
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
      ]}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
