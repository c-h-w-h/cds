import Dropdown, { DropdownContext } from '@components/Dropdown';
import { css, useTheme } from '@emotion/react';
import { ChildrenProps } from '@util-types/ChildrenProps';
import {
  Dispatch,
  KeyboardEventHandler,
  ReactNode,
  SetStateAction,
  createContext,
  forwardRef,
  useContext,
  useEffect,
} from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import useSelect from './useSelect';

type SelectProps = {
  id: string;
  setValue?: Dispatch<SetStateAction<string>>;
  children: ReactNode;
};

interface SelectContextInterface {
  selectValue: (value: string) => void;
  registerOption: (value: string) => void;
}
const SelectContext = createContext<SelectContextInterface | null>(null);

const Select = ({ id, setValue, children }: SelectProps) => {
  const { selectRef, selectValue, registerOption } = useSelect(id, setValue);

  return (
    <Dropdown label={`select-${id}`} collapseOnBlur={true}>
      <SelectContext.Provider value={{ selectValue, registerOption }}>
        {children}
      </SelectContext.Provider>
      <HiddenSelect id={id} ref={selectRef} />
    </Dropdown>
  );
};

const Trigger = ({ children }: ChildrenProps) => {
  const dropdownContext = useContext(DropdownContext);
  if (!dropdownContext) {
    return <></>;
  }
  const { isOpen } = dropdownContext;

  const { color } = useTheme();
  const { gray200, white, black } = color;

  const triggerStyle = css`
    display: flex;
    align-items: center;
    width: 100%;
    min-width: fit-content;
    height: 100%;
    padding: 12px 24px;
    background-color: ${white};
    border: 1.2px solid ${isOpen ? black : gray200};
  `;
  const chevronStyle = css`
    position: absolute;
    right: 24px;
  `;

  return (
    <Dropdown.Trigger>
      <div css={triggerStyle}>
        {children}
        {isOpen ? (
          <FiChevronUp size={20} css={chevronStyle} />
        ) : (
          <FiChevronDown size={20} css={chevronStyle} />
        )}
      </div>
    </Dropdown.Trigger>
  );
};

const OptionList = ({ children }: ChildrenProps) => {
  const { color } = useTheme();
  const { white, black } = color;

  const listStyle = css`
    width: 100%;
    height: 100%;
    background-color: ${white};
    border: 1.2px solid ${black};
    border-top: none;
  `;

  return (
    <Dropdown.Menu>
      <ul role="listbox" css={listStyle}>
        {children}
      </ul>
    </Dropdown.Menu>
  );
};

type OptionProps = {
  value: string;
} & ChildrenProps;

const Option = ({ value, children }: OptionProps) => {
  const context = useContext(SelectContext);
  if (!context) return <></>;

  const { selectValue, registerOption } = context;

  useEffect(() => {
    registerOption(value);
  }, []);

  const dropdownContext = useContext(DropdownContext);
  if (!dropdownContext) {
    return <></>;
  }
  const { setIsOpen } = dropdownContext;

  const onSelect = () => {
    selectValue(value);
    setIsOpen(false);
  };

  const onKeyDown: KeyboardEventHandler = (e) => {
    const { key } = e;

    const target = e.target;
    if (!(target instanceof HTMLLIElement)) return;

    // TODO: #67 머지 이후에 constants/key.ts 반영할게요
    if (key === 'Enter') {
      onSelect();
      return;
    }

    let $nextLi;
    const $ul = target.closest('ul');
    if (!$ul) return;

    if (['40', 'ArrowDown'].includes(key)) {
      e.preventDefault();
      $nextLi = target.nextElementSibling;

      if (!$nextLi) {
        $nextLi = $ul.firstElementChild;
      }
    }

    if (['38', 'ArrowUp'].includes(key)) {
      e.preventDefault();
      $nextLi = target.previousElementSibling;

      if (!$nextLi) {
        $nextLi = $ul.lastElementChild;
      }
    }

    if ($nextLi instanceof HTMLLIElement) $nextLi.focus();
  };

  const { color } = useTheme();
  const { gray200 } = color;
  const optionStyle = css`
    width: 100%;
    height: 100%;
    padding: 12px 24px;
    cursor: pointer;

    &:focus {
      outline: none;
      background-color: ${gray200};
    }
  `;

  return (
    <li onClick={onSelect} tabIndex={1} onKeyDown={onKeyDown} css={optionStyle}>
      {children}
    </li>
  );
};

const HiddenSelect = forwardRef<HTMLSelectElement, { id: string }>(
  ({ id }, ref) => {
    return <select id={id} name={id} ref={ref} css={hiddenStyle}></select>;
  },
);
const hiddenStyle = css`
  position: absolute;
  visibility: hidden;
  height: 0px;
  width: 0px;
`;
HiddenSelect.displayName = 'HiddenSelect';

Select.Trigger = Trigger;
Select.OptionList = OptionList;
Select.Option = Option;

export default Select;
