import {
  ImageSizeVariant,
  ImageShapeVariant,
  IMAGE_SIZE,
  IMAGE_SHAPE,
} from '@constants/image';
import styled from '@emotion/styled';
import { DefaultProps } from '@utils/types/DefaultProps';

type ImageSizeProps = `${ImageSizeVariant}`;
type ImageShapeProps = `${ImageShapeVariant}`;

interface ImageProps extends DefaultProps<HTMLImageElement> {
  src: string;
  alt: string;
  size: ImageSizeProps;
  shape?: ImageShapeProps;
}

const Image = ({ src, alt, size, shape }: ImageProps) => {
  return <ImageContainer {...{ src, alt, size, shape }} />;
};

export default Image;

const ImageContainer = styled.img<ImageProps>`
  width: ${({ size }) => IMAGE_SIZE[size]};
  border-radius: ${({ shape }) => (shape ? IMAGE_SHAPE[shape] : 0)};
  aspect-ratio: 1 / 1;
`;
