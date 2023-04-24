import { css, useTheme } from '@emotion/react';
import { flexboxStyle } from '@styles/flex-box';

const useButtonStyle = (variant: ButtonVariant) => {
  const { color: themeColor } = useTheme();
  const { white, primary, primaryDark, gray200 } = themeColor;

  const isPlain = variant === 'plain';
  const hasBackground = !variant.includes('light') && !isPlain;
  const isSquare = !variant.includes('round');

  const containerStyle = css`
    cursor: pointer;
    width: fit-content;

    &:disabled,
    &.disabled {
      cursor: not-allowed;
    }

    &,
    * {
      font-size: 1rem;
      font-weight: 400;
    }

    svg,
    img {
      width: 1.5rem;
      height: 1.5rem;
    }

    ${isPlain
      ? css`
          background: transparent;
        `
      : css`
          border-radius: ${isSquare ? '8px' : 'calc(1rem + 24px)'};
          background-color: ${hasBackground ? primary : white};
          border: 2px solid ${primary};

          &:hover {
            background-color: ${hasBackground ? primaryDark : white};
            border: 2px solid ${primaryDark};
          }

          &:disabled,
          &.disabled {
            background-color: ${hasBackground ? gray200 : white};
            border: 2px solid ${gray200};
          }
        `}
  `;

  const contentStyle = css`
    padding: 12px;
    color: ${hasBackground ? white : primary};
    text-decoration: none;

    ${!hasBackground &&
    css`
      &:hover {
        color: ${primaryDark};
      }

      &:disabled,
      &.disabled {
        color: ${gray200};
      }
    `}
  `;

  return {
    style: [flexboxStyle({ gap: '2px' }), containerStyle, contentStyle],
  };
};

export default useButtonStyle;
