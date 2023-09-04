// Memoize

type Memoizable = string | number | boolean | null | undefined;

function memoize<Args extends any[], Ret>(
  this: any,
  target: (...args: Args) => Ret,
  context: any
): TypedPropertyDescriptor<(...args: Args) => Ret> {
  throw new Error("Not implemented");
}
