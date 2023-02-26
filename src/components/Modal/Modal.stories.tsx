import { useArgs } from '@storybook/client-api';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Modal from '.';

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
  return <Modal {...args} onClose={toggleHandler} />;
};

const WithButtonsTemplate: ComponentStory<typeof Modal> = (args) => {
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
      <div>
        <div>본문 내용</div>
        <div>본문 내용</div>
        <div>본문 내용</div>
        <div>본문 내용</div>
        <div>본문 내용</div>
        <div>본문 내용</div>
        <button onClick={toggleHandler}>Show Modal</button>
      </div>
      <Modal {...args} onClose={toggleHandler} footer={footerButtons} />
    </>
  );
};

export const Simple = SimpleTemplate.bind({});
Simple.args = {
  title: 'Title',
  children: (
    <div>
      <p>Content1</p>
      <p>Content2</p>
      <p>Content3</p>
    </div>
  ),
};

export const Alert = WithButtonsTemplate.bind({});
Alert.args = {
  title: 'Title',
  children: <p>Content</p>,
  isOpen: false,
};
