import Button from '@components/Button';
import Container from '@components-layout/Container';
import Flexbox from '@components-layout/Flexbox';
import { css, useTheme } from '@emotion/react';
import { createContext, ReactNode, useContext, useState } from 'react';

type TabListVariant = 'underline' | 'rounded';

const TabsContext =
  createContext<{
    isFitted: boolean;
    variant: TabListVariant;
    selectedIndex: string;
    setSelectedIndex: React.Dispatch<React.SetStateAction<string>>;
  } | null>(null);

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  variant?: TabListVariant;
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
}

const Trigger = ({ value, disabled = false, children }: TabTriggerProps) => {
  const context = useContext(TabsContext);
  if (context === null) return null;

  const { color: themeColor } = useTheme();
  const { primary100, gray100, black, white } = themeColor;

  const underlineStyle = {
    'border-color': `${context.selectedIndex === value ? primary100 : gray100}`,
    'border-radius': 0,
    'border-bottom-width': '2px',
    'border-bottom-style': 'solid',
    'margin-bottom': '-2px',
  } as const;

  const roundedStyle = {
    border: `${context.selectedIndex === value && `2px ${gray100} solid`}`,
    'border-radius': '10px',
    'border-bottom-left-radius': 0,
    'border-bottom-right-radius': 0,
    'border-bottom-color': `${white}`,
    'margin-bottom': '-2px',
  } as const;

  const triggerStyles = {
    underline: underlineStyle,
    rounded: roundedStyle,
  };

  return (
    <Button
      text={children?.toString()}
      disabled={disabled}
      onClick={() => context.setSelectedIndex(value)}
      css={css`
        ${triggerStyles[context.variant]}

        & > p {
          color: ${context.selectedIndex === value ? primary100 : black};
        }

        &:hover {
          background-color: ${primary100};
          border-bottom-color: ${primary100};
        }
      `}
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
