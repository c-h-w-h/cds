import Typography from '@components/Typography';
import Center from '@components-layout/Center';
import styled from '@emotion/styled';

type BadgeSize = 'large' | 'small';

interface BadgeProps {
  children: string;
  size?: BadgeSize;
  outline?: boolean;
  color?: string;
  filled?: boolean;
}

const Badge = ({
  children,
  size = 'small',
  outline = false,
  color,
  filled = false,
}: BadgeProps) => {
  return (
    <BadgeContainer {...{ outline, color, filled }}>
      <Center>
        <Typography variant={size === 'large' ? 'body' : 'desc'}>
          {children}
        </Typography>
      </Center>
    </BadgeContainer>
  );
};

export default Badge;

const BadgeContainer = styled.div<Omit<BadgeProps, 'children' | 'size'>>(
  ({ theme, outline, color, filled }) => {
    const { color: themeColor } = theme;
    const { white, primary } = themeColor;

    return {
      width: 'fit-content',
      padding: '8px 12px',
      borderRadius: 30,
      border: outline ? `1px solid ${color ?? primary}` : 'none',
      color: filled ? white : color ?? primary,
      backgroundColor: filled ? color ?? primary : 'transparent',

      ':hover': {
        color: filled ? color ?? primary : white,
        backgroundColor: filled ? 'transparent' : color ?? primary,
      },
    };
  },
);
