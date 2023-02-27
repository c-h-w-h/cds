export const pixelToRem = (str: PixelString) => {
  const tokens = str.split(/(\d+px)/);

  const reducer = (pre: string, cur: string) => {
    if (/\d+px/.test(cur)) {
      const value = Number(/\d+/.exec(cur));

      return pre + `${converter(value)}rem`;
    }

    return pre + cur;
  };

  return tokens.reduce(reducer, '');
};

const converter = (value: number) => {
  const mod = value % 16;

  switch (true) {
    case mod < 4:
      return Math.floor(value / 16);
    case mod >= 4 && mod < 8:
      return Math.floor(value / 16) + 0.25;
    case mod >= 12:
      return Math.ceil(value / 16) - 0.25;
    default:
      return Math.ceil(value / 16) - 0.5;
  }
};

type PixelString = `${Pre}${number}px${Post}`;
type Pre = `${string} ` | '';
type Post = ` ${string}` | '';
