export const pixelToRem = (str: string) => {
  if (!str.includes('px')) return str;

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
  return value % 2 ? (value + 1) / 16 : value / 16;
};
