import styled from '@emotion/styled';

interface SpinnerProps {
  size: string;
  color: string;
}

const Spinner = ({ size = 'small', color = '#1493FF' }: SpinnerProps) => {
  return (
    <SpinnerContainer {...{ size }}>
      <Spin>
        <Circle {...{ size, color }} />
      </Spin>
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div<{ size: string }>(({ size }) => ({
  width: size === 'small' ? '30px' : '50px',
  height: size === 'small' ? '30px' : '50px',
  display: 'inline-block',
  overflow: 'hidden',
  background: '#ffffff',
}));

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

const Circle = styled.div<SpinnerProps>(({ size, color }) => ({
  position: 'absolute',
  width: size === 'small' ? '15px' : '25px',
  height: size === 'small' ? '15px' : '25px',
  border: size === 'small' ? `2px solid ${color}` : `3px solid ${color}`,
  borderTopColor: 'transparent',
  borderRadius: '50%',
  animation: 'spin-animation 1s linear infinite',
  top: size === 'small' ? '15px' : '25px',
  left: size === 'small' ? '15px' : '25px',
}));

export default Spinner;
