import Center from '@components/@layout/Center';
import Portal from '@components-common/Portal';
import { PORTAL_MODAL_ROOT_ID } from '@constants/portal';
import styled from '@emotion/styled';
import { ChildrenProps } from '@util-types/ChildrenProps';
import { DefaultPropsWithChildren } from '@utils/types/DefaultPropsWithChildren';
import { MouseEventHandler, createContext } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import useSafeContext from 'src/hooks/useSafeContext';

interface ModalProps extends DefaultPropsWithChildren<HTMLDivElement> {
  isOpen: boolean;
  onClose: MouseEventHandler;
}

interface HeaderProps {
  title: string;
}
interface ModalContextInterface {
  onClose: MouseEventHandler;
}

const ModalContext = createContext<ModalContextInterface | null>(null);

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const contextValues = {
    onClose,
  };
  return (
    <Portal id={PORTAL_MODAL_ROOT_ID}>
      <ModalContext.Provider value={contextValues}>
        <ModalWrapper {...{ isOpen }}>
          <BackGround onClick={onClose} />
          <Center>
            <ModalBox role="dialog" aria-modal="true">
              {children}
            </ModalBox>
          </Center>
        </ModalWrapper>
      </ModalContext.Provider>
    </Portal>
  );
};

const Header = ({ title }: HeaderProps) => {
  const { onClose } = useSafeContext(ModalContext);
  return (
    <HeaderWrapper>
      <Button onClick={onClose}>
        <Center>
          <MdArrowBackIosNew />
        </Center>
      </Button>
      <Title>{title}</Title>
    </HeaderWrapper>
  );
};

const Content = ({ children }: ChildrenProps) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

const ModalWrapper = styled.div<Pick<ModalProps, 'isOpen'>>`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  z-index: 997;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
`;

const ModalBox = styled.div`
  width: min-content;
  min-width: 20rem;
  height: min-content;
  position: relative;
  z-index: 999;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 5px 1px;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.color.white};
`;

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 998;
  display: flex;
  opacity: 0.4;
  background-color: ${({ theme }) => theme.color.black};
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 50px;
  line-height: 50px;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
`;

const Title = styled.div`
  margin-left: 10px;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 50%;
  pointer-events: all;
  @media (hover: hover) {
    &:enabled:hover {
      filter: brightness(0.9);
      cursor: pointer;
    }
  }
  &:enabled:active {
    filter: brightness(0.7);
  }
  &:disabled {
    opacity: 0;
  }
`;

const ContentWrapper = styled.div`
  padding: 20px;
`;

Modal.Header = Header;
Modal.Content = Content;

export default Modal;
