import { SPINNER_STYLE } from '@constants/spinner';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

interface SpinnerProps {
  size: SpinnerSizeVariant;
}

const Spinner = ({ size = 'small' }: SpinnerProps) => {
  return (
    <SpinnerContainer {...{ size }}>
      <Spin>
        <Circle {...{ size }} />
      </Spin>
    </SpinnerContainer>
  );
};

type SpinnerStyleProps = {
  theme: Theme;
} & SpinnerProps;

const SpinnerContainer = styled.div<SpinnerProps>(
  ({ theme, size }: SpinnerStyleProps) => {
    const { color: themeColor } = theme;
    const { white } = themeColor;

    return {
      width: SPINNER_STYLE[size].OUTCIRCLE,
      height: SPINNER_STYLE[size].OUTCIRCLE,
      display: 'inline-block',
      overflow: 'hidden',
      background: white,
    };
  },
);

const Spin = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.98);
  backface-visibility: hidden;
  transform-origin: 0 0;
  @keyframes spin-animation {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

const Circle = styled.div<SpinnerProps>(
  ({ theme, size }: SpinnerStyleProps) => {
    const { color: themeColor } = theme;
    const { primary } = themeColor;

    return {
      position: 'absolute',
      width: SPINNER_STYLE[size].INNERCIRCLE,
      height: SPINNER_STYLE[size].INNERCIRCLE,
      border: `${SPINNER_STYLE[size].STROKEWIDTH} solid ${primary}`,
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'spin-animation 1s linear infinite',
      top: SPINNER_STYLE[size].INNERCIRCLE,
      left: SPINNER_STYLE[size].INNERCIRCLE,
    };
  },
);

export default Spinner;
