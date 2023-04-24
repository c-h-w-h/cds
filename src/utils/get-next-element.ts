export const getNextElement: <T>(
  array: T[],
  currentIndex: number,
  step?: number,
) => T = (array, currentIndex, step = 1) => {
  let nextIndex = currentIndex + step;

  while (nextIndex < 0) {
    nextIndex += array.length;
  }

  while (array.length <= nextIndex) {
    nextIndex -= array.length;
  }

  return array[nextIndex];
};
