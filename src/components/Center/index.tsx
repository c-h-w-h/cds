import Flexbox from '@components/Flexbox';
import { css } from '@emotion/react';
import { ReactNode } from 'react';

interface CenterProps {
  children: ReactNode;
}

const Center = ({ children }: CenterProps) => {
  return (
    <Flexbox
      alignItems="center"
      justifyContent="center"
      css={css`
        text-align: center;
      `}
    >
      {children}
    </Flexbox>
  );
};

export default Center;
