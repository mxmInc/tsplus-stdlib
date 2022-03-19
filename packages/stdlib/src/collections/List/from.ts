import { List } from "@tsplus/stdlib/collections/List/definition"

/**
 * Constructs a new `List` from an `Iterable`
 *
 * @tsplus static ListOps from
 */
export function from<A>(prefix: Iterable<A>): List<A> {
  const iter = prefix[Symbol.iterator]()
  let a: IteratorResult<A>
  if (!(a = iter.next()).done) {
    const result = List.cons(a.value, List.nil())
    let curr = result
    while (!(a = iter.next()).done) {
      const temp = List.cons(a.value, List.nil())
      curr.tail = temp
      curr = temp
    }
    return result
  } else {
    return List.nil()
  }
}
