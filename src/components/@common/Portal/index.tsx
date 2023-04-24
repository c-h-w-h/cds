import { SerializedStyles } from '@emotion/react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  id: string;
  children: ReactNode;
  style?: SerializedStyles;
}

const Portal = ({ id, children, style }: PortalProps) => {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const portalRoot = document.getElementById(id);
    ref.current = portalRoot;
  }, []);

  useEffect(() => {
    if (!ref.current || !style) return;
    ref.current.setAttribute('style', style.styles);
  }, [style]);

  if (ref.current && mounted) {
    return createPortal(children, ref.current);
  }
  return null;
};

export default Portal;
