import Button from '@components/Button';
import { IconSource } from '@components/Icon';
import Container from '@components-layout/Container';
import Flexbox from '@components-layout/Flexbox';
import { css, useTheme } from '@emotion/react';
import { pixelToRem } from '@utils/pixelToRem';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type TabsVariant = 'underline' | 'rounded';

interface TabsContextInterface {
  isFitted: boolean;
  variant: TabsVariant;
  selectedIndex: string;
  setSelectedIndex: Dispatch<SetStateAction<string>>;
}

const TabsContext = createContext<TabsContextInterface | null>(null);

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  variant?: TabsVariant;
  isFitted?: boolean;
}

const Tabs = ({
  isFitted = false,
  variant = 'underline',
  defaultValue,
  children,
}: TabsProps) => {
  const [selectedIndex, setSelectedIndex] = useState<string>(defaultValue);

  const providerValue = { isFitted, variant, selectedIndex, setSelectedIndex };

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
  label: string;
  children: ReactNode;
}

const List = ({ label, children }: TabListProps) => {
  const context = useContext(TabsContext);
  const { color: themeColor } = useTheme();
  const { white, gray100 } = themeColor;

  if (context === null) return <></>;
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

          & > button {
            width: ${context.isFitted === true && '100%'};
            white-space: nowrap;
            background-color: ${white};
          }
        `}
      >
        {children}
      </Flexbox>
    </Container>
  );
};

interface TabTriggerProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  icon?: IconSource;
}

const Trigger = ({
  value,
  disabled = false,
  icon,
  children,
}: TabTriggerProps) => {
  const context = useContext(TabsContext);
  if (context === null) return <></>;

  const { color: themeColor } = useTheme();
  const { primary100, gray100, black, white } = themeColor;
  const isActive = context.selectedIndex === value;

  const underlineStyle = {
    borderColor: `${context.selectedIndex === value ? primary100 : gray100}`,
    borderRadius: 0,
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    marginBottom: '-2px',
  } as const;

  const roundedStyle = {
    border: `${context.selectedIndex === value && `2px ${gray100} solid`}`,
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

  return (
    <Button
      id={`cds-tabs-trigger-${value}`}
      role={'tab'}
      aria-selected={isActive}
      aria-controls={`cds-tabs-panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      text={children?.toString()}
      disabled={disabled}
      icon={icon}
      iconSize={pixelToRem('16px')}
      onClick={() => !disabled && context.setSelectedIndex(value)}
      css={css`
        ${triggerStyles[context.variant]}

        & > p {
          color: ${isActive ? primary100 : black};
        }

        & > svg {
          fill: ${isActive ? primary100 : black};
        }

        &:hover {
          background-color: ${primary100};
          border-bottom-color: ${primary100};
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
    />
  );
};

interface TabPanelProps {
  value: string;
  children: ReactNode;
}

const Panel = ({ value, children }: TabPanelProps) => {
  const context = useContext(TabsContext);

  if (context === null) return <></>;

  return (
    <Container
      id={`cds-tabs-panel-${value}`}
      role={'tabpanel'}
      aria-labelledby={`cds-tabs-trigger-${value}`}
      tabIndex={0}
      css={css`
        padding: 1rem;
        display: ${context.selectedIndex === value ? 'block' : 'none'};
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
