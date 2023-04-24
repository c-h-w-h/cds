import Dropdown, { DropdownContext } from '@components/Dropdown';
import Typography from '@components/Typography';
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
  useEffect,
  useRef,
} from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import useSafeContext from 'src/hooks/useSafeContext';

import useSelect, { SelectedOption } from './useSelect';

type SelectProps = {
  id: string;
  setValue?: Dispatch<SetStateAction<string>>;
  children: ReactNode;
};

interface SelectContextInterface {
  optionRefs: MutableRefObject<Map<string, HTMLDivElement>>;
  triggerRef: RefObject<HTMLDivElement>;
  selectValue: (value: string) => void;
  registerOption: ($div: HTMLDivElement, value: string) => void;
  selectedOption: SelectedOption | null;
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
  const { isOpen, setIsOpen } = useSafeContext(DropdownContext);

  const { optionRefs, triggerRef, selectedOption } =
    useSafeContext(SelectContext);
  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === ARROW_DOWN) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const indexToFocus = selectedOption?.index ?? 0;
    [...optionRefs.current.values()][indexToFocus].focus();
  }, [isOpen]);

  const { color: themeColor } = useTheme();
  const { gray200, white, black } = themeColor;

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
      <div role="listbox" css={listStyle}>
        {children}
      </div>
    </Dropdown.Menu>
  );
};

type OptGroupProps = {
  label: string;
} & ChildrenProps;

const OptGroup = ({ label, children }: OptGroupProps) => {
  const optGroupStyle = css`
    & > p {
      padding: 12px 24px;
    }

    & > div {
      padding-left: calc(24px + 1rem);
    }
  `;

  return (
    <div
      css={optGroupStyle}
      role="group"
      aria-details={`${label} option group`}
    >
      <Typography
        color={
          '#555F6D' // TODO: theme color로 변경
        }
        bold
        aria-hidden={true}
      >
        {label}
      </Typography>
      {children}
    </div>
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

    const $div = optionRefs.current.get(value);
    if (!$div) return;

    if (key === ENTER) {
      onSelect();
      return;
    }

    const options = [...optionRefs.current.values()];
    switch (key) {
      case TAB:
        if (e.shiftKey) {
          e.preventDefault();
          getNextElement(options, options.indexOf($div), -1).focus();
          break;
        }
      // eslint-disable-next-line no-fallthrough
      case ARROW_DOWN:
        e.preventDefault();
        getNextElement(options, options.indexOf($div)).focus();
        return;

      case ARROW_UP:
        e.preventDefault();
        getNextElement(options, options.indexOf($div), -1).focus();
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
    <div
      ref={($div: HTMLDivElement | null) => $div && registerOption($div, value)}
      onClick={onSelect}
      tabIndex={0}
      onKeyDown={onKeyDown}
      css={optionStyle}
      role={'option'}
      aria-selected={selectedOption?.value === value}
    >
      {children}
    </div>
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
Trigger.displayName = 'Select.Trigger';
Select.OptionList = OptionList;
OptionList.displayName = 'Select.OptionList';
Select.OptGroup = OptGroup;
OptGroup.displayName = 'Select.OptGroup';
Select.Option = Option;
Option.displayName = 'Select.Option';

export default Select;
