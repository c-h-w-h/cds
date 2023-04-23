import Button from '@components/Button';
import { css } from '@emotion/react';
import { useRef, useState } from '@storybook/addons';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useEffect } from 'react';
import { MdSearch, MdCancel } from 'react-icons/md';

import Input from '.';

export default {
  title: 'Input',
  component: Input,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Input은 사용자의 입력을 받는 컴포넌트입니다. 비제어, 제어 두 방식 모두 지원합니다.',
  },
  argTypes: {
    placeholder: {
      name: 'placeholder',
      description: 'Input 내부 placeholder를 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '입력하세요' },
      },
    },
    id: {
      name: 'id',
      description: 'Input 컴포넌트 id attribute를 설정합니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      name: 'name',
      description: 'Input 컴포넌트 name attribute를 설정합니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      name: 'type',
      description: 'Input 컴포넌트 type attribute를 설정합니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      name: 'onChange',
      description: 'Input 컴포넌트 change 이벤트 Handler 입니다.',
    },

    onCancel: {
      name: 'onCancel',
      description: 'Input 컴포넌트 내에 취소버튼 click 이벤트 Handler 입니다.',
    },
    defaultValue: {
      name: 'defaultValue',
      description: '비제어 Input 컴포넌트 사용시 초기값을 설정합니다.',
      table: {
        type: { summary: 'string' },
      },
    },

    value: {
      name: 'value',
      description: '제어 Input 컴포넌트 사용시 초기값을 설정합니다.',
      table: {
        type: { summary: 'string' },
      },
    },

    isValid: {
      name: 'isValid',
      description:
        '제어 Input 컴포넌트 사용시 validation 여부를 체크하여 스타일에 반영합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },

    leadingIcon: {
      name: 'leadingIcon',
      description: 'Input 컴포넌트 앞에 오는 아이콘을 설정합니다.',
      table: {
        type: { summary: 'IconSource' },
      },
    },

    cancelIcon: {
      name: 'cancelIcon',
      description:
        'Input 컴포넌트 뒤에 오는 취소 아이콘을 설정합니다. 취소 기능 사용시 반드시 내려주어야 합니다.',
      table: {
        type: { summary: 'IconSource' },
      },
    },

    isControlled: {
      name: 'isControlled',
      description:
        'Input 컴포넌트의 제어 비제어 여부를 판단합니다. 제어 컴포넌트 사용시 반드시 내려주어야합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} as ComponentMeta<typeof Input>;

const ControlledTemplate: ComponentStory<typeof Input> = (args) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isValidate, setIsValidate] = useState<boolean>(true);

  useEffect(() => {
    if (inputValue.length < 5 && inputValue.length > 0) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
  }, [inputValue]);

  return (
    <>
      <Input
        {...args}
        onChange={({ target }) => setInputValue(target.value)}
        value={inputValue}
        isValid={isValidate}
      />
      {!isValidate && (
        <div style={{ color: 'red', fontSize: '10px' }}>
          5글자 이상 입력하세요.
        </div>
      )}
      <div>{inputValue}</div>
    </>
  );
};
export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  placeholder: '입력하세요',
  id: 'controlled',
};

export const ControlledWithLabel = ControlledTemplate.bind({});
ControlledWithLabel.args = {
  placeholder: '입력하세요',
  id: 'controlled',
  label: '아이디:',
};
ControlledWithLabel.parameters = {
  docs: {
    storyDescription: 'label을 설정해준 제어 Input 컴포넌트입니다.',
  },
};

const ControlledWithCancelTemplate: ComponentStory<typeof Input> = (args) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isValidate, setIsValidate] = useState<boolean>(true);

  useEffect(() => {
    if (inputValue.length < 5 && inputValue.length > 0) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
  }, [inputValue]);

  return (
    <>
      <Input
        {...args}
        onChange={({ target }) => setInputValue(target.value)}
        onCancel={() => setInputValue('')}
        value={inputValue}
        isValid={isValidate}
      />
      <Button onClick={() => setInputValue('')} text="제출"></Button>
      {!isValidate && (
        <div style={{ color: 'red', fontSize: '10px' }}>
          5글자 이상 입력하세요.
        </div>
      )}
      <div>{inputValue}</div>
    </>
  );
};

export const ControlledWithCancel = ControlledWithCancelTemplate.bind({});
ControlledWithCancel.args = {
  placeholder: '입력하세요',
  id: 'controlled',
  leadingIcon: MdSearch,
  cancelIcon: MdCancel,
};
ControlledWithCancel.parameters = {
  docs: {
    storyDescription: '취소 버튼을 설정한 제어 Input 컴포넌트입니다.',
  },
};

const UncontrolledTemplate: ComponentStory<typeof Input> = (args) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <>
      <div
        css={css`
          display: flex;
        `}
      >
        <Input {...args} ref={inputRef} />
        <Button
          onClick={() =>
            setInputValue(inputRef.current ? inputRef.current.value : '')
          }
          text="제출"
        ></Button>
      </div>
      <div>{inputValue}</div>
    </>
  );
};

export const Uncontrolled = UncontrolledTemplate.bind({});
Uncontrolled.args = {
  placeholder: '입력하세요',
  id: 'uncontrolled',
};
Uncontrolled.parameters = {
  docs: {
    storyDescription: '기본 비제어 Input 컴포넌트입니다.',
  },
};

export const UncontrolledWithDefaultValue = UncontrolledTemplate.bind({});
UncontrolledWithDefaultValue.args = {
  placeholder: '입력하세요',
  id: 'uncontrolled',
  defaultValue: '초기값',
};
UncontrolledWithDefaultValue.parameters = {
  docs: {
    storyDescription: '초기값을 설정해준 비제어 Input 컴포넌트입니다.',
  },
};

export const UncontrolledWithLeadingIcon = UncontrolledTemplate.bind({});
UncontrolledWithLeadingIcon.args = {
  placeholder: '입력하세요',
  id: 'uncontrolled',
  leadingIcon: MdSearch,
};
UncontrolledWithDefaultValue.parameters = {
  docs: {
    storyDescription: 'leadingIcon을 설정해준 비제어 Input 컴포넌트입니다.',
  },
};
