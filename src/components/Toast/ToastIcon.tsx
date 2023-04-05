import {
  MdNotifications,
  MdInfo,
  MdCheckCircle,
  MdWarning,
  MdDangerous,
} from 'react-icons/md';

import { ToastProps } from './ToastOrigin';

interface ToastIconProps {
  kind: ToastProps['kind'];
  size: string;
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

export default ToastIcon;
