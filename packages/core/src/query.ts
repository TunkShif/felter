import { observable, uniqueId } from "./helper"

export type Relation = "and" | "or"

export type Field = {
  type: "field"
  id: string
  availableOperators: string[]
}

export type Operator<T = unknown> = {
  type: "operator"
  id: string
  defaultParams: T
}

export type FilterItem = FilterRule | FilterGroup

export type FilterRule<T = unknown> = {
  type: "filter-rule"
  id: string
  field: string
  operator: string
  params: T
}

export type FilterGroup = {
  type: "filter-group"
  id: string
  parent?: FilterGroup
  relation: Relation
  items: FilterItem[]
}

export const isFilterRule = (item: FilterItem): item is FilterRule => item.type === "filter-rule"

export const isFilterGroup = (item: FilterItem): item is FilterGroup => item.type === "filter-group"

export const newFilterRule = (): FilterRule => ({
  type: "filter-rule",
  id: uniqueId(),
  field: "",
  operator: "",
  params: null
})

export const newFilterGroup = (parent?: FilterGroup): FilterGroup => ({
  type: "filter-group",
  id: uniqueId(),
  relation: "and",
  items: [],
  parent
})

export type FilterGroupStoreActions = {
  setRelation(relation: Relation): void
  addFilter(): void
  addGroup(): void
}

export const newFilterGroupStore = (group: FilterGroup) => {
  const state = observable(group)
  const actions: FilterGroupStoreActions = {
    setRelation(relation) {
      state.setState((s) => (s.relation = relation))
    },
    addFilter() {
      state.setState((s) => s.items.push(newFilterRule()))
    },
    addGroup() {
      state.setState((s) => s.items.push(newFilterGroup(group)))
    }
  }
  return [state, actions] as const
}

export type FilterRuleStoreActions = {}

export const newFilterRuleStore = (rule: FilterRule) => {
  const state = observable(rule)
  const actions: FilterRuleStoreActions = {}
  return [state, actions] as const
}
