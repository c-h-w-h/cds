import Icon, { IconSource } from '@components/Icon';
import { useTheme, css } from '@emotion/react';
import { DefaultProps } from '@utils/types/DefaultProps';
import {
  ChangeEventHandler,
  RefObject,
  HTMLInputTypeAttribute,
  MouseEventHandler,
} from 'react';
import { MdCancel } from 'react-icons/md';

interface InputProps extends DefaultProps<HTMLInputElement> {
  placeholder?: string;
  id: string;
  name?: string;
  type: HTMLInputTypeAttribute;
  value?: string;
  forwordRef?: RefObject<HTMLInputElement>;
  onInputChange?: ChangeEventHandler<HTMLInputElement>;
  onCancelClick?: MouseEventHandler<HTMLButtonElement>;
  isValid?: boolean;
  leadingIcon?: IconSource;
  cancel?: boolean;
  leadingIconSize?: number;
  cancelIconSize: number;
}

const Input = ({
  placeholder = '입력하세요',
  id,
  name,
  type = 'text',
  value,
  forwordRef,
  onInputChange,
  onCancelClick,
  isValid = true,
  leadingIcon,
  cancel,
  leadingIconSize,
  cancelIconSize,
  ...props
}: InputProps) => {
  const { color: themeColor } = useTheme();
  const { error, black, gray200, gray100, white } = themeColor;
  const inputContainerStyle = css`
    display: flex;
    align-items: center;
    width: 200px;
    height: 30px;
    pointer-events: none;
    border: 1px solid ${isValid ? black : error};
    border-radius: 50px;
    padding-left: 0.8%;
    font-size: 0.9rem;
  `;
  const inputStyle = css`
    flex: 1;
    pointer-events: all;
    height: 100%;
    border: 0px;
    border-radius: 50px;
    outline: none;
    padding-left: 0.8%;
    font-size: 1em;
    &::placeholder {
      color: ${gray200};
      font-size: 1em;
    }
  `;
  const cancelButtonStyle = css`
    border: 0;
    width: max-content;
    height: 15px;
    background-color: ${white};
    padding: 0;
    margin: auto;
    margin-right: 5px;
    border-radius: 50px;
    pointer-events: all;
    @media (hover: hover) {
      &:enabled:hover {
        filter: brightness(0.9);
        cursor: pointer;
      }
    }
    &:enabled:active {
      filter: brightness(0.7);
    }
  `;
  return (
    <div css={inputContainerStyle} {...props}>
      {leadingIcon && (
        <Icon
          source={leadingIcon}
          size={leadingIconSize ? leadingIconSize : 24}
          color={black}
        />
      )}
      {typeof value === 'string' ? (
        <input
          ref={forwordRef}
          name={name ? name : id}
          onChange={onInputChange}
          {...{ type, id, placeholder, value }}
          css={inputStyle}
        />
      ) : (
        <input
          ref={forwordRef}
          name={name ? name : id}
          onChange={onInputChange}
          {...{ type, id, placeholder }}
          css={inputStyle}
        />
      )}
      {cancel && (
        <button css={cancelButtonStyle} onClick={onCancelClick}>
          <Icon
            source={MdCancel}
            size={cancelIconSize ? cancelIconSize : 15}
            color={gray100}
          />
        </button>
      )}
    </div>
  );
};

export default Input;
