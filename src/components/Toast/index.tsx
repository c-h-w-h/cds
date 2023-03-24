import { theme } from '@components/@common/CdsProvider/theme';
import Flexbox from '@components/@layout/Flexbox';
import Typography from '@components/Typography';
import Portal from '@components-common/Portal';
import {
  ToastKind,
  VerticalVariant,
  HorizontalVariant,
  V_POSITION_MAP,
  H_POSITION_MAP,
  MAIN_ICON_SIZE,
  CLOSE_ICON_SIZE,
} from '@constants/toast';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { DefaultProps } from '@utils/types/DefaultProps';
import { useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import ToastIcon from './ToastIcon';

export interface ToastProps extends DefaultProps<HTMLDivElement> {
  duration?: number;
  kind?: ToastKind;
  title?: string;
  message: string;
  vertical: VerticalVariant;
  horizontal: HorizontalVariant;
  open: boolean;
  onClose: () => void;
}

const startWithCapitalLetter = (str: string) =>
  str[0].toUpperCase() + str.substring(1);

const Toast = ({
  kind,
  title,
  message,
  vertical,
  horizontal,
  duration = 3000,
  open,
  onClose,
}: ToastProps) => {
  const { color: themeColor } = theme;
  const { white, black } = themeColor;
  const mainColor = kind ? themeColor[kind] : black;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  return (
    <Portal>
      {open && (
        <Flexbox
          css={[
            css`
              position: absolute;
              padding: 1rem;
              border: 2px solid ${mainColor};
              border-radius: 16px;
              background-color: ${white};
              opacity: 0;
              animation: ${fadeIn} 0.01s 0.1s linear forwards;

              & * {
                animation: ${bounce(vertical)} 0.6s 0.1s
                  cubic-bezier(0.34, 1.72, 0.58, 0.85) forwards;
              }
            `,
            V_POSITION_MAP[vertical],
            H_POSITION_MAP[horizontal],
          ]}
        >
          <ToastIcon kind={kind} size={MAIN_ICON_SIZE} color={mainColor} />
          <Flexbox
            flexDirection="column"
            alignItems={'flex-start'}
            css={[
              css`
                max-width: 10vw;
              `,
            ]}
          >
            <Typography variant="subtitle2">
              {title ?? (kind ? startWithCapitalLetter(kind) : 'Alarm')}
            </Typography>
            <Typography variant="desc">{message}</Typography>
          </Flexbox>
          <CloseButton mainColor={mainColor} onClick={onClose}>
            <MdOutlineCancel size={CLOSE_ICON_SIZE} color={mainColor} />
          </CloseButton>
        </Flexbox>
      )}
    </Portal>
  );
};

export default Toast;

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

interface CloseButtonProps {
  mainColor: string;
}

const CloseButton = styled.button<CloseButtonProps>(({ mainColor, theme }) => {
  const { color: themeColor } = theme;
  const { white } = themeColor;

  return {
    display: 'flex',
    outline: 'none',
    border: 'none',
    padding: '0',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    cursor: 'pointer',

    ':hover': {
      backgroundColor: `${mainColor}`,

      svg: {
        fill: `${white}`,
      },
    },
  };
});
