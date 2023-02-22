import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: { children: ReactNode }) => {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const portalRoot = document.getElementById('portal-root');
    ref.current = portalRoot;
  }, []);

  if (ref.current && mounted) {
    return createPortal(children, ref.current);
  }
  return null;
};

export default Portal;
