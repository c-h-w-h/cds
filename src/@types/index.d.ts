declare type TextNode = Exclude<
  React.ReactNode,
  number | boolean | React.ReactPortal | null | undefined
>;
