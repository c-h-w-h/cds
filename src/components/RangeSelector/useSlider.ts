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

    if (isHorizontal) {
      thumbRef.current.style.left = dist + 'px';
    } else {
      thumbRef.current.style.bottom = dist + 'px';
    }
    setValue(ratio);
  };

  const handleFilledPosition = (
    e: MouseEvent<HTMLDivElement> | globalThis.MouseEvent,
  ) => {
    if (!trackRef.current || !filledRef.current) return;
    const { left, bottom } = trackRef.current.getBoundingClientRect();
    const dist = isHorizontal ? e.clientX - left : -(e.clientY - bottom);
    const ratio = Math.round((dist / size) * (max - min));

    if (isHorizontal) {
      filledRef.current.style.width = ratio + '%';
    } else {
      filledRef.current.style.height = ratio + '%';
    }
  };

  const handleSliderValue = (
    e: MouseEvent<HTMLDivElement> | globalThis.MouseEvent,
  ) => {
    handleThumbPosition(e);
    handleFilledPosition(e);
  };

  const getValue = () => value;

  return {
    handleSliderValue,
    handleThumbPosition,
    handleFilledPosition,
    getValue,
    trackRef,
    filledRef,
    thumbRef,
  };
};

export type UseSliderReturn = ReturnType<typeof useSlider>;

export { useSlider };
