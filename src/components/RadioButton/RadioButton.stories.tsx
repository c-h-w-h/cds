import { theme } from '@components/@common/CdsProvider/theme';
import Center from '@components-layout/Center';
import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import RadioButton from '.';

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: `RadioButton은 여러 가지 옵션 중 하나를 선택하는 <input type='radio'/>과 같은 동작을 합니다.`,
    docs: {
      description: {
        component: `- 같은 \`name\` 속성 값을 갖는 RadioButton 중 하나만이 선택될 수 있습니다.  
- \`value\`, \`checked\`, \`disabled\` 등의 일반적인 라디오 버튼의 속성을 지정할 수 있습니다.
  - \`label\` 값을 지정하여 접근성 도구에서 인식하는 라벨 문자열을 지정할 수 있습니다. 기본값은 \`value\` 값을 따릅니다.
- \`size\`로 버튼의 크기를 지정하고, 이보다 넓은 클릭 영역을 갖게 하려는 경우 \`clickableSize\` 값을 지정할 수 있습니다.
- \`color\` 값으로 기본 RadioButton의 색을 지정할 수 있습니다.
- \`ref\`로 useRef를 위한 RefObject를 넘겨줄 수 있습니다. 이 경우 \`ref\`는 input 태그에 전달됩니다.
- \`direction\`으로 라벨의 라디오 버튼 기준에서의 위치를 지정할 수 있습니다.
- self-closing 태그로도, 자식 요소를 갖는 태그로도 사용이 가능합니다.
  - 자식 요소를 갖는 태그의 경우 해당 요소가 라벨로서 취급됩니다.
  - self-closing 태그의 경우에는 \`label\` 값을, \`label\`이 주어지지 않는 경우 \`value\`값을 라벨로 갖습니다.
- 접근성 권고 사항으로, \`fieldset\`과 \`legend\`로 라디오 버튼을 그룹화하여 사용할 것을 권장합니다.
        `,
      },
    },
  },
  args: {
    size: '16px',
    disabled: false,
    color: theme.color.primary,
    clickableSize: '30px',
    direction: 'right',
  },
  argTypes: {
    size: {
      description: '버튼의 크기를 지정합니다.',
      table: {
        type: { summary: "CSSProperties['width']" },
        defaultValue: { summary: '16px' },
      },
    },
    clickableSize: {
      description: '버튼의 클릭 영역 크기를 지정합니다.',
      table: {
        type: { summary: "CSSProperties['width']" },
        defaultValue: { summary: 'size의 값을 따름' },
      },
    },
    color: {
      description: '기본 버튼의 색상을 지정합니다.',
      table: {
        type: { summary: "CSSProperties['color']" },
        defaultValue: { summary: 'theme.primary' },
      },
      control: {
        type: 'color',
      },
    },
    ref: {
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
    label: {
      description: `사용자에게 선택지에 대한 설명을 제공합니다. self-closing tag 형태로 사용 시 해당 값이 문자열로 표시되며,  
그 외에도 접근성을 위한 \`aria-label\` 값으로 사용되므로 작성을 권장합니다.`,
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    disabled: {
      description: '`true`이면 상호작용이 비활성화됩니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    customButton: {
      description:
        '기본으로 제공되는 디자인 외의 버튼을 사용합니다. 사용법은 아래 스토리를 참고해 주세요.',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
      control: {
        disable: true,
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
    id: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [(Story) => <Center>{Story()}</Center>],
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
CustomColor.parameters = {
  docs: {
    storyDescription: `\`color\` props를 통해 기본 버튼의 색을 지정할 수 있습니다.  
css의 color 속성에 들어가는 값을 모두 지원합니다.`,
  },
};
CustomColor.args = {
  color: 'red',
};

export const CustomSize = Template.bind({});
CustomSize.parameters = {
  docs: {
    storyDescription: `\`size\` props를 통해 기본 버튼의 크기 지정할 수 있습니다.   
또한 \`clickableSize\`를 조절하면 버튼의 시각적 크기보다 넓은 영역을 클릭 영역으로 정할 수 있습니다.  
둘 다 css의 width나 height에 들어가는 값을 모두 지원합니다.`,
  },
};
CustomSize.args = {
  size: '3rem',
  clickableSize: '5rem',
};

export const Disabled = Template.bind({});
Disabled.parameters = {
  docs: {
    storyDescription: `\`disabled\` props를 포함하면 선택 동작이 비활성화됩니다.`,
  },
};
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
또한, 접근성 권고사항으로서 실제 라디오버튼의 역할을 하지 않는 customButton에 \`aria-hidden\` 속성을 추가할 것을 권장합니다.
    `,
  },
};

export const SelfClosingTag: ComponentStory<typeof RadioButton> = (args) => {
  return (
    <RadioGroup>
      <Legend2>당신의 팀장에 투표하세요!</Legend2>
      <RadioButton {...args} name="leader" value="팀장님" label="김세영" />
      <RadioButton {...args} name="leader" value="백도훈" />
      <RadioButton {...args} name="leader" value="이선민" />
      <RadioButton {...args} name="leader" value="이우재" label="" />
      <RadioButton {...args} name="leader" value="이현빈" />
      <RadioButton {...args} name="leader" value="정주연" />
    </RadioGroup>
  );
};
SelfClosingTag.parameters = {
  docs: {
    storyDescription: `\`<RadioButton />\`과 같은 self-closing tag 형태로 사용이 가능합니다.  
\`label\` props로 라벨로 표시될 문자열을 지정하거나, 미지정 시 \`value\` 값이 기본 라벨로 설정됩니다.  
\`label\`에 빈 문자열을 지정시 접근성을 위해 \`aria-label\`에 \`value\` 값이 지정됩니다. 아래 예시의 네 번째 선택지를 참고하세요.`,
  },
};

const RadioGroup = styled.fieldset`
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 10px;
`;

const Legend2 = styled.legend`
  background-color: black;
  color: white;
  margin: 0 auto;
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 10px;
`;
