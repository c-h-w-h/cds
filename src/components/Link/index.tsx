import { ButtonBaseProps } from '@components/Button';
import useButtonStyle from '@components/Button/useButtonStyle';
import { AnchorHTMLAttributes } from 'react';

type ButtonLinkProps = ButtonBaseProps & {
  href: string;
  disabled?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const Link = ({
  variant = 'square',
  label,
  href,
  disabled,
  children,
  ...props
}: ButtonLinkProps) => {
  const { style } = useButtonStyle(variant);

  return (
    <a
      css={style}
      href={href}
      className={disabled ? 'disabled' : ''}
      aria-label={label}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;
