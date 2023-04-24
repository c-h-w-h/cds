import { css, useTheme } from '@emotion/react';

import { TabsVariant } from '.';

const useTriggerStyle = (
  variant: TabsVariant,
  isFitted: boolean,
  isActive: boolean,
) => {
  const { color: themeColor } = useTheme();
  const { primary100, gray100, black, white } = themeColor;

  const underlineStyle = {
    borderColor: `${isActive ? primary100 : gray100}`,
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
      color: ${isActive ? primary100 : black};
    }

    & > svg {
      fill: ${isActive ? primary100 : black};
    }

    &:hover {
      cursor: pointer;
      background-color: ${isActive ? white : primary100};
      border-bottom-color: ${primary100};

      & > * {
        color: ${isActive ? primary100 : white};
      }

      & > svg {
        fill: ${isActive ? primary100 : white};
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
