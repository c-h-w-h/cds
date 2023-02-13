import { css } from '@emotion/react';
import React from 'react';

interface CenterProps {
  children: React.ReactNode;
}

function Center({ children }: CenterProps) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      `}
    >
      {children}
    </div>
  );
}

export default Center;
