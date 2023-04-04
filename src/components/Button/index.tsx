import Icon, { IconSource } from '@components/Icon';
import Typography from '@components/Typography';
import { useTheme } from '@emotion/react';
import { flexboxStyle } from '@styles/flex-box';
import { DefaultProps } from '@utils/types/DefaultProps';
import { CSSProperties } from 'react';

import { buttonContainerCss, buttonContentCss } from './style';

interface ButtonProps extends DefaultProps<HTMLButtonElement> {
  variant?: ButtonVariant;
  text?: string;
  label: string;

  icon?: IconSource;
  iconSize?: CSSProperties['width'];
  iconPosition?: 'left' | 'right';
  iconTranslateY?: CSSProperties['translate'];

  href?: string;

  // react.HTMLAttributes에 정의되지 않은 standard button attributes
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button = ({
  variant = 'square',
  text,
  label,
  icon,
  iconSize = '1.5rem',
  iconPosition = 'left',
  iconTranslateY = 0,
  href,
  type,
  disabled,
  ...props
}: ButtonProps) => {
  const { color } = useTheme();

  const isPlain = variant === 'plain';
  const hasBackground = !variant.includes('light') && !isPlain;
  const isSquare = !variant.includes('round');
  const isIconOnly = !!icon && !text;

  const containerStyle = buttonContainerCss(
    color,
    hasBackground,
    isSquare,
    isIconOnly,
  );
  const contentStyle = buttonContentCss(color, hasBackground, iconTranslateY);

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
    'aria-label': label,
    css: [
      flexboxStyle({ gap: '0.125rem' }),
      contentStyle,
      !isPlain && containerStyle,
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
    <button {...commonProps} {...{ type, disabled }}>
      {children}
    </button>
  );
};

export default Button;
