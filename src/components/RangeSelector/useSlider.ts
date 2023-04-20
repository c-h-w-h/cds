import { ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP } from '@constants/key';
import { KeyboardEvent, MouseEvent, useRef, useState } from 'react';

import { RangeSelectorProps } from '.';

const useSlider = ({
  min,
  max,
  init,
  size,
  step,
  orientation,
}: Omit<RangeSelectorProps, 'label' | 'children'>) => {
  const [value, setValue] = useState<number>(init);
  const [thumbPosition, setThumbPosition] = useState<number>(
    Math.round(((init - min) / (max - min)) * 100),
  );
  const [filledRatio, setFilledRatio] = useState<number>(
    Math.round(((init - min) / (max - min)) * 100),
  );
  const trackRef = useRef<HTMLDivElement | null>(null);
  const filledRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  const isHorizontal = orientation === 'horizontal';

  const onMoveSlider = (
    e: MouseEvent<HTMLDivElement> | globalThis.MouseEvent,
  ) => {
    if (!trackRef.current || !filledRef.current || !thumbRef.current) return;
    const { left, right, bottom, top } =
      trackRef.current.getBoundingClientRect();

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
    const currentValue = value;
    let nextValue = currentValue;

    if (isHorizontal) {
      if (e.key === ARROW_LEFT) {
        nextValue = currentValue - step;
      } else if (e.key === ARROW_RIGHT) {
        nextValue = currentValue + step;
      }
    } else {
      if (e.key === ARROW_DOWN) {
        nextValue = currentValue - step;
      } else if (e.key === ARROW_UP) {
        nextValue = currentValue + step;
      }
    }

    if (nextValue < min) {
      nextValue = min;
    } else if (nextValue > max) {
      nextValue = max;
    }

    const stepRatio = ((nextValue - min) / (max - min)) * 100;

    setValue(nextValue);
    setThumbPosition(stepRatio);
    setFilledRatio(stepRatio);
  };

  const getValue = () => value;

  const getStyles = () => {
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
        height: '4px',
      },
      vertical: {
        height: `${size}px`,
        width: '4px',
      },
    };

    const filledStyle = {
      horizontal: {
        width: `${filledRatio}%`,
        height: '4px',
      },
      vertical: {
        height: `${filledRatio}%`,
        width: '4px',
      },
    };

    const thumbStyle = {
      horizontal: {
        left: `${thumbPosition}%`,
      },
      vertical: {
        bottom: `${thumbPosition}%`,
      },
    };

    return {
      rootStyle: rootStyle[orientation],
      trackStyle: trackStyle[orientation],
      filledStyle: filledStyle[orientation],
      thumbStyle: thumbStyle[orientation],
    };
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
