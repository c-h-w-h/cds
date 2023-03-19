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
      {children}
    </TabsContext.Provider>
  );
};

interface TabListProps {
  children: ReactNode;
}

const List = ({ children }: TabListProps) => {
  return <Flexbox>{children}</Flexbox>;
};

interface TabTriggerProps {
  value: string;
  children: ReactNode;
}

const Trigger = ({ value, children }: TabTriggerProps) => {
  const context = useContext(TabsContext);

  if (context === null) return null;
  return (
    <button onClick={() => context.setSelectedIndex(value)}>{children}</button>
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
        display: ${context.selectedIndex === value ? 'block' : 'none'};
        color: red;
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
