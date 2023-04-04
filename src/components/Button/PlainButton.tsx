import { useTheme } from '@emotion/react';
import { DefaultPropsWithChildren } from '@util-types/DefaultPropsWithChildren';
import { CSSProperties } from 'react';

import { buttonContentCss } from './style';

interface PlainButtonProps extends DefaultPropsWithChildren<HTMLButtonElement> {
  hasBackground?: boolean;
  iconTranslateY?: CSSProperties['translate'];

  // react.HTMLAttributes 인터페이스에는 정의되지 않은 standard button attributes
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean | undefined;
}

const PlainButton = ({
  hasBackground = false,
  iconTranslateY = 0,
  children,
  ...props
}: PlainButtonProps) => {
  const { color } = useTheme();
  const buttonStyle = buttonContentCss(color, hasBackground, iconTranslateY);

  return (
    <button css={buttonStyle} {...props}>
      {children}
    </button>
  );
};

export default PlainButton;
