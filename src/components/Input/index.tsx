import Icon, { IconSource } from '@components/Icon';
import { useTheme, css } from '@emotion/react';
import {
  InputHTMLAttributes,
  RefObject,
  forwardRef,
  Ref,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import { MdCancel } from 'react-icons/md';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  forwardRef?: RefObject<HTMLInputElement>;
  setInputValue?: Dispatch<SetStateAction<string>>;
  isValid?: boolean;
  leadingIcon?: IconSource;
}

const Input = forwardRef(
  (
    {
      placeholder = '입력하세요',
      id,
      name,
      type = 'text',
      setInputValue,
      isValid = true,
      leadingIcon,
      ...props
    }: InputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const { color: themeColor } = useTheme();
    const { error, black, gray200, gray100, white } = themeColor;
    const inputContainerStyle = css`
      display: flex;
      align-items: center;
      width: fit-content;
      height: fit-content;
      pointer-events: none;
      border: 1px solid ${isValid ? black : error};
      border-radius: 50px;
      padding-left: 0.8%;
      font-size: 0.8rem;
    `;
    const inputStyle = css`
      flex: 1;
      pointer-events: all;
      border: 0px;
      border-radius: 50px;
      outline: none;
      padding: 5px 0.8%;
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
    const [localInput, setLocalInput] = useState<string>('');
    const isControlled = setInputValue && true;
    const onChangeHandler = (target: EventTarget & HTMLInputElement) => {
      setLocalInput(target.value);
    };

    useEffect(() => {
      if (setInputValue) {
        setInputValue(localInput);
      }
    }, [localInput]);

    return (
      <div css={inputContainerStyle} {...props}>
        {leadingIcon && <Icon source={leadingIcon} size={24} color={black} />}
        <input
          ref={ref}
          name={name ?? id}
          onChange={
            isControlled ? ({ target }) => onChangeHandler(target) : undefined
          }
          value={isControlled && localInput}
          {...{ type, id, placeholder }}
          css={inputStyle}
        />
        {isControlled ? (
          <button css={cancelButtonStyle} onClick={() => setLocalInput('')}>
            <Icon source={MdCancel} size={15} color={gray100} />
          </button>
        ) : (
          <div css={cancelButtonStyle} />
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
export default Input;
