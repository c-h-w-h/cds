import Icon, { IconSource } from '@components/Icon';
import Typography from '@components/Typography';
import Flexbox from '@components-layout/Flexbox';
import { css, useTheme } from '@emotion/react';
import { pixelToRem } from '@utils/pixelToRem';
import { CSSProperties } from 'react';

type ButtonVariant =
  | 'round'
  | 'square'
  | 'light'
  | 'round light'
  | 'square light';

interface ButtonProps {
  variant?: ButtonVariant;
  text?: string;
  icon?: IconSource;
  iconSize?: CSSProperties['width'];
  iconPosition?: 'left' | 'right';
  iconTranslateY?: CSSProperties['translate'];
}

const Button = ({
  variant = 'round',
  text,
  icon,
  iconSize = '1.5rem',
  iconPosition = 'left',
  iconTranslateY = 0,
  ...props
}: ButtonProps) => {
  const { color: themeColor } = useTheme();
  const { white, primary200, primary400, gray200 } = themeColor;

  const isLight = variant.includes('light');
  const isSquare = variant.includes('square');
  const isIconOnly = !!icon && !text;

  const buttonCss = css`
    width: fit-content;
    padding: ${pixelToRem('12px')};
    border-radius: ${getBorderRadius(isSquare, isIconOnly)};
    color: ${isLight ? primary200 : white};
    background-color: ${isLight ? white : primary200};
    ${isLight ? `border: 0.125rem solid ${primary200};` : ''}

    & > svg,
    & > img {
      transform: translateY(${pixelToRem(`${iconTranslateY}`)});
    }

    &:hover {
      cursor: pointer;
      color: ${isLight ? primary400 : white};
      background-color: ${isLight ? white : primary400};
      ${isLight ? `border: 0.125rem solid ${primary400};` : ''}

      & > svg {
        fill: ${isLight ? primary400 : white};
      }
    }

    &:disabled {
      color: ${isLight ? gray200 : white};
      background-color: ${isLight ? white : gray200};
      ${isLight ? `border: 0.125rem solid ${gray200};` : ''}

      & > svg {
        fill: ${isLight ? gray200 : white};
      }
    }
  `;

  return (
    <Flexbox as="button" gap={'0.125rem'} css={buttonCss} {...props}>
      {icon && iconPosition === 'left' && (
        <Icon
          source={icon}
          size={iconSize}
          color={isLight ? primary200 : white}
        />
      )}
      {text && <Typography variant="body">{text}</Typography>}
      {icon && iconPosition === 'right' && (
        <Icon
          source={icon}
          size={iconSize}
          color={isLight ? primary200 : white}
        />
      )}
    </Flexbox>
  );
};

const getBorderRadius = (isSquare: boolean, isIconOnly: boolean) => {
  if (isSquare) {
    return isIconOnly ? '30%' : pixelToRem('16px');
  }
  return isIconOnly ? '50%' : pixelToRem('36px');
};

export default Button;
