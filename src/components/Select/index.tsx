import Dropdown, { DropdownContext } from '@components/Dropdown';
import { css } from '@emotion/react';
import { ChildrenProps } from '@util-types/ChildrenProps';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  forwardRef,
  useContext,
} from 'react';

import useSelect from './useSelect';

type SelectProps = {
  id: string;
  setValue?: Dispatch<SetStateAction<string>>;
  children: ReactNode;
};

interface SelectContextInterface {
  selectValue: (value: string) => void;
  registerOption: ($li: HTMLLIElement, value: string) => void;
}
const SelectContext = createContext<SelectContextInterface | null>(null);

const Select = ({ id, setValue, children }: SelectProps) => {
  const { selectRef, selectValue, registerOption } = useSelect(id, setValue);

  return (
    <Dropdown collapseOnBlur={true}>
      <SelectContext.Provider value={{ selectValue, registerOption }}>
        {children}
      </SelectContext.Provider>
      <HiddenSelect id={id} ref={selectRef} />
    </Dropdown>
  );
};

const Options = ({ children }: ChildrenProps) => {
  return (
    <Dropdown.Menu>
      <ul role="listbox">{children}</ul>
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

  const refCallback = ($li: HTMLLIElement | null) => {
    if (!$li) return;
    registerOption($li, value);
  };

  const dropdownContext = useContext(DropdownContext);
  if (!dropdownContext) {
    return <></>;
  }
  const { setIsOpen } = dropdownContext;

  const onSelect = () => {
    selectValue(value);
    setIsOpen(false);
  };

  return (
    <li
      role="listitem"
      ref={refCallback}
      onClick={onSelect}
      css={css`
        cursor: pointer;
      `}
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

Select.Trigger = Dropdown.Trigger;
Select.Options = Options;
Select.Option = Option;

export default Select;
