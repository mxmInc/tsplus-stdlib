import type { TypeEqual } from "ts-expect"
import { expectType } from "ts-expect"
import type * as $tsb from "ts-toolbelt"

export function expectTypeEqual<ResultType, ExpectType>(
  val: TypeEqual<$tsb.A.Compute<ResultType>, $tsb.A.Compute<ExpectType>>
) {
  return expectType<TypeEqual<$tsb.A.Compute<ResultType>, $tsb.A.Compute<ExpectType>>>(val)
}
