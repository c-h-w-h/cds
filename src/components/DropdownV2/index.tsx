import { DefaultProps } from '@util-types/DefaultProps';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface DropdownProps extends DefaultProps<HTMLDivElement> {
  text?: string;
}

interface IDropdownContext {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}
const DropdownContext = createContext<IDropdownContext>({});

const DropdownV2 = ({ children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DropdownContext.Provider>
  );
};

/*
문제!! 
1. Trigger 자체에 onClick 이벤트를 바인드하고싶음
   그러면서 Trigger의 최상위 컴포넌트를 고정하고싶지 않음
   -> 이 두가지를 모두 만족시킬 수 있는 구조가 없을까?
2. 조건부 렌더링 까지 적다가 답을 발견해서 수정함

일반적으로 넣을 수 있는 드롭다운의 기능이 뭐가 있을까
- 트리거
- 바깥을 클릭했을 때 드롭다운이 토글되어야 하는지?
  - window에 이벤트리스너 바인딩??
- 드롭다운 리스트를 아예 일정한 형태를 정의할까?
  - 약간 Title을 포함한 div로 감싸는 식으로
  - children을 content부분에 넣기
  - 일케하면 어느정도 형태를 고정할 이유(?)가 생김
*/

const Trigger = ({ children }: DefaultProps<HTMLDivElement>) => {
  const { isOpen, setIsOpen } = useContext(DropdownContext);
  return (
    <>
      {setIsOpen && (
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {children}
        </button>
      )}
    </>
  );
};

const List = ({ children }: DefaultProps<HTMLDivElement>) => {
  const { isOpen } = useContext(DropdownContext);
  return <>{isOpen && children}</>;
};

DropdownV2.Trigger = Trigger;
DropdownV2.List = List;

export default DropdownV2;
export { DropdownContext };
