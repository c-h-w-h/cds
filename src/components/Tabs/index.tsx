import Button from '@components/Button';
import Container from '@components-layout/Container';
import Flexbox from '@components-layout/Flexbox';
import { css } from '@emotion/react';
import { createContext, ReactNode, useContext, useState } from 'react';

const TabsContext =
  createContext<{
    selectedIndex: string;
    setSelectedIndex: React.Dispatch<React.SetStateAction<string>>;
  } | null>(null);

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
}

const Tabs = ({ defaultValue, children }: TabsProps) => {
  const [selectedIndex, setSelectedIndex] = useState<string>(defaultValue);

  return (
    <TabsContext.Provider value={{ selectedIndex, setSelectedIndex }}>
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
  isFitted?: boolean;
}

const List = ({ isFitted = false, children }: TabListProps) => {
  return (
    <Container overflowX="auto">
      <Flexbox
        justifyContent={'flex-start'}
        css={css`
          width: ${isFitted === false && 'max-content'};

          & > button {
            width: ${isFitted === true && '100%'};
            white-space: nowrap;
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
}

const Trigger = ({ value, disabled = false, children }: TabTriggerProps) => {
  const context = useContext(TabsContext);

  if (context === null) return null;
  return (
    <Button
      text={children?.toString()}
      disabled={disabled}
      onClick={() => context.setSelectedIndex(value)}
    />
  );
};

interface TabContentProps {
  value: string;
  children: ReactNode;
}

const Content = ({ value, children }: TabContentProps) => {
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
Tabs.Content = Content;

export default Tabs;
