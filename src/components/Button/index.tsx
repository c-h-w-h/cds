import { ButtonHTMLAttributes } from 'react';

import useButtonStyle from './useButtonStyle';

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  label?: string;
  children: TextNode;
}

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant = 'square',
  label,
  children,
  ...props
}: ButtonProps) => {
  const { style } = useButtonStyle(variant);

  return (
    <button css={style} aria-label={label} {...props}>
      {children}
    </button>
  );
};

export default Button;
