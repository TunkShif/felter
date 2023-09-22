import { describe, expect, it } from "vitest"
import { TreeRoot, Tree } from "./tree"

describe("tree", () => {
  const initial: TreeRoot = {
    type: "group",
    id: "root",
    relation: "and",
    children: [
      {
        type: "filter",
        id: "first",
        field: "foo",
        operator: "equals",
        params: "bar",
        parentId: "root"
      }
    ]
  }

  const tree = new Tree(initial)

  it("insert into parent node", () => {
    tree.insert(initial.id, 1, {
      type: "filter",
      id: "second",
      field: "bar",
      operator: "equals",
      params: "baz"
    })

    expect(tree.root).not.toBe(initial)

    tree.insert(initial.id, 0, {
      type: "group",
      id: "subgroup",
      relation: "or",
      children: []
    })

    expect(tree.root).not.toBe(initial)

    tree.insert("subgroup", 0, {
      type: "filter",
      id: "blah",
      field: "blah",
      operator: "equals",
      params: "blah"
    })

    expect(tree.root).not.toBe(initial)
  })

  it("remove node", () => {
    expect(tree.root).not.toBe(initial)
  })
})
