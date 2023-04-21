import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { DefaultProps } from '@utils/types/DefaultProps';
import { CSSProperties, ReactNode, forwardRef } from 'react';

interface RadioButtonProps extends DefaultProps<HTMLInputElement> {
  name: string;
  value?: string;
  checked?: boolean;
  color?: CSSProperties['color'];
  outerSize?: CSSProperties['width'];
  size?: CSSProperties['width'];
  disabled?: boolean;
  customButton?: ReactNode;
  id?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  children?: ReactNode;
}

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      name,
      value = '',
      checked = false,
      color,
      size = '16px',
      outerSize = size,
      disabled = false,
      customButton,
      id,
      children = <span>{value}</span>,
      direction = 'right',
      ...props
    }: RadioButtonProps,
    ref,
  ) => {
    const { color: themeColor } = useTheme();
    if (!color) color = themeColor.primary100;

    return (
      <RadioButtonWrapper direction={direction}>
        {(direction === 'left' || direction === 'top') && children}
        <ActualButton
          type="radio"
          name={name}
          value={value}
          defaultChecked={checked}
          disabled={disabled}
          id={id}
          ref={ref}
          {...props}
        />
        {customButton ? (
          customButton
        ) : (
          <Button size={outerSize} color={color} aria-hidden>
            <svg viewBox="0 0 30 30" width={size} height={size}>
              <circle
                cx="15"
                cy="15"
                r="12"
                stroke={color}
                strokeWidth="3"
                fill="white"
                width="30"
                height="30"
              />
              <circle
                cx="15"
                cy="15"
                r="7"
                fill={color}
                width="30"
                height="30"
              />
            </svg>
          </Button>
        )}
        {(direction === 'right' || direction === 'bottom') && children}
      </RadioButtonWrapper>
    );
  },
);

interface WrapperProps {
  direction: 'left' | 'right' | 'top' | 'bottom';
}

const RadioButtonWrapper = styled.label<WrapperProps>`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === 'left' || direction === 'right' ? 'row' : 'column'};
  align-items: center;
  justify-content: center;
  position: relative;

  & > input[type='radio']:not(:disabled) ~ * {
    cursor: pointer;
  }
`;

interface ButtonProps {
  size: CSSProperties['width'];
  color: CSSProperties['color'];
}

const Button = styled.div<ButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  border-radius: 100%;
  ${({ size }) => `width:${size}; height:${size};`}

  & > svg > circle:nth-of-type(2) {
    display: none;
  }

  input[type='radio']:checked ~ & > svg > circle:nth-of-type(2) {
    display: inline;
  }

  input[type='radio']:disabled ~ & > svg {
    filter: grayscale(100%);
  }

  input[type='radio']:not(:disabled) ~ & {
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &:active {
      filter: brightness(0.9);
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  input[type='radio']:focus ~ & {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ActualButton = styled.input`
  width: 0px;
  height: 0px;
  margin: 0;
  opacity: 0.5;
`;

RadioButton.displayName = 'RadioButton';

export { RadioButton };
