import type { Component, ComponentProps } from "solid-js"

export const Badge: Component<ComponentProps<"span">> = (props) => {
  return (
    <span
      {...props}
      class="inline-flex items-center py-1 px-2 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
    />
  )
}
