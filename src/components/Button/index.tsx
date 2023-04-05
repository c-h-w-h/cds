import Icon, { IconSource } from '@components/Icon';
import Typography from '@components/Typography';
import { css, useTheme } from '@emotion/react';
import { flexboxStyle } from '@styles/flex-box';
import { DefaultProps } from '@utils/types/DefaultProps';
import { CSSProperties } from 'react';

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
  const { white, primary200, primary400, gray200 } = color;

  const isPlain = variant === 'plain';
  const hasBackground = !variant.includes('light') && !isPlain;
  const isSquare = !variant.includes('round');
  const isIconOnly = !!icon && !text;

  const containerStyle = isPlain
    ? css`
        cursor: pointer;
        width: fit-content;
        background: transparent;
      `
    : css`
        cursor: pointer;
        width: fit-content;
        border-radius: ${getBorderRadius(isSquare, isIconOnly)};
        background-color: ${hasBackground ? primary200 : white};
        border: 0.125rem solid ${primary200};

        &:hover {
          background-color: ${hasBackground ? primary400 : white};
          border: 0.125rem solid ${primary400};
        }

        &:disabled,
        &.disabled {
          cursor: not-allowed;
          background-color: ${hasBackground ? gray200 : white};
          border: 0.125rem solid ${gray200};
        }
      `;

  const contentStyle = css`
    padding: 0.75rem;
    color: ${hasBackground ? white : primary200};
    text-decoration: none;

    & > svg,
    & > img {
      transform: translateY(${iconTranslateY});
    }

    &:hover {
      color: ${hasBackground ? white : primary400};

      & > svg {
        fill: ${hasBackground ? white : primary400};
      }
    }

    &:disabled,
    &.disabled {
      color: ${hasBackground ? white : gray200};

      & > svg {
        fill: ${hasBackground ? white : gray200};
      }
    }
  `;

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
    css: [flexboxStyle({ gap: '0.125rem' }), containerStyle, contentStyle],
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

const getBorderRadius = (isSquare: boolean, isIconOnly: boolean) => {
  const percentage = isSquare ? '8px' : '50%';
  const rem = isSquare ? '8px' : '2.25rem';

  return isIconOnly ? percentage : rem;
};
