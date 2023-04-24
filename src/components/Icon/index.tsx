export { default as CdsBag } from './CdsBag';
export { default as CdsHamburger } from './CdsHamburger';
export { default as CdsHeart } from './CdsHeart';
export { default as CdsHome } from './CdsHome';
export { default as CdsSearch } from './CdsSearch';
export { default as CdsUser } from './CdsUser';

import styled from '@emotion/styled';
import { IconType } from '@react-icons/all-files';
import { pixelToRem } from '@utils/pixel-to-rem';
import { CSSProperties } from 'react';

/**
 * @deprecated
 */
export type IconSource = string | IconType;

/**
 * @deprecated
 */
export interface IconProps {
  alt?: string;
  source: IconSource;
  size?: CSSProperties['width'];
  color?: CSSProperties['fill'];
}

/**
 * @deprecated
 */
const Icon = ({
  alt = '',
  source: Source,
  size = '1.5rem',
  color = 'none',
}: IconProps) => {
  if (typeof Source === 'string') {
    return (
      <IconContainer
        alt={alt}
        src={Source}
        width={pixelToRem(`${size}`)}
        height={pixelToRem(`${size}`)}
      />
    );
  }

  return <Source size={size} color={color} role="img" />;
};

const IconContainer = styled.img`
  max-width: 100%;
  max-height: 100%;
  aspect-ratio: 1 / 1;
`;

export default Icon;
