import styled from '@emotion/styled';

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
  return {
    width: size === 'small' ? '1.875rem' : '3.125rem',
    height: size === 'small' ? '1.875rem' : '3.125rem',
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
  return {
    position: 'absolute',
    width: size === 'small' ? '0.938rem' : '1.563rem',
    height: size === 'small' ? '0.938rem' : '1.563rem',
    border:
      size === 'small'
        ? `0.125rem solid ${primary100}`
        : `0.188rem solid ${primary100}`,
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin-animation 1s linear infinite',
    top: size === 'small' ? '0.938rem' : '1.563rem',
    left: size === 'small' ? '0.938rem' : '1.563rem',
  };
});

export default Spinner;
