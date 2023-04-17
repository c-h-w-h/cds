import Button from '@components/Button';
import Flexbox from '@components-layout/Flexbox';
import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import Modal from '.';

export default {
  title: 'Design System/Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Modal은 특정 컨텐츠가 담긴 화면을 다른 화면 위로 띄워줍니다.',
  },
  argTypes: {
    isOpen: {
      name: 'isOpen',
      description: 'Modal을 띄울지 여부를 나타내는 상태입니다.',
      table: {
        type: { summary: 'boolean', required: true },
      },
    },
    onClose: {
      name: 'onClose',
      description: 'Modal을 닫는 setState 함수입니다.',
      control: false,
    },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={toggleHandler} text="Show Modal" />
      <Modal {...{ isOpen }} onClose={toggleHandler}>
        <Modal.TobBar title="헤더" />
        <div>
          <p>Content1</p>
          <p>Content2</p>
          <p>Content3</p>
        </div>
        <Flexbox
          justifyContent="space-evenly"
          css={css`
            height: 100px;
          `}
        >
          <Button text="확인" onClick={toggleHandler} />
          <Button text="취소" onClick={toggleHandler} />
        </Flexbox>
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
