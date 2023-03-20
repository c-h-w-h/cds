import { CAROUSEL_SLIDE } from '@constants/carouselSlide';
import styled from '@emotion/styled';
import { pixelToRem } from '@utils/pixelToRem';
import { DefaultPropsWithChildren } from '@utils/types/DefaultPropsWithChildren';

const { WIDTH, HEIGHT, GAP } = CAROUSEL_SLIDE.large;

const Card = ({ children }: DefaultPropsWithChildren<HTMLDivElement>) => (
  <ItemView>{children}</ItemView>
);

const ItemView = styled.div`
  display: flex;
  flex-direction: column;
  width: ${pixelToRem(`${WIDTH}px`)};
  height: ${pixelToRem(`${HEIGHT}px`)};
  margin-right: ${pixelToRem(`${GAP}px`)};
  transform: translateX(${pixelToRem('10px')});
  background-color: ${({ theme }) => theme.color.white};
  img {
    width: 100%;
    height: ${pixelToRem(`${WIDTH}px`)};
    border: 1px solid ${({ theme }) => theme.color.gray100};
    border-radius: 10px;
    margin-bottom: 10px;
  }
  p {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

export default Card;
