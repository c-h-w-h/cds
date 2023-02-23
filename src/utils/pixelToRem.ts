export const pixelToRem = (str: PixelString) => {
  const tokens = str.split(/(\d+px)/);

  const converter = (pre: string, cur: string) => {
    if (/\d+px/.test(cur)) {
      const value = Number(/\d+/.exec(cur));
      return pre + `${value / 16}rem`;
    }

    return pre + cur;
  };

  return tokens.reduce(converter, '');
};

type PixelString = `${Pre}${number}px${Post}`;
type Pre = `${string} ` | '';
type Post = ` ${string}` | '';
