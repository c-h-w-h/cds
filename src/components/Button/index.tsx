import Icon, { IconSource } from '@components/Icon';
import Typography from '@components/Typography';
import { useTheme } from '@emotion/react';
import { flexboxStyle } from '@styles/flex-box';
import { DefaultProps } from '@utils/types/DefaultProps';
import { CSSProperties } from 'react';

import PlainButton from './PlainButton';
import { buttonContainerCss, buttonContentCss } from './style';

interface ButtonProps extends DefaultProps<HTMLButtonElement> {
  variant?: ButtonVariant;
  text?: string;
  icon?: IconSource;
  iconSize?: CSSProperties['width'];
  iconPosition?: 'left' | 'right';
  iconTranslateY?: CSSProperties['translate'];
  href?: string;
  disabled?: boolean;
}

const Button = ({
  variant = 'round',
  text,
  icon,
  iconSize = '1.5rem',
  iconPosition = 'left',
  iconTranslateY = 0,
  href,
  disabled,
  ...props
}: ButtonProps) => {
  const { color } = useTheme();
  const hasBackground = !variant.includes('light');
  const isSquare = variant.includes('square');
  const isIconOnly = !!icon && !text;

  const containerStyle = buttonContainerCss(
    color,
    hasBackground,
    isSquare,
    isIconOnly,
  );

  const { white, primary200 } = color;
  const children = (
    <>
      {icon && iconPosition === 'left' && (
        <Icon
          source={icon}
          size={iconSize}
          color={hasBackground ? white : primary200}
        />
      )}
      {text && <Typography variant="body">{text}</Typography>}
      {icon && iconPosition === 'right' && (
        <Icon
          source={icon}
          size={iconSize}
          color={hasBackground ? white : primary200}
        />
      )}
    </>
  );

  const commonProps: Record<string, unknown> = {
    css: [
      flexboxStyle({ gap: '0.125rem' }),
      containerStyle,
      href && buttonContentCss(color, hasBackground, iconTranslateY),
    ],
    ...props,
  };

  if (href) {
    return (
      <a href={href} {...commonProps} className={disabled ? 'disabled' : ''}>
        {children}
      </a>
    );
  }

  return (
    <PlainButton {...commonProps} {...{ disabled, hasBackground }}>
      {children}
    </PlainButton>
  );
};

export default Button;
