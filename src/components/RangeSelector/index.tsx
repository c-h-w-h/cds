import { theme } from '@components/@common/CdsProvider/theme';
import Flexbox from '@components/@layout/Flexbox';
import { css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import {
  SetStateAction,
  createContext,
  Dispatch,
  ReactNode,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import useSafeContext from 'src/hooks/useSafeContext';

type RangeSelectorContextInterface = Omit<
  RangeSelectorProps,
  'init' | 'children'
> & {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
};

const RangeSelectorContext =
  createContext<RangeSelectorContextInterface | null>(null);

export interface RangeSelectorProps {
  label: string;
  min: number;
  max: number;
  init: number;
  size: number;
  orientation: 'horizontal' | 'vertical';
  children: ReactNode;
}

const RangeSelector = ({
  label,
  min,
  max,
  init,
  size,
  orientation = 'horizontal',
  children,
}: RangeSelectorProps) => {
  const [value, setValue] = useState<number>(init);

  const providerValue = {
    label,
    value,
    setValue,
    min,
    max,
    size,
    orientation,
  };

  const orientationStyle = {
    horizontal: css`
      width: ${size}px;
    `,
    vertical: css`
      height: ${size}px;
    `,
  };

  return (
    <RangeSelectorContext.Provider value={providerValue}>
      <Flexbox
        flexDirection="column"
        role={'slider'}
        aria-label={label}
        css={css`
          position: relative;
          margin: 1rem;
          ${orientationStyle[orientation]};
        `}
      >
        {children}
      </Flexbox>
    </RangeSelectorContext.Provider>
  );
};

interface TrackProps {
  color?: string;
  children: EmotionJSX.Element;
}

const Track = ({ color, children }: TrackProps) => {
  const { label, size, orientation } = useSafeContext(RangeSelectorContext);
  const { color: themeColor } = theme;
  const { gray100 } = themeColor;

  const orientationStyle = {
    horizontal: css`
      width: ${size}px;
      height: 3px;
    `,
    vertical: css`
      height: ${size}px;
      width: 3px;
    `,
  };

  return (
    <div
      id={`${label}_track`}
      aria-orientation={orientation}
      css={css`
        position: absolute;
        cursor: pointer;
        background-color: ${color ?? gray100};
        ${orientationStyle[orientation]}
      `}
    >
      {children}
    </div>
  );
};

interface FilledProps {
  color?: string;
}

const Filled = ({ color }: FilledProps) => {
  const { orientation } = useSafeContext(RangeSelectorContext);
  const { color: themeColor } = theme;
  const { primary100 } = themeColor;

  const filledOrientationStyle = {
    horizontal: css`
      width: 100px;
      height: 3px;
    `,
    vertical: css`
      height: 100px;
      width: 3px;
    `,
  };

  return (
    <div
      css={css`
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: ${color ?? primary100};
        ${filledOrientationStyle[orientation]};
      `}
    />
  );
};

interface ThumbProps {
  index: number;
  color?: string;
  children?: ReactNode;
}

const Thumb = ({ index, color, children }: ThumbProps) => {
  const { value, setValue, min, max, orientation } =
    useSafeContext(RangeSelectorContext);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const initialPosRef = useRef<number | null>(null);
  const [movable, setMovable] = useState<boolean>(false);
  const { color: themeColor } = theme;
  const { primary100 } = themeColor;

  const isHorizontal = orientation === 'horizontal';

  const initialPos = {
    horizontal: css`
      left: 0;
    `,
    vertical: css`
      bottom: 0;
    `,
  };

  const handleThumbPosition = (e: globalThis.MouseEvent) => {
    if (thumbRef.current === null || initialPosRef.current === null) return;
    const dist = isHorizontal
      ? e.clientX - initialPosRef.current
      : -(e.clientY - initialPosRef.current);
    const ratio = Math.round((dist / (max - min)) * 100) + min;

    if (isHorizontal) {
      thumbRef.current.style.left = dist + 'px';
    } else {
      thumbRef.current.style.bottom = dist + 'px';
    }
    setValue(ratio);
  };

  useLayoutEffect(() => {
    if (initialPosRef.current === null && thumbRef.current) {
      const thumbRect = thumbRef.current.getBoundingClientRect();
      initialPosRef.current = isHorizontal ? thumbRect.left : thumbRect.bottom;
    }
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
        if (initialPosRef.current === null) return;

        // if (isHorizontal) {
        //   if (e.clientX < initialPosRef.current) return;
        // } else {
        //   if (e.clientY < initialPosRef.current) return;
        // }

        handleThumbPosition(e);
      },
      { signal },
    );
  }, [movable]);

  return (
    <div
      ref={thumbRef}
      tabIndex={0}
      onMouseDown={() => setMovable(true)}
      css={css`
        position: absolute;
        user-select: none;
        cursor: pointer;
        transform: translate(-50%, 50%);
        ${initialPos[orientation]}
      `}
    >
      {children ?? (
        <div
          css={css`
            position: absolute;
            width: 1rem;
            height: 1rem;
            border-radius: 2rem;
            transform: translate(-50%, -50%);
            background-color: ${color ?? primary100};
          `}
        >
          {value}
        </div>
      )}
    </div>
  );
};

RangeSelector.Track = Track;
RangeSelector.Filled = Filled;
RangeSelector.Thumb = Thumb;

export { RangeSelectorContext };
export default RangeSelector;
