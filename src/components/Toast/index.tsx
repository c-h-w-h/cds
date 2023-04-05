import Portal from '@components-common/Portal';

import ToastOrigin, { ToastProps } from './ToastOrigin';

const Toast = (props: ToastProps) => {
  return (
    <Portal>
      <ToastOrigin {...props} />
    </Portal>
  );
};

export default Toast;
