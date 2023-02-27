import Center from '@components/@layout/Center';
import Container from '@components/@layout/Container';
import { ComponentMeta } from '@storybook/react';
import { ReactNode } from 'react';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadData,
  TableBodyData,
} from '.';

export default {
  title: 'Table',
  component: Table,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Table>;

const heads = [['column1', 'column2', 'column3']];
const bodys = [
  ['data1', 'data2', 'data3'],
  ['data4', 'data5', 'data6'],
];

const wrapConatiner = (children: ReactNode) => {
  return (
    <Center>
      <Container css={{ width: 500 }}>{children}</Container>
    </Center>
  );
};

export const Origin = () =>
  wrapConatiner(
    <Table>
      <TableHead>
        {heads.map((head, index) => (
          <TableRow key={`head_${index}`}>
            {head.map((text) => (
              <TableHeadData key={text}>{text}</TableHeadData>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {bodys.map((body, index) => (
          <TableRow key={`body_${index}`}>
            {body.map((text) => (
              <TableBodyData key={text}>{text}</TableBodyData>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>,
  );

export const OnlyOutline = () =>
  wrapConatiner(
    <Table outline>
      <TableHead>
        {heads.map((head, index) => (
          <TableRow key={`head_${index}`}>
            {head.map((text) => (
              <TableHeadData key={text}>{text}</TableHeadData>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {bodys.map((body, index) => (
          <TableRow key={`body_${index}`}>
            {body.map((text) => (
              <TableBodyData key={text}>{text}</TableBodyData>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>,
  );

export const HeadBackgroundColor = () =>
  wrapConatiner(
    <Table outline>
      <TableHead backgroundColor="primary100" textColor="white">
        {heads.map((head, index) => (
          <TableRow key={`head_${index}`}>
            {head.map((text) => (
              <TableHeadData key={text}>{text}</TableHeadData>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {bodys.map((body, index) => (
          <TableRow key={`body_${index}`}>
            {body.map((text) => (
              <TableBodyData key={text}>{text}</TableBodyData>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>,
  );

export const Rounded = () =>
  wrapConatiner(
    <Table outline rounded>
      <TableHead backgroundColor="primary100" textColor="white">
        {heads.map((head, index) => (
          <TableRow key={`head_${index}`}>
            {head.map((text) => (
              <TableHeadData key={text}>{text}</TableHeadData>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {bodys.map((body, index) => (
          <TableRow key={`body_${index}`}>
            {body.map((text) => (
              <TableBodyData key={text}>{text}</TableBodyData>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>,
  );

export const Highlight1 = () =>
  wrapConatiner(
    <Table outline rounded>
      <TableHead backgroundColor="primary100" textColor="white">
        {heads.map((head, index) => (
          <TableRow key={`head_${index}`}>
            {head.map((text) => (
              <TableHeadData key={text}>{text}</TableHeadData>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {bodys.map((body, index) => (
          <TableRow key={`body_${index}`}>
            {body.map((text) => (
              <TableBodyData
                key={text}
                textColor={text === 'data5' ? 'primary100' : undefined}
              >
                {text}
              </TableBodyData>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>,
  );

export const Highlight2 = () =>
  wrapConatiner(
    <Table outline rounded>
      <TableHead backgroundColor="primary100" textColor="white">
        {heads.map((head, index) => (
          <TableRow key={`head_${index}`}>
            {head.map((text) => (
              <TableHeadData key={text}>{text}</TableHeadData>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {bodys.map((body, index) => (
          <TableRow key={`body_${index}`}>
            {body.map((text) => (
              <TableBodyData
                key={text}
                backgroundColor={text === 'data5' ? 'gray100' : undefined}
              >
                {text}
              </TableBodyData>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>,
  );
