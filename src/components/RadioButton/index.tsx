import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { CSSProperties } from '@utils';
import { DefaultProps } from '@utils/types/DefaultProps';
import { ReactNode, forwardRef } from 'react';

interface RadioButtonProps extends DefaultProps<HTMLInputElement> {
  name: string;
  value: string;
  checked?: boolean;
  color?: CSSProperties['color'];
  clickableSize?: CSSProperties['width'];
  size?: CSSProperties['width'];
  disabled?: boolean;
  customButton?: ReactNode;
  id?: string;
  label?: string;
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
      clickableSize = size,
      disabled = false,
      customButton,
      id,
      label,
      children = <span>{label ?? value}</span>,
      direction = 'right',
      ...props
    }: RadioButtonProps,
    ref,
  ) => {
    const { color: themeColor } = useTheme();
    if (!color) color = themeColor.primary;

    return (
      <WrapperLabel direction={direction}>
        {(direction === 'left' || direction === 'top') && children}
        <ActualInput
          type="radio"
          name={name}
          value={value}
          defaultChecked={checked}
          disabled={disabled}
          id={id}
          ref={ref}
          aria-label={label?.length ? label : value}
          {...props}
        />
        {customButton ? (
          customButton
        ) : (
          <DefaultButtonDiv size={clickableSize} color={color} aria-hidden>
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
          </DefaultButtonDiv>
        )}
        {(direction === 'right' || direction === 'bottom') && children}
      </WrapperLabel>
    );
  },
);

interface WrapperProps {
  direction: 'left' | 'right' | 'top' | 'bottom';
}

const WrapperLabel = styled.label<WrapperProps>`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === 'left' || direction === 'right' ? 'row' : 'column'};
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 1px;

  & > input[type='radio']:not(:disabled) ~ * {
    cursor: pointer;
  }

  & > input[type='radio']:disabled ~ * {
    cursor: not-allowed;
  }
`;

interface ButtonProps {
  size: CSSProperties['width'];
  color: CSSProperties['color'];
}

const DefaultButtonDiv = styled.div<ButtonProps>`
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
    @keyframes fadeOut {
      0% {
        background-color: rgba(0, 0, 0, 0.2);
      }
      100% {
        background-color: rgba(0, 0, 0, 0);
      }
    }

    animation: fadeOut 0.5s ease-out forwards;
  }
`;

const ActualInput = styled.input`
  width: 0px;
  height: 0px;
  margin: 0;
  opacity: 0.5;
`;

RadioButton.displayName = 'RadioButton';

export default RadioButton;
