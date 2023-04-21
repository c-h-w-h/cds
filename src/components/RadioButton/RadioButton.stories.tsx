import { theme } from '@components/@common/CdsProvider/theme';
import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { RadioButton } from '.';

export default {
  title: 'Design System/Components/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: `RadioButton은 여러 가지 옵션 중 하나를 선택하는 <input type='radio'/>과 같은 동작을 합니다.`,
    docs: {
      description: {
        component: `- 같은 name 속성 값을 갖는 RadioButton 중 하나만이 선택될 수 있습니다.  
        - value, checked, disabled 등의 일반적인 속성을 지정할 수 있습니다.
        - size로 버튼의 크기를 지정하고, 이보다 넓은 클릭 영역을 갖게 하려는 경우 outerSize 값을 지정할 수 있습니다.
        - color 값으로 기본 RadioButton의 색을 지정할 수 있습니다.
        - ref로 useRef를 위한 RefObject를 넘겨줄 수 있습니다. 이 경우 ref는 input 태그에 전달됩니다.
        `,
      },
    },
  },
  args: {
    size: '16px',
    disabled: false,
    color: theme.color.primary100,
    outerSize: '30px',
    direction: 'right',
  },
  argTypes: {
    size: {
      name: 'size',
      description: '버튼의 크기를 지정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '16px' },
      },
    },
    outerSize: {
      name: 'outerSize',
      description: '버튼의 클릭 영역 크기를 지정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'size의 값을 따름' },
      },
    },
    color: {
      name: 'color',
      description: '기본 버튼의 색상을 지정합니다.',
      control: {
        type: 'color',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'theme.primary100' },
      },
    },
    ref: {
      name: 'ref',
      description: '`useRef`를 사용하기 위한 RefObject를 지정합니다.',
      table: {
        type: { summary: 'RefObject<HTMLInputElement>' },
        defaultValue: { summary: 'null' },
      },
      control: {
        disable: true,
      },
    },
    direction: {
      name: 'direction',
      description: '버튼에 대한 라벨의 위치를 지정합니다.',
      table: {
        type: { summary: `'left' | 'right' | 'bottom' | 'top'` },
        defaultValue: { summary: 'right' },
      },
      control: {
        type: 'select',
        options: ['left', 'right', 'top', 'bottom'],
      },
    },
    name: {
      table: {
        disable: true,
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
    checked: {
      table: {
        disable: true,
      },
    },
    label: {
      table: {
        disable: true,
      },
    },
    disabled: {
      table: {
        disable: true,
      },
    },
    id: {
      table: {
        disable: true,
      },
    },
    customButton: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof RadioButton>;

const DummyCustomFlag = styled.div`
  border: 1px solid black;
  border-radius: 0.2rem;
  background-color: white;
  width: 1rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.4rem;
  padding-bottom: 0.4rem;

  & > div {
    display: none;
  }

  input:checked ~ & > div {
    display: inline;
  }

  input:disabled ~ & {
    filter: grayscale(100%);
  }
`;

const DummyFlag = () => (
  <DummyCustomFlag>
    <div>✔️</div>
  </DummyCustomFlag>
);

const FieldSet = styled.fieldset`
  border: 1px solid black;
  padding: 15px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Legend = styled.legend`
  font-weight: bold;
  padding: 0px 10px;
`;

const Template: ComponentStory<typeof RadioButton> = (args) => {
  return (
    <FieldSet>
      <Legend>팀장뽑기</Legend>

      <RadioButton {...args} name="leader" value="김세영" checked>
        <span>김세영</span>
      </RadioButton>

      <RadioButton {...args} name="leader" value="백도훈">
        <span>백도훈</span>
      </RadioButton>

      <RadioButton {...args} name="leader" value="이선민">
        <span>이선민</span>
      </RadioButton>

      <RadioButton {...args} name="leader" value="이우재">
        <span>이우재</span>
      </RadioButton>

      <RadioButton {...args} name="leader" value="이현빈">
        <span>이현빈</span>
      </RadioButton>

      <RadioButton {...args} name="leader" value="정주연">
        <span>정주연</span>
      </RadioButton>
    </FieldSet>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const CustomColor = Template.bind({});
CustomColor.args = {
  color: 'red',
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  size: '3rem',
  outerSize: '5rem',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const CustomButton = Template.bind({});
CustomButton.args = {
  customButton: <DummyFlag />,
};
CustomButton.parameters = {
  docs: {
    storyDescription: `버튼을 커스터마이징할 수 있습니다.  
    완성된 ReactNode를 \`customButton\` 값으로 넘겨주고, 체크 상태에 대한 컨트롤은 다음과 같이 css로 스타일링합니다.  
    
    input:checked ~ & {
      // styles when input checked...
    }
      
    input:disabled ~ & {
      // styles when input disabled...
    }  
      
    // usage
    <RadioButton customButton={<MyButton/>} />
    
만약 customButton에 \`position: absolute;\`를 사용하는 경우, \`z-index\`값이 1을 넘지 않도록 구현합니다.  
또한, 접근성 권고사항으로서 실제 라디오버튼의 역할을 하지 않는 customButton에 \`aria-hidden\` 속성을 추가할 것을 권장합니다.
    `,
  },
};
