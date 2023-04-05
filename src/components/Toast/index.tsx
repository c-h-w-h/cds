import Portal from '@components-common/Portal';
import { PORTAL_TOAST_ROOT_ID } from '@constants/portal';

import ToastOrigin, { ToastProps } from './ToastCore';

const Toast = (props: ToastProps) => {
  return (
    <Portal id={PORTAL_TOAST_ROOT_ID}>
      <ToastOrigin {...props} />
    </Portal>
  );
};

export default Toast;
