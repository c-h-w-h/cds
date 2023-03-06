import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  id?: string;
  children: ReactNode;
}

const Portal = ({ id, children }: PortalProps) => {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState<boolean>(false);
  const PORTAL_ROOT_ID = 'cds-portal-root';

  useEffect(() => {
    setMounted(true);
    const portalRoot = document.getElementById(id ?? PORTAL_ROOT_ID);
    ref.current = portalRoot;
  }, []);

  if (ref.current && mounted) {
    return createPortal(children, ref.current);
  }
  return null;
};

export default Portal;
