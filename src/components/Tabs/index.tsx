import Icon, { IconSource } from '@components/Icon';
import Typography from '@components/Typography';
import Container from '@components-layout/Container';
import Flexbox from '@components-layout/Flexbox';
import { ARROW_LEFT, ARROW_RIGHT } from '@constants/key';
import { css, useTheme } from '@emotion/react';
import { pixelToRem } from '@utils/pixelToRem';
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

type TabsVariant = 'underline' | 'rounded';

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
  icon?: IconSource;
  disabled?: boolean;
}

const findFutureTrigger = (key: string, currentTrigger: HTMLElement) => {
  const siblingProp = (function (key) {
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

const Trigger = ({ value, text, icon, disabled = false }: TabTriggerProps) => {
  const { label, variant, isFitted, selectedIndex, setSelectedIndex } =
    useSafeContext(TabsContext);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { color: themeColor } = useTheme();
  const { primary100, gray100, black, white } = themeColor;
  const isActive = selectedIndex === value;

  const underlineStyle = {
    borderColor: `${selectedIndex === value ? primary100 : gray100}`,
    borderRadius: 0,
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    marginBottom: '-2px',
  } as const;

  const roundedStyle = {
    border: `${selectedIndex === value && `2px ${gray100} solid`}`,
    borderRadius: '10px',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: `${white}`,
    marginBottom: '-2px',
  } as const;

  const triggerStyles = {
    underline: underlineStyle,
    rounded: roundedStyle,
  };

  const scrollOptions = {
    behavior: 'smooth',
    block: 'nearest',
    inline: 'start',
  } as const;

  const onSelect = () => {
    if (disabled || !triggerRef.current) return;
    setSelectedIndex(value);
    triggerRef.current.scrollIntoView(scrollOptions);
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
    futureTrigger.scrollIntoView(scrollOptions);
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
      css={css`
        display: flex;
        justify-content: center;
        padding: 0.75rem;
        text-decoration: none;
        white-space: nowrap;
        width: ${isFitted === true && '100%'};
        background-color: ${white};
        scroll-margin: ${pixelToRem('24px')};
        ${triggerStyles[variant]}

        & > p {
          color: ${isActive ? primary100 : black};
        }

        & > svg {
          fill: ${isActive ? primary100 : black};
        }

        &:hover {
          cursor: pointer;
          background-color: ${isActive ? white : primary100};
          border-bottom-color: ${primary100};

          & > * {
            color: ${isActive ? primary100 : white};
          }

          & > svg {
            fill: ${isActive ? primary100 : white};
          }
        }

        &:disabled {
          background-color: ${white};
          cursor: not-allowed;

          & > p {
            color: ${gray100};
          }

          & > svg {
            fill: ${gray100};
          }

          &:hover {
            border-bottom-color: ${gray100};
          }
        }
      `}
    >
      {icon && (
        <Icon
          source={icon}
          size={pixelToRem('16px')}
          color={isActive ? primary100 : black}
        />
      )}
      {text && <Typography variant="body">{text}</Typography>}
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

export default Tabs;
