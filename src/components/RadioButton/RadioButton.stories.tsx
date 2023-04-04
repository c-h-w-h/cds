import { theme } from '@components/@common/CdsProvider/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useRef } from 'react';

import { RadioButton } from '.';

export default {
  title: 'RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    size: '16px',
    disabled: false,
    color: theme.color.primary100,
    outerSize: '30px',
  },
  argTypes: {
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
  },
} as ComponentMeta<typeof RadioButton>;

const DummyLabel = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

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

const Template: ComponentStory<typeof RadioButton> = (args) => {
  const test = useRef<HTMLInputElement>(null);

  return (
    <fieldset
      css={css`
        border: 1px solid black;
        padding: 15px;
        width: fit-content;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      <legend
        css={css`
          font-weight: bold;
          padding: 0px 10px;
        `}
      >
        팀장뽑기
      </legend>
      <DummyLabel>
        <RadioButton
          {...args}
          name="leader"
          value="김세영"
          checked
          inputRef={test}
        />
        <span>김세영</span>
      </DummyLabel>
      <DummyLabel>
        <RadioButton {...args} name="leader" value="백도훈" />
        <span>백도훈</span>
      </DummyLabel>
      <DummyLabel>
        <RadioButton {...args} name="leader" value="이선민" />
        <span>이선민</span>
      </DummyLabel>
      <DummyLabel>
        <RadioButton {...args} name="leader" value="이우재" />
        <span>이우재</span>
      </DummyLabel>
      <DummyLabel>
        <RadioButton {...args} name="leader" value="이현빈" />
        <span>이현빈</span>
      </DummyLabel>
      <DummyLabel>
        <RadioButton {...args} name="leader" value="정주연" />
        <span>정주연</span>
      </DummyLabel>
    </fieldset>
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
