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
  color = '#1493FF',
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
  ({ outline, color, fill }) => ({
    width: 'fit-content',
    padding: '8px 12px',
    borderRadius: 30,
    border: outline ? `1px solid ${color}` : 'none',
    color: fill ? 'white' : color,
    backgroundColor: fill ? color : 'transparent',

    ':hover': {
      color: fill ? color : 'white',
      backgroundColor: fill ? 'transparent' : color,
    },
  }),
);
