import { theme } from '@components/@common/CdsProvider/theme';
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
  id: string;
  label: string;
  min: number;
  max: number;
  init: number;
  trackWidth: number;
  children: ReactNode;
}

const RangeSelector = ({
  id,
  label,
  min,
  max,
  init,
  trackWidth,
  children,
}: RangeSelectorProps) => {
  const [value, setValue] = useState<number>(init);

  const providerValue = { id, label, value, setValue, min, max, trackWidth };

  return (
    <RangeSelectorContext.Provider value={providerValue}>
      <Flexbox
        flexDirection="column"
        role={'slider'}
        aria-label={label}
        css={css`
          width: ${trackWidth}px;
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

  if (context === null) return <></>;
  return (
    <Flexbox
      justifyContent={'space-between'}
      css={css`
        position: relative;
        width: inherit;
        user-select: none;
      `}
    >
      <Typography variant={'desc'} aria-valuemin={context.min}>
        {context.min.toString()}
      </Typography>
      <Typography variant={'desc'} aria-valuemax={context.max}>
        {context.max.toString()}
      </Typography>
    </Flexbox>
  );
};

const fixInt = (float: number) => Number(float.toFixed(0));

const calcRangeValue = (
  trackWidth: number,
  max: number,
  min: number,
  maxPos: number,
  mousePos: number,
  offset = 0,
) =>
  max -
  min -
  fixInt((Math.round(maxPos - mousePos) / (trackWidth - offset)) * (max - min));

const setSliderPos = (
  trackWidth: number,
  max: number,
  min: number,
  value: number,
  offset = 0,
) => ((trackWidth - offset) / (max - min)) * (value - min);

const Slider = () => {
  const context = useContext(RangeSelectorContext);
  const [movable, setMovable] = useState<boolean>(false);
  const minPosRef = useRef<number>(0);
  const maxPosRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const { color: themeColor } = theme;
  const { primary100, gray100 } = themeColor;

  const handleThumbPosition = (
    e: MouseEvent<HTMLDivElement> | globalThis.MouseEvent,
  ) => {
    if (!thumbRef.current || !trackRef.current || !context) return;

    const { trackWidth, max, min, setValue } = context;
    let clickedPos = e.clientX;

    if (clickedPos > maxPosRef.current) {
      clickedPos = maxPosRef.current;
    } else if (clickedPos < minPosRef.current) {
      clickedPos = minPosRef.current;
    }

    const rangeValue = calcRangeValue(
      trackWidth,
      max,
      min,
      maxPosRef.current,
      clickedPos,
      offsetRef.current,
    );
    const rangePos = setSliderPos(trackWidth, max, min, rangeValue + min);

    thumbRef.current.style.left = `${clickedPos - offsetRef.current / 2}px`;
    trackRef.current.style.setProperty('--filled', `${rangePos}px`);
    setValue(min + rangeValue);
  };

  useLayoutEffect(() => {
    if (!thumbRef.current || !trackRef.current || !context) return;

    const { trackWidth, max, min, value } = context;
    const { left, right } = trackRef.current.getBoundingClientRect();
    const { width: offset } = thumbRef.current.getBoundingClientRect();

    minPosRef.current = fixInt(left) + offset / 2;
    maxPosRef.current = fixInt(right) - offset / 2;
    offsetRef.current = offset;

    const thumbPos = setSliderPos(trackWidth, max, min, value, offset);
    const filledTrackPos = setSliderPos(trackWidth, max, min, value);

    thumbRef.current.style.left = `${left + thumbPos}px`;
    trackRef.current.style.setProperty('--filled', `${filledTrackPos}px`);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (!movable) return;

    window.addEventListener(
      'mousemove',
      (e) => {
        window.addEventListener(
          'mouseup',
          () => {
            setMovable(false);
            controller.abort();
          },
          { signal },
        );

        if (!movable) return;
        if (e.clientX > maxPosRef.current) return;
        if (e.clientX < minPosRef.current) return;
        handleThumbPosition(e);
      },
      { signal },
    );
  }, [movable]);

  if (context === null) return <></>;
  return (
    <Flexbox>
      <Track
        id={`${context.id}_track`}
        ref={trackRef}
        trackWidth={context.trackWidth}
        trackColor={gray100}
        filledColor={primary100}
        onClick={handleThumbPosition}
        aria-orientation={'horizontal'}
      />
      <Thumb
        ref={thumbRef}
        thumbColor={primary100}
        onMouseDown={() => setMovable(true)}
        aria-controls={`${context.id}_track`}
      >
        <Flexbox justifyContent={'center'} alignItems={'center'}>
          <Typography variant={'desc'} aria-valuenow={context.value}>
            {context.value.toString()}
          </Typography>
        </Flexbox>
      </Thumb>
    </Flexbox>
  );
};

interface TrackProps {
  trackWidth: number;
  trackColor: string;
  filledColor: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Track = styled.div<TrackProps>`
  width: ${({ trackWidth }) => trackWidth + 'px'};
  height: 3px;
  background-color: ${({ trackColor }) => trackColor};
  cursor: pointer;

  ::after {
    content: '';
    position: absolute;
    width: var(--filled);
    height: 3px;
    display: inline-block;
    background-color: ${({ filledColor }) => filledColor};
    cursor: pointer;
  }
`;

interface ThumbProps {
  thumbColor: string;
}

const Thumb = styled.div<ThumbProps>`
  position: absolute;
  left: 0;
  width: 1rem;
  height: 1rem;
  border-radius: 2rem;
  background-color: ${({ thumbColor }) => thumbColor};
  user-select: none;
  cursor: pointer;
`;

RangeSelector.Slider = Slider;
RangeSelector.RangeDisplay = RangeDisplay;

export { RangeSelectorContext, RangeSelector };
