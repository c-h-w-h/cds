import { Context, useContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useSafeContext: <T extends Context<any>>(
  Context: T,
) => T extends Context<infer U> ? Exclude<U, null> : never = (Context) => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('CDS 컴포넌트에 필요한 컨텍스트가 없어요!');
  }

  return context;
};

export default useSafeContext;
