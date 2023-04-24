import Typography from '@components/Typography';
import Container from '@components-layout/Container';
import Flexbox from '@components-layout/Flexbox';
import { ARROW_LEFT, ARROW_RIGHT } from '@constants/key';
import { css, useTheme } from '@emotion/react';
import {
  createContext,
  Dispatch,
  KeyboardEvent,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import useSafeContext from 'src/hooks/useSafeContext';

import useTriggerStyle from './useTriggerStyle';

export type TabsVariant = 'underline' | 'rounded';

interface TabsContextInterface {
  label: string;
  variant: TabsVariant;
  isFitted: boolean;
  selectedIndex: string;
  setSelectedIndex: Dispatch<SetStateAction<string>>;
}

const TabsContext = createContext<TabsContextInterface | null>(null);

interface TabsProps {
  label: string;
  defaultValue: string;
  children: ReactNode;
  variant?: TabsVariant;
  isFitted?: boolean;
}

const Tabs = ({
  label,
  defaultValue,
  children,
  variant = 'underline',
  isFitted = false,
}: TabsProps) => {
  const [selectedIndex, setSelectedIndex] = useState<string>(defaultValue);

  const providerValue = {
    isFitted,
    variant,
    label,
    selectedIndex,
    setSelectedIndex,
  };

  return (
    <TabsContext.Provider value={providerValue}>
      <Container
        css={css`
          padding: 1rem;
        `}
      >
        {children}
      </Container>
    </TabsContext.Provider>
  );
};

interface TabListProps {
  children: ReactNode;
}

const List = ({ children }: TabListProps) => {
  const { label } = useSafeContext(TabsContext);
  const { color: themeColor } = useTheme();
  const { gray100 } = themeColor;

  return (
    <Container
      role={'tablist'}
      aria-label={label}
      aria-orientation={'horizontal'}
      overflowX="auto"
      css={css`
        -ms-overflow-style: none;

        ::-webkit-scrollbar {
          display: none;
        }
      `}
    >
      <Flexbox
        justifyContent={'flex-start'}
        css={css`
          gap: 0;
          width: 100%;
          border-bottom: 2px solid ${gray100};
        `}
      >
        {children}
      </Flexbox>
    </Container>
  );
};

interface TabTriggerProps {
  value: string;
  text?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

const Trigger = ({ value, text, icon, disabled = false }: TabTriggerProps) => {
  const { label, variant, isFitted, selectedIndex, setSelectedIndex } =
    useSafeContext(TabsContext);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const isActive = selectedIndex === value;
  const triggerStyle = useTriggerStyle(variant, isFitted, isActive);

  const onSelect = () => {
    if (disabled || !triggerRef.current) return;
    setSelectedIndex(value);
    triggerRef.current.scrollIntoView(SCROLL_OPTIONS);
  };

  const onPressArrow = (e: KeyboardEvent) => {
    e.preventDefault();
    const currentTrigger = e.target;

    if (!(currentTrigger instanceof HTMLElement)) return;

    const futureTrigger = findFutureTrigger(e.key, currentTrigger);

    if (!futureTrigger) return;

    const futureValue = futureTrigger.dataset['triggerValue'];

    if (futureValue === undefined) return;

    futureTrigger.focus();
    futureTrigger.scrollIntoView(SCROLL_OPTIONS);
    setSelectedIndex(futureValue);
  };

  return (
    <button
      ref={triggerRef}
      id={`${label}-trigger-${value}`}
      role={'tab'}
      aria-selected={isActive}
      aria-controls={`${label}-panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onSelect}
      onKeyDown={onPressArrow}
      data-trigger-value={value}
      css={triggerStyle}
    >
      {icon}
      {text && (
        <Typography
          variant="body"
          css={css`
            margin-left: ${icon ? '4px' : 0};
          `}
        >
          {text}
        </Typography>
      )}
    </button>
  );
};

interface TabPanelProps {
  value: string;
  children: ReactNode;
}

const Panel = ({ value, children }: TabPanelProps) => {
  const { label, selectedIndex } = useSafeContext(TabsContext);

  return (
    <Container
      id={`${label}-panel-${value}`}
      role={'tabpanel'}
      aria-labelledby={`${label}-trigger-${value}`}
      tabIndex={0}
      css={css`
        padding: 1rem;
        display: ${selectedIndex === value ? 'block' : 'none'};
      `}
    >
      {children}
    </Container>
  );
};

Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Panel = Panel;

List.displayName = 'Tabs.List';
Trigger.displayName = 'Tabs.Trigger';
Panel.displayName = 'Tabs.Panel';

export default Tabs;

const SCROLL_OPTIONS = {
  behavior: 'smooth',
  block: 'nearest',
  inline: 'start',
} as const;

const findFutureTrigger = (key: string, currentTrigger: HTMLElement) => {
  const siblingProp = ((key) => {
    if (ARROW_LEFT.includes(key)) return 'previousElementSibling';
    if (ARROW_RIGHT.includes(key)) return 'nextElementSibling';
    return null;
  })(key);

  if (siblingProp === null) return;

  let futureTrigger = currentTrigger[siblingProp] as HTMLElement;

  while (futureTrigger && futureTrigger.hasAttribute('disabled')) {
    futureTrigger = futureTrigger[siblingProp] as HTMLElement;
  }

  if (futureTrigger) return futureTrigger;

  const triggerParent = currentTrigger.parentElement;

  if (triggerParent === null) return;

  futureTrigger =
    siblingProp === 'nextElementSibling'
      ? (triggerParent.firstElementChild as HTMLElement)
      : (triggerParent.lastElementChild as HTMLElement);

  while (futureTrigger.hasAttribute('disabled')) {
    futureTrigger = futureTrigger[siblingProp] as HTMLElement;
  }

  return futureTrigger;
};
