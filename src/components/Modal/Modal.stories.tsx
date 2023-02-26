import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import Modal from '.';

export default {
  title: 'Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Modal>;

const SimpleTemplate: ComponentStory<typeof Modal> = (args) => {
  const [open, setOpen] = useState<boolean>(true);
  const closeHandler = () => {
    action('onClose');
    setOpen(false);
  };
  return <Modal {...args} isOpen={open} onClose={closeHandler} />;
};

const WithButtonsTemplate: ComponentStory<typeof Modal> = (args) => {
  const [open, setOpen] = useState<boolean>(false);
  const closeHandler = () => {
    action('onClose');
    setOpen(false);
  };
  const footerButtons = [
    {
      key: 'Confirm',
      handler: () => {
        return;
      },
    },
    { key: 'Cancel', handler: closeHandler },
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
        <button onClick={() => setOpen(true)}>Show Modal</button>
      </div>
      <Modal
        {...args}
        isOpen={open}
        onClose={closeHandler}
        footer={footerButtons}
      />
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
};
