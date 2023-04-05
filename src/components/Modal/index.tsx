import Center from '@components/@layout/Center';
import Portal from '@components-common/Portal';
import styled from '@emotion/styled';
import { DefaultPropsWithChildren } from '@utils/types/DefaultPropsWithChildren';
import { MouseEventHandler } from 'react';

interface ModalProps extends DefaultPropsWithChildren<HTMLDivElement> {
  isOpen: boolean;
  onClose: MouseEventHandler;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  return (
    <Portal>
      <ModalWrapper {...{ isOpen }}>
        <BackGround onClick={onClose}></BackGround>
        <Center>
          <ModalBox>{children}</ModalBox>
        </Center>
      </ModalWrapper>
    </Portal>
  );
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
  padding: 1rem;
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

export default Modal;
