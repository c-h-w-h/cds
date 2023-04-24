import { COLOR } from '@constants/color';

import { IconProps, scaledSizeStyle } from './common';

const CdsHome = ({ size = 24, color = COLOR.black }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      css={scaledSizeStyle(24, size)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 18V15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0703 2.81985L3.14027 8.36985C2.36027 8.98985 1.86027 10.2998 2.03027 11.2798L3.36027 19.2398C3.60027 20.6598 4.96027 21.8098 6.40027 21.8098H17.6003C19.0303 21.8098 20.4003 20.6498 20.6403 19.2398L21.9703 11.2798C22.1303 10.2998 21.6303 8.98985 20.8603 8.36985L13.9303 2.82985C12.8603 1.96985 11.1303 1.96985 10.0703 2.81985Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CdsHome;
