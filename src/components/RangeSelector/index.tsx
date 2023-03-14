import Flexbox from '@components/@layout/Flexbox';
import Typography from '@components/Typography';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { createContext, ReactNode, useContext, useRef, useState } from 'react';

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

const Slider = () => {
  const context = useContext(RangeSelectorContext);
  const TrackRef = useRef<HTMLDivElement | null>(null);
  const FilledRef = useRef<HTMLDivElement | null>(null);
  const ThumbRef = useRef<HTMLDivElement | null>(null);

  if (context === null) return null;
  return (
    <Flexbox>
      <Track ref={TrackRef} size={context.size} />
      <Filled ref={FilledRef} size={context.size} />
      <Thumb ref={ThumbRef}>
        <Flexbox justifyContent={'center'} alignItems={'center'}>
          <Typography variant={'desc'}>{context.value.toString()}</Typography>
        </Flexbox>
      </Thumb>
    </Flexbox>
  );
};

interface TrackProps {
  size: number;
}

const Track = styled.div<TrackProps>`
  width: ${({ size }) => size + 'px'};
  height: 1px;
  border: 1px solid lightgray;
`;

const Filled = styled.div<TrackProps>`
  position: absolute;
  left: 1rem;
  height: 3px;
  background-color: skyblue;
  cursor: pointer;
`;

const Thumb = styled.div`
  position: absolute;
  left: 1rem;
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
