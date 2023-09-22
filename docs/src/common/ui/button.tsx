import type { ComponentProps, ParentComponent } from "solid-js"

export const Button: ParentComponent<ComponentProps<"button">> = (props) => {
  return (
    <button
      {...props}
      class="py-1.5 px-2.5 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-sky-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus-visible:ring-offset-gray-800 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
    />
  )
}
