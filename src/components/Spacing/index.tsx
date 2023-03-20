import { SPACING } from '@constants/spacing';
import { css } from '@emotion/react';

interface SpacingProps {
  size: SpacingVariant;
}

const Spacing = ({ size }: SpacingProps) => {
  const spacingStyle = css`
    height: ${SPACING[size]};
  `;

  return <div css={spacingStyle}></div>;
};

export default Spacing;
