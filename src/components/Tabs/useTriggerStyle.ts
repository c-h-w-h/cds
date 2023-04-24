import { css, useTheme } from '@emotion/react';

import { TabsVariant } from '.';

const useTriggerStyle = (
  variant: TabsVariant,
  isFitted: boolean,
  isActive: boolean,
) => {
  const { color: themeColor } = useTheme();
  const { primary, gray100, black, white } = themeColor;

  const underlineStyle = {
    borderColor: `${isActive ? primary : gray100}`,
    borderRadius: 0,
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    marginBottom: '-2px',
  } as const;

  const roundedStyle = {
    border: `${isActive && `2px ${gray100} solid`}`,
    borderRadius: '10px',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: `${white}`,
    marginBottom: '-2px',
  } as const;

  const variantStyles = {
    underline: underlineStyle,
    rounded: roundedStyle,
  };

  const triggerStyle = css`
    display: flex;
    justify-content: center;
    padding: 0.75rem;
    text-decoration: none;
    white-space: nowrap;
    width: ${isFitted === true && '100%'};
    background-color: ${white};
    scroll-margin: 24px;
    ${variantStyles[variant]}

    & > p {
      color: ${isActive ? primary : black};
    }

    & > svg {
      fill: ${isActive ? primary : black};
    }

    &:hover {
      cursor: pointer;
      background-color: ${isActive ? white : primary};
      border-bottom-color: ${primary};

      & > * {
        color: ${isActive ? primary : white};
      }

      & > svg {
        fill: ${isActive ? primary : white};
      }
    }

    &:disabled {
      background-color: ${white};
      cursor: not-allowed;

      & > p {
        color: ${gray100};
      }

      & > svg {
        fill: ${gray100};
      }

      &:hover {
        border-bottom-color: ${gray100};
      }
    }
  `;
  return triggerStyle;
};

export default useTriggerStyle;
