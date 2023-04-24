import { css } from '@emotion/react';
import { ReactNode } from 'react';

const MobileContainer = ({ children }: { children: ReactNode }) => {
  const containerStyle = css`
    position: relative;
    width: min(100vw, 375px);
    height: 100vh;

    overflow: hidden;
    margin: auto;
  `;

  const scrollableStyle = css`
    height: 100vh;
    overflow-y: scroll;

    ::-webkit-scrollbar {
      width: 0;
    }
  `;

  return (
    <div css={containerStyle}>
      <div css={scrollableStyle}>{children}</div>
    </div>
  );
};

export default MobileContainer;
