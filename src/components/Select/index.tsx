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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?: Dispatch<SetStateAction<any>>;
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
    <li role="listitem" ref={refCallback} onClick={onSelect}>
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
  height: 0px;
  width: 0px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  whitespace: nowrap;
`;
HiddenSelect.displayName = 'HiddenSelect';

Select.Trigger = Dropdown.Trigger;
Select.Options = Options;
Select.Option = Option;

export default Select;
