import Center from '@components/@layout/Center';
import Flexbox from '@components-layout/Flexbox';
import { css } from '@emotion/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Table, {
  TableHead,
  TableBody,
  TableRow,
  TableHeadData,
  TableBodyData,
} from '.';

export default {
  title: 'Design System/Components/Table',
  component: Table,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Table은 행과 열로 이루어진 표 형식으로 나타내야 하는 정보가 있을 경우 사용하기 적합합니다.',
    docs: {
      description: {
        component: `- 다음과 같은 컴포넌트를 children으로 사용할 수 있습니다.  
        - \\<TableHead\\> : Table의 각 열을 설명하는 요소들을 감싸는 컴포넌트입니다. HTML의 \\<thead\\>에 해당합니다.
        - \\<TableBody\\> : Table에 표시할 실제 데이터를 감싸는 컴포넌트입니다. HTML의 \\<tbody\\>에 해당합니다.
        - \\<TableRow\\> : Table 데이터의 각 행을 감싸는 컴포넌트입니다. HTML의 \\<tr\\>에 해당합니다. 
        - \\<TableHeadData\\> : \\<TableHead\\> 내부에 위치하며 실제 데이터를 나타내는 셀입니다. HTML의 \\<th\\>에 해당합니다. 
        - \\<TableBodyData\\> : \\<TableBody\\> 내부에 위치하며 실제 데이터를 나타내는 셀입니다. HTML의 \\<td\\>에 해당합니다. 
        `,
      },
    },
  },
  argTypes: {
    outline: {
      name: 'outline',
      description: 'Table의 테두리 선 유무를 결정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'Table',
      },
      control: {
        type: 'boolean',
      },
    },
    rounded: {
      name: 'rounded',
      description: 'Table의 모서리가 둥근지 여부를 결정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'Table',
      },
      control: {
        type: 'boolean',
      },
    },
    textColor: {
      name: 'textColor',
      description: '글자 색상을 결정합니다.',
      table: {
        type: { summary: 'color' },
        category: 'Common',
      },
      control: false,
    },
    backgroundColor: {
      name: 'backgroundColor',
      description: '배경 색상을 결정합니다.',
      table: {
        type: { summary: 'color' },
        category: 'Common',
      },
      control: false,
    },
    as: { table: { disable: true } },
    theme: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <Flexbox
        justifyContent={'center'}
        alignItems={'center'}
        css={css`
          height: 300px;
        `}
      >
        <Center>
          <Story />
        </Center>
      </Flexbox>
    ),
  ],
} as ComponentMeta<typeof Table>;

const DUMMY_HEAD = [['Column1', 'Column2', 'Column3']];
const DUMMY_BODY = [
  ['Data1', 'Data2', 'Data3'],
  ['Data4', 'Data5', 'Data6'],
];

const Template: ComponentStory<typeof Table> = (args) => (
  <Table {...args}>
    <TableHead>
      {DUMMY_HEAD.map((head, index) => (
        <TableRow key={`head_${index}`}>
          {head.map((text) => (
            <TableHeadData key={text}>{text}</TableHeadData>
          ))}
        </TableRow>
      ))}
    </TableHead>
    <TableBody>
      {DUMMY_BODY.map((body, index) => (
        <TableRow key={`body_${index}`}>
          {body.map((text) => (
            <TableBodyData key={text}>{text}</TableBodyData>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const Default = Template.bind({});

export const WithOutline = Template.bind({});

WithOutline.args = {
  outline: true,
};

WithOutline.parameters = {
  docs: {
    storyDescription:
      'outline 속성을 명시하면 Table에 테두리를 표시할 수 있습니다.',
  },
};

export const WithRounded = Template.bind({});

WithRounded.args = {
  outline: true,
  rounded: true,
};

WithRounded.parameters = {
  docs: {
    storyDescription:
      'rounded 속성을 명시하면 Table의 모서리에 border-radius를 추가합니다.',
  },
};

const TableHeadTemplate: ComponentStory<typeof TableHead> = (args) => (
  <Table outline>
    <TableHead {...args}>
      {DUMMY_HEAD.map((head, index) => (
        <TableRow key={`head_${index}`}>
          {head.map((text) => (
            <TableHeadData key={text}>{text}</TableHeadData>
          ))}
        </TableRow>
      ))}
    </TableHead>
    <TableBody>
      {DUMMY_BODY.map((body, index) => (
        <TableRow key={`body_${index}`}>
          {body.map((text) => (
            <TableBodyData key={text}>{text}</TableBodyData>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const WithBackgroundColor = TableHeadTemplate.bind({});

WithBackgroundColor.args = {
  textColor: 'white',
  backgroundColor: 'primary100',
};

WithBackgroundColor.parameters = {
  docs: {
    storyDescription:
      '\\<TableHead\\> 컴포넌트의 textColor와 backgroundColor 속성에 사용자 지정 색상을 전달할 수 있습니다.',
  },
};

const BodyDataTextColorTemplate: ComponentStory<typeof TableBodyData> = (
  args,
) => (
  <Table outline>
    <TableHead backgroundColor="primary100" textColor="white">
      {DUMMY_HEAD.map((head, index) => (
        <TableRow key={`head_${index}`}>
          {head.map((text) => (
            <TableHeadData key={text}>{text}</TableHeadData>
          ))}
        </TableRow>
      ))}
    </TableHead>
    <TableBody>
      {DUMMY_BODY.map((body, index) => (
        <TableRow key={`body_${index}`}>
          {body.map((text) => (
            <TableBodyData
              key={text}
              textColor={text === 'Data5' ? args.textColor : undefined}
            >
              {text}
            </TableBodyData>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const WithTextHighlight = BodyDataTextColorTemplate.bind({});

WithTextHighlight.args = {
  textColor: 'primary100',
};

WithTextHighlight.parameters = {
  docs: {
    storyDescription:
      '\\<TableBodyData\\> 컴포넌트의 textColor 속성에 사용자 지정 색상을 전달하여 강조할 수 있습니다.',
  },
};

const BodyDataBackgroundColorTemplate: ComponentStory<typeof TableBodyData> = (
  args,
) => (
  <Table outline>
    <TableHead backgroundColor="primary100" textColor="white">
      {DUMMY_HEAD.map((head, index) => (
        <TableRow key={`head_${index}`}>
          {head.map((text) => (
            <TableHeadData key={text}>{text}</TableHeadData>
          ))}
        </TableRow>
      ))}
    </TableHead>
    <TableBody>
      {DUMMY_BODY.map((body, index) => (
        <TableRow key={`body_${index}`}>
          {body.map((text) => (
            <TableBodyData
              key={text}
              backgroundColor={
                text === 'Data5' ? args.backgroundColor : undefined
              }
            >
              {text}
            </TableBodyData>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const WithBackgroundHighlight = BodyDataBackgroundColorTemplate.bind({});

WithBackgroundHighlight.args = {
  backgroundColor: 'gray100',
};

WithBackgroundHighlight.parameters = {
  docs: {
    storyDescription:
      '\\<TableBodyData\\> 컴포넌트의 backgroundColor 속성에 사용자 지정 색상을 전달하여 강조할 수 있습니다.',
  },
};
