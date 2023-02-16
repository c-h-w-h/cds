import Center from '@components/Center';
import Typography from '@components/Typography';
import styled from '@emotion/styled';

type BadgeSize = 'large' | 'small';

interface BadgeProps {
  children: string;
  size?: BadgeSize;
  outline?: boolean;
  color?: string;
  fill?: boolean;
}

function Badge({
  children,
  size = 'small',
  outline = false,
  color,
  fill = false,
}: BadgeProps) {
  return (
    <BadgeContainer {...{ outline, color, fill }}>
      <Center>
        <Typography variant={size === 'large' ? 'body' : 'desc'}>
          {children}
        </Typography>
      </Center>
    </BadgeContainer>
  );
}

export default Badge;

const BadgeContainer = styled.div<Omit<BadgeProps, 'children' | 'size'>>(
  ({ theme, outline, color, fill }) => {
    const { color: themeColor } = theme;
    const { white, primary100 } = themeColor;

    return {
      width: 'fit-content',
      padding: '8px 12px',
      borderRadius: 30,
      border: outline ? `1px solid ${color ?? primary100}` : 'none',
      color: fill ? white : color ?? primary100,
      backgroundColor: fill ? color ?? primary100 : 'transparent',

      ':hover': {
        color: fill ? color ?? primary100 : white,
        backgroundColor: fill ? 'transparent' : color ?? primary100,
      },
    };
  },
);
