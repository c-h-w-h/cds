import { MouseEvent, useRef, useState } from 'react';

import { RangeSelectorProps } from '.';

const useSlider = ({
  min,
  max,
  init,
  size,
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

  const handleThumbPosition = (
    e: MouseEvent<HTMLDivElement> | globalThis.MouseEvent,
  ) => {
    if (!trackRef.current || !thumbRef.current) return;
    const { left, bottom } = trackRef.current.getBoundingClientRect();
    const dist = Math.round(
      isHorizontal ? e.clientX - left : -(e.clientY - bottom),
    );
    const ratio = Math.round((dist / size) * 100);
    const value = Math.round(((max - min) * ratio) / 100 + min);

    setValue(value);
    setThumbPosition(ratio);
  };

  const handleFilledPosition = (
    e: MouseEvent<HTMLDivElement> | globalThis.MouseEvent,
  ) => {
    if (!trackRef.current || !filledRef.current) return;
    const { left, bottom } = trackRef.current.getBoundingClientRect();
    const dist = Math.round(
      isHorizontal ? e.clientX - left : -(e.clientY - bottom),
    );
    const ratio = Math.round((dist / size) * 100);

    setFilledRatio(ratio);
  };

  const handleSliderValue = (
    e: MouseEvent<HTMLDivElement> | globalThis.MouseEvent,
  ) => {
    if (!trackRef.current) return;
    const { left, right, bottom, top } =
      trackRef.current.getBoundingClientRect();

    if (isHorizontal) {
      if (e.clientX < left || e.clientX > right) return;
    } else {
      if (e.clientY > bottom || e.clientY < top) return;
    }

    handleThumbPosition(e);
    handleFilledPosition(e);
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
    handleSliderValue,
    handleThumbPosition,
    handleFilledPosition,
  };
};

export type UseSliderReturn = ReturnType<typeof useSlider>;

export { useSlider };
