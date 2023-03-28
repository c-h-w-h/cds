import { useState } from 'react';

const useToast = (initialState = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const openToast = () => {
    setIsOpen(true);
  };

  const closeToast = () => {
    setIsOpen(false);
  };

  const toastProps = {
    open: isOpen,
    onClose: closeToast,
  };

  return { openToast, closeToast, toastProps };
};

export default useToast;
