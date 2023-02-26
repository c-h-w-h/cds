import Center from '@components/@layout/Center';
import styled from '@emotion/styled';
import { DefaultPropsWithChildren } from '@utils/types/DefaultPropsWithChildren';

type Handler = () => void;
type Buttons = { key: string; handler: Handler }[];
interface ModalProps extends DefaultPropsWithChildren<HTMLDivElement> {
  title?: string;
  isOpen: boolean;
  onClose: Handler;
  footer?: Buttons;
}

const Modal = ({ title, children, isOpen, onClose, footer }: ModalProps) => {
  return (
    <ModalWrapper {...{ isOpen }}>
      <BackGround {...{ isOpen }} onClick={onClose}></BackGround>
      <Center>
        <ModalBox>
          <div>{title}</div>
          {children}
          <div>
            {footer &&
              footer.map((btn) => (
                <button key={btn.key} onClick={btn.handler}>
                  {btn.key}
                </button>
              ))}
          </div>
        </ModalBox>
      </Center>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div<Pick<ModalProps, 'isOpen'>>`
  width: 100%;
  height: 100%;
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
    zIndex: 2,
    padding: '2rem 0',
    boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 5px 1px',
    borderRadius: '1rem',
    backgroundColor: white,
  };
});

const BackGround = styled.div<Pick<ModalProps, 'isOpen'>>(
  ({ theme, isOpen }) => {
    const { color: themeColor } = theme;
    const { black } = themeColor;
    return {
      width: '100%',
      height: '100%',
      position: 'fixed',
      zIndex: 1,
      display: isOpen ? 'flex' : 'none',
      opacity: 0.3,
      backgroundColor: black,
    };
  },
);

export default Modal;
