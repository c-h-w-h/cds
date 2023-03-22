import Dropdown, { DropdownContext } from '@components/Dropdown';
import { css } from '@emotion/react';
import { DefaultPropsWithChildren } from '@util-types/DefaultPropsWithChildren';
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
  registerOption: ($el: HTMLLIElement, value: string) => void;
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

const Options = ({ children }: DefaultPropsWithChildren<HTMLLIElement>) => {
  return (
    <Dropdown.Menu>
      <ul role="listbox">{children}</ul>
    </Dropdown.Menu>
  );
};

type OptionProps = {
  value: string;
} & DefaultPropsWithChildren<HTMLLIElement>;

const Option = ({ value, children }: OptionProps) => {
  const context = useContext(SelectContext);
  if (!context) return <></>;

  const { selectValue, registerOption } = context;

  const refCallback = ($el: HTMLLIElement | null) => {
    if (!$el) return;
    registerOption($el, value);
  };

  const dropdownContext = useContext(DropdownContext);
  if (!dropdownContext) {
    throw new Error('Select component must have its own Dropdown context');
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
        &:hover {
          cursor: pointer;
        }
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
