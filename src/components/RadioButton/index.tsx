import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { DefaultProps } from '@utils/types/DefaultProps';
import { CSSProperties, ReactNode, RefObject } from 'react';

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
  inputRef?: RefObject<HTMLInputElement>;
}

const RadioButton = ({
  name,
  value = '',
  checked = false,
  color,
  size = '16px',
  outerSize = size,
  disabled = false,
  customButton,
  id,
  inputRef,
  ...props
}: RadioButtonProps) => {
  const { color: themeColor } = useTheme();
  if (!color) color = themeColor.primary100;

  return (
    <RadioButtonWrapper size={outerSize}>
      <ActualButton
        type="radio"
        name={name}
        value={value}
        defaultChecked={checked}
        disabled={disabled}
        id={id ?? ''}
        ref={inputRef}
        {...props}
      />
      {customButton ? (
        customButton
      ) : (
        <Button>
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
            <circle cx="15" cy="15" r="7" fill={color} width="30" height="30" />
          </svg>
        </Button>
      )}
    </RadioButtonWrapper>
  );
};

interface WrapperProps {
  size: CSSProperties['width'];
}

const RadioButtonWrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;

  ${({ size }) => `width:${size}; height:${size};`}
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 100%;

  & > svg > circle:nth-of-type(2) {
    display: none;
  }

  input[type='radio']:checked + & > svg > circle:nth-of-type(2) {
    display: inline;
  }

  input[type='radio']:disabled + & > svg {
    filter: grayscale(100%);
  }

  input[type='radio']:not(:disabled) + & {
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &:active {
      filter: brightness(0.9);
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const ActualButton = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  margin: 0;
  opacity: 0;
  pointer-events: none;
`;

export { RadioButton };
