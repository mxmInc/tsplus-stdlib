import type { validSym } from "@tsplus/runtime/Brand"
import { expectTypeEqual } from "@tsplus/runtime/test/00.utils"
import { right } from "@tsplus/stdlib/data/Either"
import type * as $tsb from "ts-toolbelt"
import { describe, expect, it } from "vitest"

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

describe("typeFn Unbranded<P>", () => {
  it("must", () => {
    type _I۰A = { a: "A" }
    type _I۰K = "brandname"
    type _I = Brand.Validated<_I۰A, _I۰K>

    type _R = Brand.Unbranded<_I>
    type _Rʼ = $tsb.A.Compute<_R>
    type _X = $tsb.A.Compute<{
      a: "A"
    }>
    expectTypeEqual<_Rʼ, _X>(true)
  })

  it("must", () => {
    type _I = string

    type _R = Brand.Unbranded<_I>
    type _Rʼ = $tsb.A.Compute<_R>

    type _X = string

    expectTypeEqual<_Rʼ, _X>(true)
  })
})

describe("typeFn Brands<P>", () => {
  it("must", () => {
    type _I = Brand.Validated<{ a: "A" }, "ruleA"> & Brand.Validated<{ b: "B" }, "ruleB">

    type _R = Brand.Brands<_I>
    type _Rʼ = $tsb.A.Compute<_R>
    type _X = $tsb.A.Compute<{
      [validSym]: {
        ruleA: { a: "A" }
        ruleB: { b: "B" }
      }
    }>
    expectTypeEqual<_Rʼ, _X>(true)
  })

  it("must۰handle", () => {
    type _I = string

    type _R = Brand.Brands<_I>
    type _Rʼ = $tsb.A.Compute<_R>

    type _X = {}

    expectTypeEqual<_Rʼ, _X>(true)
  })
})

describe("const Brand.ValidateWith<P>", () => {
  it("must", () => {
    const _I = Brand.validation<number, "Int">((n) => Number.isInteger(n))
    type _I = Brand.ValidatedWith<typeof _I>
    const _i: Make<_I> = Derive()
    const _r = _i.make(123)
    const _x = right(123)

    expect(_r).toEqual(_x)
  })

  it("must۰handle", () => {
    type _I = string
    const _i: Make<_I> = Derive()
    const _r = _i.make("123")
    const _x = "123"

    expect(_r).toEqual(_x)
  })
})
