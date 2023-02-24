import { COLOR } from '@constants/color';
import { TYPOGRAPHY } from '@constants/typography';
import { CSSProperties } from '@emotion/serialize';
import styled from '@emotion/styled';

type Color = keyof typeof COLOR;

/**
 * @name tableCommonStyle: 기본 스타일
 */
const tableCommontyle = styled.table<{
  textColor?: Color;
  backgroundColor?: Color;
}>(({ textColor, backgroundColor }) => {
  return {
    color: textColor ? COLOR[textColor] : 'inherit',
    backgroundColor: backgroundColor ? COLOR[backgroundColor] : 'inherit',
    fontSize: TYPOGRAPHY.desc.size,
    borderCollapse: 'collapse',
  };
});

/**
 * @name tableDataStyle: th, td 스타일을 디테일하게 적용
 */
const tableDataStyle = styled(tableCommontyle.withComponent('td'))<{
  textAlign?: CSSProperties['textAlign'];
  fontWeight?: CSSProperties['fontWeight'];
}>(({ textAlign = 'center', fontWeight = 400 }) => {
  return {
    borderCollapse: 'collapse',
    textAlign,
    fontWeight,
  };
});

/**
 * @name Table
 * @prop {outline}: true일 경우 table의 테두리 표시
 * @prop {rounded}: true일 경우 borderRadius 6px로 설정
 */
export const Table = styled(tableCommontyle.withComponent('table'))<{
  outline?: boolean;
  rounded?: boolean;
}>(({ outline = false, rounded = false }) => {
  return {
    width: '100%',
    outline: outline ? `1px solid ${COLOR.gray200}` : 'none',
    outlineOffset: -1,
    borderRadius: rounded ? 6 : 0,

    overflow: 'hidden',

    'th, td': {
      padding: 10,
      border: outline ? `1px solid ${COLOR.gray200}` : 'none',
    },
  };
});

export const TableHead = styled(tableCommontyle.withComponent('thead'))();
export const TableBody = styled(tableCommontyle.withComponent('tbody'))();
export const TableRow = styled(tableCommontyle.withComponent('tr'))();

export const TableHeadData = styled(tableDataStyle.withComponent('th'))(
  ({ fontWeight = 'bold' }) => {
    return {
      fontWeight,
    };
  },
);
export const TableBodyData = styled(tableDataStyle.withComponent('td'))();
