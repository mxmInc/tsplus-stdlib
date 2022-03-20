import { List } from "@tsplus/stdlib/collections/List"
import { describe, expect, it } from "vitest"

describe("List", () => {
  it("concat", () => {
    expect(Array.from(List(0, 1, 2) + List(3, 4, 5))).toEqual([0, 1, 2, 3, 4, 5])
  })
  it("prepend", () => {
    expect(Array.from(2 + List(3, 4, 5))).toEqual([2, 3, 4, 5])
  })
  it("builder", () => {
    const builder = List.builder<number>()
    builder.append(0)
    builder.append(1)
    builder.append(2)
    expect(Array.from(builder.build())).toEqual([0, 1, 2])
  })
})