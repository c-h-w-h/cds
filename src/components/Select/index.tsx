import Dropdown, { DropdownContext } from '@components/Dropdown';
import { ARROW_DOWN, ARROW_UP, ENTER, ESC, TAB } from '@constants/key';
import { css, useTheme } from '@emotion/react';
import { ChildrenProps } from '@util-types/ChildrenProps';
import { getNextElement } from '@utils/getNextElement';
import {
  Dispatch,
  KeyboardEventHandler,
  MutableRefObject,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  forwardRef,
  useRef,
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
  optionRefs: MutableRefObject<Map<string, HTMLLIElement>>;
  triggerRef: RefObject<HTMLDivElement>;
  selectValue: (value: string) => void;
  registerOption: ($li: HTMLLIElement, value: string) => void;
  selectedOption: string | null;
}
const SelectContext = createContext<SelectContextInterface | null>(null);

const Select = ({ id, setValue, children }: SelectProps) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const { selectRef, optionRefs, selectValue, registerOption, selectedOption } =
    useSelect(id, setValue);

  const providerValue = {
    optionRefs,
    triggerRef,
    selectValue,
    registerOption,
    selectedOption,
  };

  return (
    <Dropdown label={`select-${id}`} collapseOnBlur={true}>
      <SelectContext.Provider value={providerValue}>
        {children}
      </SelectContext.Provider>
      <HiddenSelect id={id} ref={selectRef} />
    </Dropdown>
  );
};

const Trigger = ({ children }: ChildrenProps) => {
  const { isOpen } = useSafeContext(DropdownContext);

  const { optionRefs, triggerRef } = useSafeContext(SelectContext);
  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === ARROW_DOWN) {
      [...optionRefs.current.values()][0].focus();
    }
  };

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
      <div ref={triggerRef} css={triggerStyle} onKeyDown={onKeyDown}>
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
  const {
    optionRefs,
    triggerRef,
    selectValue,
    registerOption,
    selectedOption,
  } = useSafeContext(SelectContext);

  const { setIsOpen } = useSafeContext(DropdownContext);

  const closeOptionList = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const onSelect = () => {
    selectValue(value);
    closeOptionList();
  };

  const onKeyDown: KeyboardEventHandler = (e) => {
    const { key } = e;

    const $li = optionRefs.current.get(value);
    if (!$li) return;

    if (key === ENTER) {
      onSelect();
      return;
    }

    const options = [...optionRefs.current.values()];
    switch (key) {
      case TAB:
      case ARROW_DOWN:
        e.preventDefault();
        getNextElement(options, options.indexOf($li)).focus();
        return;

      case ARROW_UP:
        e.preventDefault();
        getNextElement(options, options.indexOf($li), -1).focus();
        return;

      case ESC:
        closeOptionList();
        return;
    }
  };

  const { color } = useTheme();
  const { white, gray200 } = color;
  const optionStyle = css`
    width: 100%;
    height: 100%;
    padding: 12px 24px;
    cursor: pointer;

    &:focus {
      outline: none;
      color: ${white};
      background-color: ${gray200};
    }
  `;

  return (
    <li
      ref={($li: HTMLLIElement | null) => $li && registerOption($li, value)}
      onClick={onSelect}
      tabIndex={0}
      onKeyDown={onKeyDown}
      css={optionStyle}
      role={'option'}
      aria-selected={selectedOption === value}
    >
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
