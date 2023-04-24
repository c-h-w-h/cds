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
  ReactNode,
} from 'react';
import { MdCancel } from 'react-icons/md';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onCancel?: MouseEventHandler;
  defaultValue?: string;
  value?: string;
  isValid?: boolean;
  leadingIcon?: ReactNode;
  isClearable?: boolean;
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
      isClearable,
      ...props
    }: InputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const { color: themeColor } = useTheme();
    const { error, black, gray200, gray100, white, primary } = themeColor;
    const inputContainerStyle = css`
      display: flex;
      align-items: center;
      width: fit-content;
      height: fit-content;
      pointer-events: none;
      padding: 0 5px;
      border: 1px solid ${isValid ? black : error};
      border-radius: 50px;
      font-size: 1rem;
      &:focus-within {
        outline: none;
        border: 1px solid ${primary};
      }
    `;
    const inputStyle = css`
      flex: 1;
      pointer-events: all;
      border: 0px;
      border-radius: 50px;
      outline: none;
      padding: 0.75rem;
      font-size: 1em;
      &::placeholder {
        color: ${gray200};
        font-size: 1em;
      }
    `;
    const cancelButtonStyle = css`
      border: 0;
      width: max-content;
      display: flex;
      background-color: ${white};
      padding: 0;
      margin: auto;
      margin-right: 5px;
      border-radius: 50px;
      pointer-events: all;
      font-size: 1em;
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
    const isControlled = value !== undefined;
    const onLocalChange = (e: ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
      if (isControlled && onChange) {
        onChange(e);
      }
    };

    const onLocalCancel = (e: MouseEvent<HTMLButtonElement>) => {
      setLocalValue('');
      onCancel && onCancel(e);
    };

    useEffect(() => {
      if (value !== undefined) {
        setLocalValue(value);
      }
    }, [value]);
    return (
      <div css={inputContainerStyle} {...props}>
        {leadingIcon}
        <input
          ref={ref}
          name={name ?? id}
          onChange={isControlled ? onLocalChange : undefined}
          value={isControlled ? localValue : undefined}
          {...{ type, id, placeholder, defaultValue }}
          css={inputStyle}
        />
        {isClearable && (
          <button
            aria-label="cancel"
            css={cancelButtonStyle}
            onClick={onLocalCancel}
          >
            <MdCancel color={gray100} />
          </button>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
export default Input;
