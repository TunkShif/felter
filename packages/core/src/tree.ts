import { uniqueId } from "./helper"

export type Id = string

export type Relation = "and" | "or"

export type TreeRoot = GroupNode

export type TreeNode = GroupNode | FilterNode

export type GroupNode = {
  type: "group"
  id: Id
  parentId?: Id
  relation: Relation
  children: TreeNode[]
}

export type FilterNode = {
  type: "filter"
  id: Id
  parentId?: Id
  field: string
  operator: string
  params: unknown
}

export type Field = {
  type: "field"
  id: Id
  availableOperators: string[]
}

export type Operator = {
  type: "operator"
  id: Id
  defaultParams: unknown
}

export type CreateTreeOptions = {
  initial?: TreeRoot
}

export class Tree {
  private _map = new Map<Id, TreeNode>()
  private _root: TreeRoot

  constructor(initial?: TreeRoot) {
    this._root = initial ?? {
      type: "group",
      id: uniqueId(),
      relation: "and",
      children: []
    }
    this._addNode(this._root)
  }

  inspect() {
    for (const e of this._map.entries()) {
      console.log(e)
    }
  }

  private _addNode(node: TreeNode) {
    this._map.set(node.id, node)
    if (node.type === "group") {
      node.children.forEach((child) => this._addNode(child))
    }
  }

  private _deleteNode(node: TreeNode) {
    this._map.delete(node.id)
    if (node.type === "group") {
      node.children.forEach((child) => this._deleteNode(child))
    }
  }

  private _updateTree(nodeId: Id, update: (node: TreeNode) => TreeNode | null) {
    let node = this._map.get(nodeId)
    if (!node) throw new Error("Node not found!")

    let newNode = update(node)
    if (newNode === null) {
      this._deleteNode(node)
    } else {
      this._addNode(newNode)
    }

    while (node.parentId) {
      let nextParent = this._map.get(node.parentId) as GroupNode
      let copy = {
        ...nextParent
      }

      let children = nextParent.children
      if (newNode === null) {
        children = children.filter((child) => child !== node)
      }
      copy.children = children.map((child) => (child === node ? newNode! : child))
      this._map.set(copy.id, copy)

      newNode = copy
      node = nextParent
    }

    this._root = this._map.get(node.id) as TreeRoot
  }

  get root() {
    return this._root
  }

  insert(parentId: Id, index: number, node: TreeNode & { parentId?: Id }) {
    node.parentId = parentId

    this._updateTree(parentId, (parentNode) => {
      if (parentNode.type === "filter") return parentNode
      return {
        ...parentNode,
        children: [
          ...parentNode.children.slice(0, index),
          node,
          ...parentNode.children.slice(index)
        ]
      }
    })

    return this
  }

  append(parentId: Id, node: TreeNode & { parentId?: Id }) {
    node.parentId = parentId

    let parentNode = this._map.get(parentId)
    if (!parentNode || parentNode.type !== "group") throw new Error("Parent not found!")

    this.insert(parentId, parentNode.children.length, node)

    return this
  }

  update(id: Id, node: TreeNode & {parentId?: Id, id?: Id}) {

  }

  remove(id: Id) {
    this._updateTree(id, () => null)

    return this
  }
}
