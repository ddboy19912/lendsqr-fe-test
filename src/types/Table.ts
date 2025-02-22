export type DeepKeyof<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${DeepKeyof<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;
