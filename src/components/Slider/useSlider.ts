import {
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP,
  END,
  HOME,
  PAGE_DOWN,
  PAGE_UP,
} from '@constants/key';
import {
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  useRef,
  useState,
} from 'react';

import { SliderProps } from '.';

const useSlider = ({
  min,
  max,
  defaultValue,
  size,
  step,
  orientation,
}: Omit<SliderProps, 'label' | 'children'> & {
  step: number;
  orientation: 'horizontal' | 'vertical';
}) => {
  const defaultRatio = Math.round(((defaultValue - min) / (max - min)) * 100);
  const [ratio, setRatio] = useState<number>(defaultRatio);
  const [value, setValue] = useState<number>(defaultValue);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const filledRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  const isHorizontal = orientation === 'horizontal';

  const getValue = () => value;

  const getStyles = () => {
    const SLIDER_THICKNESS = 4;

    const rootStyle = {
      horizontal: {
        width: size,
      },
      vertical: {
        height: size,
      },
    };

    const trackStyle = {
      horizontal: {
        width: size,
        height: `${SLIDER_THICKNESS}px`,
      },
      vertical: {
        height: size,
        width: `${SLIDER_THICKNESS}px`,
      },
    };

    const filledStyle = {
      horizontal: {
        width: `${ratio}%`,
        height: `${SLIDER_THICKNESS}px`,
      },
      vertical: {
        height: `${ratio}%`,
        width: `${SLIDER_THICKNESS}px`,
      },
    };

    const thumbStyle = {
      horizontal: {
        left: `${ratio}%`,
        transform: 'translateX(-50%)',
      },
      vertical: {
        bottom: `${ratio}%`,
        transform: 'translateY(50%)',
      },
    };

    return {
      rootStyle: rootStyle[orientation],
      trackStyle: trackStyle[orientation],
      filledStyle: filledStyle[orientation],
      thumbStyle: thumbStyle[orientation],
    };
  };

  const onMoveSlider = (e: ReactMouseEvent<HTMLDivElement> | MouseEvent) => {
    e.preventDefault();

    if (!trackRef.current || !filledRef.current || !thumbRef.current) return;
    const { left, bottom, width, height } =
      trackRef.current.getBoundingClientRect();

    const dist = Math.round(
      isHorizontal ? e.clientX - left : bottom - e.clientY,
    );
    const trackLength = isHorizontal ? width : height;
    const ratio = (dist / trackLength) * 100;
    const value = ((max - min) * ratio) / 100 + min;
    let stepValue = Math.round((value - min) / step) * step + min;

    // Verify that the value is valid
    if (stepValue < min) {
      stepValue = min;
    } else if (stepValue > max) {
      stepValue = max;
    }

    const stepRatio = ((stepValue - min) / (max - min)) * 100;

    setValue(stepValue);
    setRatio(stepRatio);
  };

  const onPressArrow = (e: KeyboardEvent) => {
    e.preventDefault();

    let nextValue = (function (key: string, currentValue: number) {
      switch (key) {
        case ARROW_LEFT:
        case ARROW_DOWN:
          return currentValue - step;
        case ARROW_RIGHT:
        case ARROW_UP:
          return currentValue + step;
        case PAGE_DOWN:
          // decrease 10%
          return currentValue - (max - min) / 10;
        case PAGE_UP:
          // increase 10%
          return currentValue + (max - min) / 10;
        case HOME:
          return min;
        case END:
          return max;
        default:
          return null;
      }
    })(e.key, value);

    if (nextValue === null) return;

    if (nextValue < min) {
      nextValue = min;
    } else if (nextValue > max) {
      nextValue = max;
    }

    const stepRatio = ((nextValue - min) / (max - min)) * 100;

    setValue(nextValue);
    setRatio(stepRatio);
    if (thumbRef.current) thumbRef.current.focus();
  };

  return {
    trackRef,
    filledRef,
    thumbRef,
    getValue,
    getStyles,
    onMoveSlider,
    onPressArrow,
  };
};

export type UseSliderReturn = ReturnType<typeof useSlider>;

export { useSlider };
