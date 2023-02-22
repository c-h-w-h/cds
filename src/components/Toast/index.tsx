import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { DefaultProps } from '@src/utils/types/DefaultProps';
import { ReactNode, useEffect, useState } from 'react';
import {
  MdOutlineNotifications,
  MdInfoOutline,
  MdCheckCircleOutline,
  MdWarningAmber,
  MdOutlineDangerous,
  MdOutlineCancel,
} from 'react-icons/md';

import { theme } from '../CdsProvider/theme';
import Flexbox from '../Flexbox';
import Typography from '../Typography';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const bounce = (vertical: string) => keyframes`
  from {
    opacity: 0;
    transform: translateY(${vertical === 'top' ? -1 : 1}em);
  }

  to {
    transform: translateY(0);
  }
`;

enum VerticalVariant {
  top = 'top',
  bottom = 'bottom',
}

enum HorizontalVariant {
  left = 'left',
  right = 'right',
  center = 'center',
}

type ToastKind = 'info' | 'success' | 'warning' | 'error';

interface ToastProps extends DefaultProps<HTMLDivElement> {
  kind: ToastKind;
  vertical: keyof typeof VerticalVariant;
  horizontal: keyof typeof HorizontalVariant;
}

const V_POSITION_MAP: Record<VerticalVariant, object> = {
  [VerticalVariant.top]: {
    top: 0,
    marginTop: '1rem',
  },
  [VerticalVariant.bottom]: {
    bottom: 0,
    marginBottom: '1rem',
  },
};

const H_POSITION_MAP: Record<HorizontalVariant, object> = {
  [HorizontalVariant.left]: {
    left: 0,
    marginLeft: '1rem',
  },
  [HorizontalVariant.right]: {
    right: 0,
    marginRight: '1rem',
  },
  [HorizontalVariant.center]: {
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
};

const Toast = ({ kind, vertical, horizontal }: ToastProps) => {
  const [mainIcon, setMainIcon] = useState<ReactNode | null>();
  const { color: themeColor } = theme;

  useEffect(() => {
    const getMainIcon = (kind: ToastKind) => {
      switch (kind) {
        case 'info':
          return <MdInfoOutline size="32" color={themeColor[kind]} />;
        case 'success':
          return <MdCheckCircleOutline size="32" color={themeColor[kind]} />;
        case 'warning':
          return <MdWarningAmber size="32" color={themeColor[kind]} />;
        case 'error':
          return <MdOutlineDangerous size="32" color={themeColor[kind]} />;
        default:
          return <MdOutlineNotifications size="32" />;
      }
    };
    setMainIcon(getMainIcon(kind));
  }, [kind]);

  return (
    <div
      css={{
        position: 'absolute',
        ...V_POSITION_MAP[vertical],
        ...H_POSITION_MAP[horizontal],
      }}
    >
      <Flexbox
        css={css`
          padding: 1rem;
          border: 2px solid black;
          border-radius: 16px;
          opacity: 0;
          animation: ${fadeIn} 0.01s 1s linear forwards;

          & * {
            animation: ${bounce(vertical)} 0.6s 1s
              cubic-bezier(0.34, 1.72, 0.58, 0.85) forwards;
          }
        `}
      >
        {mainIcon}
        <div>
          <Typography variant="subtitle2">Success</Typography>
          <Typography variant="desc">
            Toast Message 구현에 성공했습니다!
          </Typography>
        </div>
        <TempButton onClick={() => alert('Clicked!')}>
          <MdOutlineCancel size="16" />
        </TempButton>
      </Flexbox>
    </div>
  );
};

export default Toast;

const TempButton = styled.button`
  display: flex;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;

  :hover {
    background-color: red;
  }
`;
