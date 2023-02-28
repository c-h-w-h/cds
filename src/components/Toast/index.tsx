import { theme } from '@components/@common/CdsProvider/theme';
import Flexbox from '@components/@layout/Flexbox';
import Typography from '@components/Typography';
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
import {
  MdNotifications,
  MdInfo,
  MdCheckCircle,
  MdWarning,
  MdDangerous,
  MdOutlineCancel,
} from 'react-icons/md';

interface ToastProps extends DefaultProps<HTMLDivElement> {
  kind?: ToastKind;
  title?: string;
  message: string;
  vertical: VerticalVariant;
  horizontal: HorizontalVariant;
}

const startWithCapitalLetter = (str: string) =>
  str[0].toUpperCase() + str.substring(1);

const Toast = ({ kind, title, message, vertical, horizontal }: ToastProps) => {
  const { color: themeColor } = theme;
  const mainColor = kind ? themeColor[kind] : '';

  return (
    <Flexbox
      css={[
        css`
          position: absolute;
          padding: 1rem;
          border: 2px solid ${mainColor};
          border-radius: 16px;
          opacity: 0;
          animation: ${fadeIn} 0.01s 1s linear forwards;

          & * {
            animation: ${bounce(vertical)} 0.6s 1s
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
      <TempButton onClick={() => alert('Clicked!')}>
        <MdOutlineCancel size={CLOSE_ICON_SIZE} color={mainColor} />
      </TempButton>
    </Flexbox>
  );
};

export default Toast;

interface ToastIconProps {
  kind: ToastProps['kind'];
  size: number;
  color: string;
}

const ToastIcon = ({ kind, size, color }: ToastIconProps) => {
  const iconStyle = {
    size,
    color,
  };

  switch (kind) {
    case 'info':
      return <MdInfo {...iconStyle} />;
    case 'success':
      return <MdCheckCircle {...iconStyle} />;
    case 'warning':
      return <MdWarning {...iconStyle} />;
    case 'error':
      return <MdDangerous {...iconStyle} />;
    default:
      return <MdNotifications {...iconStyle} />;
  }
};

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
