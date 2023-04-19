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
          ${orientationStyle[orientation]};
          padding: 1rem;
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
        ${orientationStyle[orientation]}
        background-color: ${color ?? gray100};
        cursor: pointer;
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
      width: var(--filled);
      height: 3px;
    `,
    vertical: css`
      height: var(--filled);
      width: 3px;
    `,
  };

  return (
    <div
      css={css`
        position: absolute;
        display: inline-block;
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
  const { color: themeColor } = theme;
  const { primary100 } = themeColor;

  return (
    <div tabIndex={index}>
      {children ?? (
        <div
          css={css`
            width: 1rem;
            height: 1rem;
            border-radius: 2rem;
            background-color: ${color ?? primary100};
            cursor: pointer;
          `}
        />
      )}
    </div>
  );
};

RangeSelector.Track = Track;
RangeSelector.Filled = Filled;
RangeSelector.Thumb = Thumb;

export { RangeSelectorContext };
export default RangeSelector;
