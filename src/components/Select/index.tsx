import Dropdown, { DropdownContext } from '@components/Dropdown';
import { ARROW_DOWN, ARROW_UP, ENTER } from '@constants/key';
import { css, useTheme } from '@emotion/react';
import { ChildrenProps } from '@util-types/ChildrenProps';
import {
  Dispatch,
  KeyboardEventHandler,
  ReactNode,
  SetStateAction,
  createContext,
  forwardRef,
  useEffect,
} from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import useSafeContext from 'src/hooks/useSafeContext';

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
  const { isOpen } = useSafeContext(DropdownContext);

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
    cursor: pointer;

    &:focus {
      outline: none;
      border: 1.5px solid ${black};
    }
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
  const { selectValue, registerOption } = useSafeContext(SelectContext);

  useEffect(() => {
    registerOption(value);
  }, []);

  const { setIsOpen } = useSafeContext(DropdownContext);

  const onSelect = () => {
    selectValue(value);
    setIsOpen(false);
  };

  const onKeyDown: KeyboardEventHandler = (e) => {
    const { key } = e;

    const target = e.target;
    if (!(target instanceof HTMLLIElement)) return;

    if (key === ENTER) {
      onSelect();
      return;
    }

    const $ul = target.closest('ul');
    if (!$ul) return;

    let $nextLi;
    switch (key) {
      case ARROW_DOWN:
        e.preventDefault();
        $nextLi = target.nextElementSibling;

        if (!$nextLi) {
          $nextLi = $ul.firstElementChild;
        }
        break;

      case ARROW_UP:
        e.preventDefault();
        $nextLi = target.previousElementSibling;

        if (!$nextLi) {
          $nextLi = $ul.lastElementChild;
        }
        break;
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
    <li onClick={onSelect} tabIndex={0} onKeyDown={onKeyDown} css={optionStyle}>
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
