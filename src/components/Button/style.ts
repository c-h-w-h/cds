import { COLOR } from '@constants/color';
import { css } from '@emotion/react';
import { CSSProperties } from 'react';

export const buttonContainerCss = (
  themeColor: typeof COLOR,
  hasBackground: boolean,
  isSquare: boolean,
  isIconOnly: boolean,
) => {
  const borderRadius = getBorderRadius(isSquare, isIconOnly);

  const { white, primary200, primary400, gray200 } = themeColor;

  return css`
    cursor: pointer;
    width: fit-content;
    border-radius: ${borderRadius};
    background-color: ${hasBackground ? primary200 : white} !important;
    border: 0.125rem solid ${primary200};

    &:hover {
      background-color: ${hasBackground ? primary400 : white} !important;
      border: 0.125rem solid ${primary400};
    }

    &:disabled,
    &.disabled {
      cursor: not-allowed;
      background-color: ${hasBackground ? gray200 : white} !important;
      border: 0.125rem solid ${gray200};
    }
  `;
};

const getBorderRadius = (isSquare: boolean, isIconOnly: boolean) => {
  const percentage = isSquare ? '8px' : '50%';
  const rem = isSquare ? '8px' : '2.25rem';

  return isIconOnly ? percentage : rem;
};

export const buttonContentCss = (
  themeColor: typeof COLOR,
  hasBackground: boolean,
  iconTranslateY: CSSProperties['translate'],
) => {
  const { primary200, primary400, gray200, white } = themeColor;

  return css`
    cursor: pointer;
    padding: 0.75rem;
    color: ${hasBackground ? white : primary200};
    background: none;
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
};
