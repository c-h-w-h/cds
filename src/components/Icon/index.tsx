import styled from '@emotion/styled';
import { IconType } from '@react-icons/all-files';
import { pixelToRem } from '@utils/pixelToRem';
import { CSSProperties } from 'react';

export type IconSource = string | IconType;

interface IconProps {
  source: IconSource;
  size: CSSProperties['width'];
  color: CSSProperties['fill'];
}

const Icon = ({ source: Source, size, color, ...props }: IconProps) => {
  if (typeof Source === 'string') {
    return (
      <IconContainer
        src={Source}
        width={pixelToRem(`${size}`)}
        height={pixelToRem(`${size}`)}
        {...{ ...props }}
      />
    );
  }

  return <Source size={size} color={color} />;
};

const IconContainer = styled.img`
  max-width: 100%;
  max-height: 100%;
  aspect-ratio: 1 / 1;
`;

export default Icon;
