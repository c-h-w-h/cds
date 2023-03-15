import Flexbox from '@components/@layout/Flexbox';
import Typography from '@components/Typography';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  createContext,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const RangeSelectorContext =
  createContext<
    | (Omit<RangeSelectorProps, 'init' | 'children'> & {
        value: number;
        setValue: React.Dispatch<React.SetStateAction<number>>;
      })
    | null
  >(null);

interface RangeSelectorProps {
  min: number;
  max: number;
  init: number;
  size: number;
  children: ReactNode;
  color?: string;
}

const RangeSelector = ({
  min,
  max,
  init,
  size,
  color,
  children,
}: RangeSelectorProps) => {
  const [value, setValue] = useState<number>(init);

  const providerValue = { value, setValue, min, max, size, color };

  return (
    <RangeSelectorContext.Provider value={providerValue}>
      <Flexbox
        flexDirection="column"
        css={css`
          width: ${size}px;
          padding: 1rem;
        `}
      >
        {children}
      </Flexbox>
    </RangeSelectorContext.Provider>
  );
};

const RangeDisplay = () => {
  const context = useContext(RangeSelectorContext);

  if (context === null) return null;
  return (
    <Flexbox
      justifyContent={'space-between'}
      css={css`
        position: relative;
        width: inherit;
        user-select: none;
      `}
    >
      <Typography variant={'desc'}>{context.min.toString()}</Typography>
      <Typography variant={'desc'}>{context.max.toString()}</Typography>
    </Flexbox>
  );
};

const calcRangeValue = (
  size: number,
  max: number,
  min: number,
  maxPos: number,
  currentX: number,
) => max - min - Math.floor(((maxPos - currentX - 8) / size) * 100);

const setInitialThumbPos = (
  max: number,
  min: number,
  maxPos: number,
  minPos: number,
  value: number,
) => ((value / (max - min)) * 100 * (maxPos - minPos)) / 100;

const Slider = () => {
  const context = useContext(RangeSelectorContext);
  const [movable, setMovable] = useState<boolean>(false);
  const minXPosRef = useRef<number>(0);
  const maxXPosRef = useRef<number>(0);
  const TrackRef = useRef<HTMLDivElement | null>(null);
  const FilledRef = useRef<HTMLDivElement | null>(null);
  const ThumbRef = useRef<HTMLDivElement | null>(null);

  const thumbHalfWidth = useMemo(() => {
    return ThumbRef.current
      ? ThumbRef.current?.getBoundingClientRect().width / 2
      : 0;
  }, [ThumbRef.current]);

  const handleThumbPosition = (
    e: MouseEvent<HTMLDivElement> | globalThis.MouseEvent,
  ) => {
    if (ThumbRef.current && FilledRef.current && TrackRef.current && context) {
      let clickedPos = e.clientX;
      if (clickedPos > maxXPosRef.current - 8) {
        clickedPos = maxXPosRef.current;
      } else if (clickedPos < minXPosRef.current + 8) {
        clickedPos = minXPosRef.current;
      }
      ThumbRef.current.style.left = `${clickedPos - 8}px`;
      FilledRef.current.style.width = `${clickedPos - 24}px`;
      context.setValue(
        calcRangeValue(
          context.size - 16,
          context.max,
          context.min,
          maxXPosRef.current + 8,
          clickedPos,
        ),
      );
    }
  };

  useLayoutEffect(() => {
    if (TrackRef.current && ThumbRef.current && FilledRef.current && context) {
      const { max, min, value } = context;
      const { left, right } = TrackRef.current.getBoundingClientRect();
      const { width } = ThumbRef.current.getBoundingClientRect();
      minXPosRef.current = left + width / 2;
      maxXPosRef.current = right - width / 2;
      const initialPos = setInitialThumbPos(max, min, right, left, value);
      ThumbRef.current.style.left = initialPos + 16 + 'px';
      FilledRef.current.style.width = initialPos + 'px';
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    window.addEventListener(
      'mousemove',
      (e) => {
        window.addEventListener('mouseup', () => {
          setMovable(false);
          controller.abort();
        });

        if (!movable) return;
        if (e.clientX > maxXPosRef.current) return;
        if (e.clientX < minXPosRef.current) return;
        handleThumbPosition(e);
      },
      { signal },
    );
  }, [movable]);

  if (context === null) return null;
  return (
    <Flexbox>
      <Track ref={TrackRef} size={context.size} onClick={handleThumbPosition} />
      <Filled
        ref={FilledRef}
        size={context.size}
        onClick={handleThumbPosition}
      />
      <Thumb ref={ThumbRef} onMouseDown={() => setMovable(true)}>
        <Flexbox justifyContent={'center'} alignItems={'center'}>
          <Typography variant={'desc'}>{context.value.toString()}</Typography>
        </Flexbox>
      </Thumb>
    </Flexbox>
  );
};

interface TrackProps {
  size: number;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Track = styled.div<TrackProps>`
  width: ${({ size }) => size + 'px'};
  height: 1px;
  height: 3px;
  background-color: lightgray;
`;

const Filled = styled.div<TrackProps>`
  position: absolute;
  left: 0;
  height: 3px;
  margin: 1.5rem;
  background-color: skyblue;
  cursor: pointer;
`;

const Thumb = styled.div`
  position: absolute;
  left: 0;
  width: 1rem;
  height: 1rem;
  border-radius: 2rem;
  background-color: skyblue;
  user-select: none;
  cursor: pointer;
`;

RangeSelector.Slider = Slider;
RangeSelector.RangeDisplay = RangeDisplay;

export { RangeSelectorContext, RangeSelector };
