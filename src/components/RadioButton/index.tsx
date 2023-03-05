import { theme } from '@components/@common/CdsProvider/theme';
import styled from '@emotion/styled';
import { DefaultProps } from '@utils/types/DefaultProps';
import { CSSProperties, ReactNode } from 'react';

interface RadioButtonProps extends DefaultProps<HTMLInputElement> {
  name: string;
  value?: string;
  checked?: boolean;
  color?: CSSProperties['color'];
  outerSize?: CSSProperties['width'];
  size?: CSSProperties['width'];
  disabled?: boolean;
  customFlag?: ReactNode;
}

const RadioButton = ({
  name,
  value = '',
  checked = false,
  color = theme.color.primary100,
  size = '1rem',
  outerSize = '1.5rem',
  disabled = false,
  customFlag,
  ...props
}: RadioButtonProps) => {
  return (
    <RadioButtonWrapper size={outerSize}>
      <ActualButton
        type="radio"
        name={name}
        value={value}
        defaultChecked={checked}
        disabled={disabled}
        {...props}
      />
      {customFlag ? (
        customFlag
      ) : (
        <Flag viewBox="0 0 30 30" width={size} height={size}>
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
        </Flag>
      )}
    </RadioButtonWrapper>
  );
};

interface WrapperProps {
  size: CSSProperties['width'];
}

const RadioButtonWrapper = styled.label<WrapperProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ size }) => `width:${size}; height:${size};`}

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(1.1);
  }
`;

const Flag = styled.svg`
  & > circle:nth-of-type(2) {
    display: none;
  }

  input[type='radio']:checked + & > circle:nth-of-type(2) {
    display: inline;
  }

  input[type='radio']:disabled + & {
    filter: grayscale(100%);
  }
`;

const ActualButton = styled.input`
  display: none; ;
`;

export { RadioButton };
