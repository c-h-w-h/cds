import { theme } from '@components/@common/CdsProvider/theme';
import Flexbox from '@components/@layout/Flexbox';
import Typography from '@components/Typography';
import { css } from '@emotion/react';
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  CSSProperties,
} from 'react';
import useSafeContext from 'src/hooks/useSafeContext';

import { useSlider, UseSliderReturn } from './useSlider';

type SliderContextInterface = Omit<SliderProps, 'defaultValue' | 'children'> &
  UseSliderReturn;

const SliderContext = createContext<SliderContextInterface | null>(null);

export interface SliderProps {
  label: string;
  min: number;
  max: number;
  defaultValue: number;
  children: ReactNode;
  size?: CSSProperties['width'];
  step?: number;
  orientation?: 'horizontal' | 'vertical';
}

const Slider = ({
  label,
  min,
  max,
  defaultValue,
  children,
  size = '100%',
  step = 1,
  orientation = 'horizontal',
}: SliderProps) => {
  const { getStyles, ...contextValue } = useSlider({
    min,
    max,
    defaultValue,
    size,
    step,
    orientation,
  });

  const { rootStyle } = getStyles();

  return (
    <SliderContext.Provider
      value={{
        label,
        min,
        max,
        size,
        step,
        orientation,
        getStyles,
        ...contextValue,
      }}
    >
      <Flexbox
        id={`${label}-slider-root`}
        css={css`
          position: relative;
          ${rootStyle};
        `}
      >
        {children ?? (
          <>
            <Track>
              <Filled />
            </Track>
            <Thumb />
          </>
        )}
      </Flexbox>
    </SliderContext.Provider>
  );
};

interface TrackProps {
  color?: string;
  children: ReactNode;
}

const Track = ({ color, children }: TrackProps) => {
  const { label, trackRef, getStyles, onMoveSlider } =
    useSafeContext(SliderContext);
  const { color: themeColor } = theme;
  const { gray100 } = themeColor;
  const { trackStyle } = getStyles();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      id={`${label}-slider-track`}
      ref={trackRef}
      onClick={onMoveSlider}
      css={css`
        position: absolute;
        cursor: pointer;
        background-color: ${color ?? gray100};
        ${trackStyle};
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
  const { label, filledRef, getStyles } = useSafeContext(SliderContext);
  const { color: themeColor } = theme;
  const { primary } = themeColor;
  const { filledStyle } = getStyles();

  return (
    <div
      id={`${label}-slider-filled`}
      ref={filledRef}
      css={css`
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: ${color ?? primary};
        ${filledStyle};
      `}
    />
  );
};

interface ThumbProps {
  color?: string;
  children?: ReactNode;
}

const Thumb = ({ color, children }: ThumbProps) => {
  const {
    label,
    min,
    max,
    orientation,
    thumbRef,
    getValue,
    getStyles,
    onMoveSlider,
    onPressArrow,
  } = useSafeContext(SliderContext);
  const [isDraggable, setIsDraggable] = useState<boolean>(false);
  const { color: themeColor } = theme;
  const { primary, white } = themeColor;
  const { thumbStyle } = getStyles();

  const valueNow = getValue();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (!isDraggable) return;

    window.addEventListener(
      'mousemove',
      (e) => {
        window.addEventListener(
          'mouseup',
          () => {
            setIsDraggable(false);
            controller.abort();
          },
          { signal },
        );

        if (!isDraggable) return;

        onMoveSlider(e);
      },
      { signal },
    );
  }, [isDraggable]);

  return (
    <div
      id={`${label}-slider-thumb`}
      ref={thumbRef}
      role={'slider'}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={valueNow}
      aria-orientation={orientation}
      tabIndex={0}
      onMouseDown={() => setIsDraggable(true)}
      onKeyDown={onPressArrow}
      css={css`
        position: absolute;
        user-select: none;
        cursor: pointer;
        ${thumbStyle}
      `}
    >
      <input
        id={`${label}-slider-value`}
        type="range"
        defaultValue={valueNow}
        css={css`
          display: none;
        `}
      />
      {children ?? (
        <Flexbox
          justifyContent="center"
          alignItems="center"
          css={css`
            width: 24px;
            height: 24px;
            border-radius: 50%;
            color: ${white};
            background-color: ${color ?? primary};
          `}
        >
          <Typography variant={'desc'}>{String(valueNow)}</Typography>
        </Flexbox>
      )}
    </div>
  );
};

Slider.Track = Track;
Slider.Filled = Filled;
Slider.Thumb = Thumb;

Track.displayName = 'Slider.Track';
Filled.displayName = 'Slider.Filled';
Thumb.displayName = 'Slider.Thumb';

export { SliderContext };
export default Slider;
