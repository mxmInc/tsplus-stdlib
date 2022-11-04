import type { Brand, validSym } from "@tsplus/runtime/Brand"
import { expectTypeEqual } from "@tsplus/runtime/test/00.utils"
import type * as $tsb from "ts-toolbelt"
import { describe, it } from "vitest"

describe("type Validated<A,K>", () => {
  it("must", () => {
    type _I۰A = { a: "A" }
    type _I۰K = "brandname"
    type _R = Brand.Validated<_I۰A, _I۰K>
    type _Rʼ = $tsb.A.Compute<_R>
    type _X = $tsb.A.Compute<{
      [validSym]: { brandname: { a: "A" } }
      a: "A"
    }>
    expectTypeEqual<_Rʼ, _X>(true)
  })
})

describe("typeFn IsValidated<P>", () => {
  it("must", () => {
    type _I۰A = { a: "A" }
    type _I۰K = "brandname"
    type _I = Brand.Validated<_I۰A, _I۰K>

    type _R = Brand.IsValidated<_I>
    type _Rʼ = $tsb.A.Compute<_R>
    type _X = unknown
    expectTypeEqual<_Rʼ, _X>(true)
  })

  it("must۰Fail", () => {
    type _I = string

    // @ts-expect-error
    type _R = Brand.IsValidated<_I>
    type _Rʼ = $tsb.A.Compute<_R>

    type _X = unknown
    expectTypeEqual<_Rʼ, _X>(true)
  })
})

describe("type Unbranded<P>", () => {
  it("must", () => {
    type _I۰A = { a: "A" }
    type _I۰K = "brandname"
    type _R = Brand.Validated<_I۰A, _I۰K>
    type _Rʼ = $tsb.A.Compute<_R>
    type _X = $tsb.A.Compute<{
      [validSym]: { brandname: { a: "A" } }
      a: "A"
    }>
    expectTypeEqual<_Rʼ, _X>(true)
  })
})
