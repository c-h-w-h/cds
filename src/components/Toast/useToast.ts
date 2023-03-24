import { useState } from 'react';

const useToast = (isOpen = false) => {
  const [open, setOpen] = useState<boolean>(isOpen);

  const onOpenToast = () => {
    setOpen(true);
  };

  const onCloseToast = () => {
    setOpen(false);
  };

  return { open, setOpen, onOpenToast, onCloseToast };
};

export default useToast;
