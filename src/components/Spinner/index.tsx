import styled from '@emotion/styled';
import { SPINNER_SIZE } from '@src/constants/spinner';

interface SpinnerProps {
  size: 'small' | 'large';
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

const SpinnerContainer = styled.div<SpinnerProps>(({ theme, size }) => {
  const { color: themeColor } = theme;
  const { white } = themeColor;
  const { small, large } = SPINNER_SIZE;
  return {
    width: size === 'small' ? small.OUTCIRCLE : large.OUTCIRCLE,
    height: size === 'small' ? small.OUTCIRCLE : large.OUTCIRCLE,
    display: 'inline-block',
    overflow: 'hidden',
    background: white,
  };
});

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

const Circle = styled.div<SpinnerProps>(({ theme, size }) => {
  const { color: themeColor } = theme;
  const { primary100 } = themeColor;
  const { small, large } = SPINNER_SIZE;
  return {
    position: 'absolute',
    width: size === 'small' ? small.INNERCIRCLE : large.INNERCIRCLE,
    height: size === 'small' ? small.INNERCIRCLE : large.INNERCIRCLE,
    border:
      size === 'small'
        ? `${small.STROKEWIDTH} solid ${primary100}`
        : `${large.STROKEWIDTH} solid ${primary100}`,
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin-animation 1s linear infinite',
    top: size === 'small' ? small.INNERCIRCLE : large.INNERCIRCLE,
    left: size === 'small' ? small.INNERCIRCLE : large.INNERCIRCLE,
  };
});

export default Spinner;
