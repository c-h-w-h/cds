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
import { KeyboardEvent, MouseEvent, useRef, useState } from 'react';

import { SliderProps } from '.';

const useSlider = ({
  min,
  max,
  defaultValue,
  size,
  step,
  orientation,
}: Omit<SliderProps, 'label' | 'children'>) => {
  const [value, setValue] = useState<number>(defaultValue);

  const defaultRatio = Math.round(((defaultValue - min) / (max - min)) * 100);
  const [thumbPosition, setThumbPosition] = useState<number>(defaultRatio);
  const [filledRatio, setFilledRatio] = useState<number>(defaultRatio);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const filledRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  const isHorizontal = orientation === 'horizontal';

  const getValue = () => value;

  const getStyles = () => {
    const SLIDER_THICKNESS = 4;

    const rootStyle = {
      horizontal: {
        width: `${size}px`,
      },
      vertical: {
        height: `${size}px`,
      },
    };

    const trackStyle = {
      horizontal: {
        width: `${size}px`,
        height: `${SLIDER_THICKNESS}px`,
      },
      vertical: {
        height: `${size}px`,
        width: `${SLIDER_THICKNESS}px`,
      },
    };

    const filledStyle = {
      horizontal: {
        width: `${filledRatio}%`,
        height: `${SLIDER_THICKNESS}px`,
      },
      vertical: {
        height: `${filledRatio}%`,
        width: `${SLIDER_THICKNESS}px`,
      },
    };

    const thumbStyle = {
      horizontal: {
        left: `${thumbPosition}%`,
        transform: 'translateX(-50%)',
      },
      vertical: {
        bottom: `${thumbPosition}%`,
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

  const onMoveSlider = (
    e: MouseEvent<HTMLDivElement> | globalThis.MouseEvent,
  ) => {
    e.preventDefault();

    if (!trackRef.current || !filledRef.current || !thumbRef.current) return;
    const { left, right, bottom, top } =
      trackRef.current.getBoundingClientRect();

    // Verify that the event point is valid
    if (isHorizontal) {
      if (e.clientX < left || e.clientX > right) return;
    } else {
      if (e.clientY > bottom || e.clientY < top) return;
    }

    const dist = Math.round(
      isHorizontal ? e.clientX - left : -(e.clientY - bottom),
    );
    const ratio = (dist / size) * 100;
    const value = ((max - min) * ratio) / 100 + min;
    const stepValue = Math.round((value - min) / step) * step + min;
    const stepRatio = ((stepValue - min) / (max - min)) * 100;

    setValue(stepValue);
    setFilledRatio(stepRatio);
    setThumbPosition(stepRatio);
  };

  const onPressArrow = (e: KeyboardEvent) => {
    e.preventDefault();

    let nextValue = (function (key: string, currentValue: number) {
      if (key === ARROW_LEFT || key === ARROW_DOWN) {
        return currentValue - step;
      } else if (key === ARROW_RIGHT || key === ARROW_UP) {
        return currentValue + step;
      } else if (key === PAGE_DOWN) {
        // decrease 10%
        return currentValue - (max - min) / 10;
      } else if (key === PAGE_UP) {
        // increase 10%
        return currentValue + (max - min) / 10;
      } else if (key === HOME) {
        return min;
      } else if (key === END) {
        return max;
      }
      return null;
    })(e.key, value);

    if (nextValue === null) return;

    if (nextValue < min) {
      nextValue = min;
    } else if (nextValue > max) {
      nextValue = max;
    }

    const stepRatio = ((nextValue - min) / (max - min)) * 100;

    setValue(nextValue);
    setThumbPosition(stepRatio);
    setFilledRatio(stepRatio);
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
