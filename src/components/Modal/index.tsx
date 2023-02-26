import Center from '@components/@layout/Center';
import Flexbox from '@components/@layout/Flexbox';
import { TYPOGRAPHY } from '@constants/typography';
import styled from '@emotion/styled';
import { DefaultPropsWithChildren } from '@utils/types/DefaultPropsWithChildren';
import { MouseEventHandler } from 'react';

type Buttons = { key: string; handler: MouseEventHandler }[];
interface ModalProps extends DefaultPropsWithChildren<HTMLDivElement> {
  title?: string;
  isOpen: boolean;
  onClose: MouseEventHandler;
  footer?: Buttons;
}

const Modal = ({ title, children, isOpen, onClose, footer }: ModalProps) => {
  return (
    <ModalWrapper {...{ isOpen }}>
      <BackGround onClick={onClose}></BackGround>
      <Center>
        <ModalBox>
          {title && <Title>{title}</Title>}
          <Content>{children}</Content>
          {footer && (
            <Footer>
              <Flexbox justifyContent="space-evenly">
                {footer.map((btn) => (
                  <Button key={btn.key} onClick={btn.handler}>
                    {btn.key}
                  </Button>
                ))}
              </Flexbox>
            </Footer>
          )}
        </ModalBox>
      </Center>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div<Pick<ModalProps, 'isOpen'>>`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
`;

const ModalBox = styled.div(({ theme }) => {
  const { color: themeColor } = theme;
  const { white } = themeColor;
  return {
    width: '20rem',
    height: 'min-content',
    position: 'relative',
    zIndex: 999,
    padding: '2rem 0',
    boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 5px 1px',
    borderRadius: '1rem',
    backgroundColor: white,
  };
});

const Title = styled.div`
  height: min-content;
  margin-bottom: 1rem;
  font-size: ${TYPOGRAPHY.subtitle1.size};
  font-weight: ${TYPOGRAPHY.subtitle1.weight};
`;

const Content = styled.div`
  height: min-content;
  font-size: ${TYPOGRAPHY.body.size};
  font-weight: ${TYPOGRAPHY.body.weight};
`;

const Footer = styled.div`
  width: 100%;
  margin-top: 2rem;
  justify-content: space-between;
`;

const BackGround = styled.div(({ theme }) => {
  const { color: themeColor } = theme;
  const { black } = themeColor;
  return {
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: 998,
    display: 'flex',
    opacity: 0.4,
    backgroundColor: black,
  };
});

/**
 * 임시 Button style
 * 후에 구현된 Button 컴포넌트로 바꿀 예정
 */
export const Button = styled.button(({ theme }) => {
  const { color: themeColor } = theme;
  const { primary100, white } = themeColor;
  return {
    width: 'min-content',
    height: '1.7rem',
    padding: '0 1.2rem',
    borderRadius: '0.5rem',
    backgroundColor: primary100,
    color: white,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    '@media (hover: hover)': {
      ':hover': {
        filter: 'brightness(0.9)',
      },
    },
    ':active': {
      filter: 'brightness(0.7)',
    },
  };
});

export default Modal;
