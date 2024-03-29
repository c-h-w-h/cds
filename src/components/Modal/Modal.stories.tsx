import Button from '@components/Button';
import Container from '@components-layout/Container';
import Flexbox from '@components-layout/Flexbox';
import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MouseEventHandler, useState } from 'react';

import Modal from '.';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Modal은 사용자의 주의를 끌거나 추가적인 정보를 제공하는 경우 특정 컨텐츠가 담긴 요소를 화면 위에 표시합니다.',
    docs: {
      description: {
        component: `- 다음과 같은 컴포넌트를 children으로 사용할 수 있습니다.  
          - \\<Modal.Header\\> : \\<Modal\\> Header로 올 내용을 넣어줄 때 사용합니다.
          - \\<Modal.Content\\> : \\<Modal\\> Content로 올 내용을 넣어줄 때 사용합니다.
          `,
      },
    },
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
  decorators: [
    (Story) => (
      <Container>
        <Flexbox
          justifyContent={'center'}
          alignItems={'center'}
          css={css`
            height: 300px;
          `}
        >
          <Story />
        </Flexbox>
      </Container>
    ),
  ],
} as ComponentMeta<typeof Modal>;

const DummyModalContent = ({
  toggleHandler,
}: {
  toggleHandler: MouseEventHandler;
}) => {
  return (
    <>
      <p>Content1</p>
      <p>Content2</p>
      <p>Content3</p>
      <Flexbox
        justifyContent="space-evenly"
        css={css`
          height: 50px;
        `}
      >
        <Button
          css={css`
            height: 30px;
          `}
          onClick={toggleHandler}
        >
          확인
        </Button>
        <Button
          css={css`
            height: 30px;
          `}
          onClick={toggleHandler}
        >
          취소
        </Button>
      </Flexbox>
    </>
  );
};

export const Default: ComponentStory<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={toggleHandler}>Show Modal</Button>
      <Modal {...{ isOpen }} onClose={toggleHandler}>
        <Modal.Content>
          <DummyModalContent {...{ toggleHandler }} />
        </Modal.Content>
      </Modal>
    </>
  );
};

export const WithHeader: ComponentStory<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={toggleHandler}>Show Modal</Button>
      <Modal {...{ isOpen }} onClose={toggleHandler}>
        <Modal.Header title="헤더" />
        <Modal.Content>
          <DummyModalContent {...{ toggleHandler }} />
        </Modal.Content>
      </Modal>
    </>
  );
};

WithHeader.parameters = {
  docs: {
    storyDescription:
      'Header를 포함한 Modal 입니다. Title을 지정해줄 수 있습니다.',
  },
};
