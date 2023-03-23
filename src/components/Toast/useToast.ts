import { useState } from 'react';

const useToast = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return { open, setOpen, handleOpen, handleClose };
};

export default useToast;
