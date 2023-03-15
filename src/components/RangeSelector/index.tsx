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
  mousePos: number,
) => max - min - Math.floor(((maxPos - mousePos) / size) * 100);

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
  const minPosRef = useRef<number>(0);
  const maxPosRef = useRef<number>(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const filledRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  const thumbWidth = useMemo(() => {
    return thumbRef.current
      ? thumbRef.current?.getBoundingClientRect().width
      : 0;
  }, [thumbRef.current]);

  const handleThumbPosition = (
    e: MouseEvent<HTMLDivElement> | globalThis.MouseEvent,
  ) => {
    if (thumbRef.current && filledRef.current && trackRef.current && context) {
      let clickedPos = e.clientX;
      if (clickedPos > maxPosRef.current) {
        clickedPos = maxPosRef.current;
      } else if (clickedPos < minPosRef.current) {
        clickedPos = minPosRef.current;
      }
      thumbRef.current.style.left = `${clickedPos - thumbWidth / 2}px`;
      filledRef.current.style.width = `${
        clickedPos - thumbWidth - thumbWidth / 2
      }px`;
      context.setValue(
        calcRangeValue(
          context.size - thumbWidth,
          context.max,
          context.min,
          maxPosRef.current,
          clickedPos,
        ),
      );
    }
  };

  useLayoutEffect(() => {
    if (trackRef.current && thumbRef.current && filledRef.current && context) {
      const { max, min, value } = context;
      const { left, right } = trackRef.current.getBoundingClientRect();
      const { width } = thumbRef.current.getBoundingClientRect();
      minPosRef.current = left + width / 2;
      maxPosRef.current = right - width / 2;
      const initialPos = setInitialThumbPos(max, min, right, left, value);
      thumbRef.current.style.left = initialPos + width + 'px';
      filledRef.current.style.width = initialPos + 'px';
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
        if (e.clientX > maxPosRef.current) return;
        if (e.clientX < minPosRef.current) return;
        handleThumbPosition(e);
      },
      { signal },
    );
  }, [movable]);

  if (context === null) return null;
  return (
    <Flexbox>
      <Track ref={trackRef} size={context.size} onClick={handleThumbPosition} />
      <Filled
        ref={filledRef}
        size={context.size}
        onClick={handleThumbPosition}
      />
      <Thumb ref={thumbRef} onMouseDown={() => setMovable(true)}>
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
