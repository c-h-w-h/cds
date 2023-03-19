import Button from '@components/Button';
import { IconSource } from '@components/Icon';
import Container from '@components-layout/Container';
import Flexbox from '@components-layout/Flexbox';
import { css, useTheme } from '@emotion/react';
import { pixelToRem } from '@utils/pixelToRem';
import { createContext, ReactNode, useContext, useState } from 'react';

type TabsVariant = 'underline' | 'rounded';

const TabsContext =
  createContext<{
    isFitted: boolean;
    variant: TabsVariant;
    selectedIndex: string;
    setSelectedIndex: React.Dispatch<React.SetStateAction<string>>;
  } | null>(null);

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
  children: ReactNode;
}

const List = ({ children }: TabListProps) => {
  const context = useContext(TabsContext);
  const { color: themeColor } = useTheme();
  const { white, gray100 } = themeColor;

  if (context === null) return null;
  return (
    <Container overflowX="auto">
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
  if (context === null) return null;

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

          &: hover {
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

  if (context === null) return null;

  return (
    <Container
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
