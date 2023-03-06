import styled from '@emotion/styled';
import { flexboxStyle } from '@styles/flex-box';
import { DefaultPropsWithChildren } from '@util-types/DefaultPropsWithChildren';
import { FlexContainerProps } from '@util-types/FlexContainerProps';

type FlexboxProps = DefaultPropsWithChildren<HTMLDivElement> &
  FlexContainerProps;

const Flexbox = styled.div<FlexboxProps>((props) => {
  return flexboxStyle(props);
});

export default Flexbox;
