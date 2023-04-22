import Icon, { IconSource } from '@components/Icon';
import { useTheme, css } from '@emotion/react';
import {
  InputHTMLAttributes,
  forwardRef,
  Ref,
  MouseEvent,
  useState,
  useEffect,
  ChangeEventHandler,
  MouseEventHandler,
  ChangeEvent,
} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onCancel?: MouseEventHandler;
  defaultValue?: string;
  value?: string;
  isValid?: boolean;
  leadingIcon?: IconSource;
  cancelIcon?: IconSource;
}

const Input = forwardRef(
  (
    {
      placeholder = '입력하세요',
      id,
      name,
      type = 'text',
      onChange,
      onCancel,
      defaultValue,
      value,
      isValid = true,
      leadingIcon,
      cancelIcon,
      ...props
    }: InputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const { color: themeColor } = useTheme();
    const { error, black, gray200, gray100, white, primary100 } = themeColor;
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
      &:focus-within {
        outline: none;
        border: 1px solid ${primary100};
      }
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

    const [localValue, setLocalValue] = useState(value || '');
    const isControlled = value !== undefined ? true : false;
    const [inputChangeEvent, setInputChangeEvent] =
      useState<ChangeEvent<HTMLInputElement> | null>(null);
    const onLocalChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputChangeEvent(e);
      setLocalValue(e.target.value);
    };

    const onLocalCancel = (e: MouseEvent<HTMLButtonElement>) => {
      setLocalValue('');
      onCancel && onCancel(e);
    };

    useEffect(() => {
      if (isControlled && onChange && inputChangeEvent) {
        onChange(inputChangeEvent);
      }
    }, [localValue]);
    return (
      <div css={inputContainerStyle} {...props}>
        {leadingIcon && <Icon source={leadingIcon} size={24} color={black} />}
        {isControlled ? (
          <input
            ref={ref}
            name={name ?? id}
            onChange={isControlled ? onLocalChange : undefined}
            value={localValue}
            {...{ type, id, placeholder, defaultValue }}
            css={inputStyle}
          />
        ) : (
          <input
            ref={ref}
            name={name ?? id}
            onChange={isControlled ? onLocalChange : undefined}
            {...{ type, id, placeholder, defaultValue }}
            css={inputStyle}
          />
        )}
        {cancelIcon ? (
          <button css={cancelButtonStyle} onClick={onLocalCancel}>
            <Icon source={cancelIcon} size={15} color={gray100} />
          </button>
        ) : (
          <div aria-hidden css={cancelButtonStyle} />
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
export default Input;
