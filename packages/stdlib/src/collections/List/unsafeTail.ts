import type { List } from "@tsplus/stdlib/collections/List/definition";

/**
 * @tsplus fluent List unsafeTail
 */
export function unsafeTail<A>(self: List<A>): List<A> | undefined {
  if (self.isNil()) {
    return undefined;
  }
  return self.tail;
}
