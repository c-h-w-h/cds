import { useArgs } from '@storybook/client-api';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Modal, { Button } from '.';

export default {
  title: 'Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Modal>;

const SimpleTemplate: ComponentStory<typeof Modal> = (args) => {
  const [{ isOpen }, updateArgs] = useArgs();
  const toggleHandler = () => {
    updateArgs({ isOpen: !isOpen });
  };
  return (
    <>
      <Button onClick={toggleHandler}>Show Modal</Button>
      <Modal {...args} onClose={toggleHandler} />
    </>
  );
};

const WithFooterTemplate: ComponentStory<typeof Modal> = (args) => {
  const [{ isOpen }, updateArgs] = useArgs();
  const toggleHandler = () => {
    updateArgs({ isOpen: !isOpen });
  };
  const footerButtons = [
    {
      key: 'Confirm',
      handler: () => {
        return;
      },
    },
    { key: 'Cancel', handler: toggleHandler },
  ];
  return (
    <>
      <Button onClick={toggleHandler}>Show Modal</Button>
      <Modal {...args} onClose={toggleHandler} footer={footerButtons} />
    </>
  );
};

const dummyContent = () => {
  return (
    <div>
      <p>Content1</p>
      <p>Content2</p>
      <p>Content3</p>
    </div>
  );
};

export const OnlyContent = SimpleTemplate.bind({});
OnlyContent.args = {
  isOpen: false,
  children: dummyContent(),
};

export const WithTitle = SimpleTemplate.bind({});
WithTitle.args = {
  title: 'Title',
  isOpen: false,
  children: dummyContent(),
};

export const WithFooter = WithFooterTemplate.bind({});
WithFooter.args = {
  isOpen: false,
  children: dummyContent(),
};

export const WithTitleAndFooter = WithFooterTemplate.bind({});
WithTitleAndFooter.args = {
  title: 'Title',
  isOpen: false,
  children: dummyContent(),
};
