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
  const [thumbPosition, setThumbPosition] = useState<number>(0);
  const [filledRatio, setFilledRatio] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const filledRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  const isHorizontal = orientation === 'horizontal';

  const handleThumbPosition = (
    e: MouseEvent<HTMLDivElement> | globalThis.MouseEvent,
  ) => {
    if (!trackRef.current || !thumbRef.current) return;
    const { left, bottom } = trackRef.current.getBoundingClientRect();
    const dist = isHorizontal ? e.clientX - left : -(e.clientY - bottom);
    const ratio = Math.round((dist / size) * (max - min)) + min;

    setValue(ratio);
    setThumbPosition(dist);
  };

  const handleFilledPosition = (
    e: MouseEvent<HTMLDivElement> | globalThis.MouseEvent,
  ) => {
    if (!trackRef.current || !filledRef.current) return;
    const { left, bottom } = trackRef.current.getBoundingClientRect();
    const dist = isHorizontal ? e.clientX - left : -(e.clientY - bottom);
    const ratio = Math.round((dist / size) * (max - min));

    setFilledRatio(ratio);
  };

  const handleSliderValue = (
    e: MouseEvent<HTMLDivElement> | globalThis.MouseEvent,
  ) => {
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
        left: `${thumbPosition}px`,
      },
      vertical: {
        bottom: `${thumbPosition}px`,
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
