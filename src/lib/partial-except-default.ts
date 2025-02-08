export type PartialExceptDefault<T extends { default: object }> = Partial<T> & {
  default: T["default"];
};
