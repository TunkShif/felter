import solidJs from "@astrojs/solid-js"
import starlight from "@astrojs/starlight"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Felter Docs",
      social: {
        github: "https://github.com/TunkShif/felter"
      },
      sidebar: [
        {
          label: "Examples",
          items: [
            {
              label: "Table Filter",
              link: "/examples/table"
            }
          ]
        },
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: "Example Guide",
              link: "/guides/example/"
            }
          ]
        },
        {
          label: "Reference",
          autogenerate: {
            directory: "reference"
          }
        }
      ],
      customCss: ["./src/styles/tailwind.css", "./src/styles/custom.css"]
    }),
    tailwind({
      applyBaseStyles: false
    }),
    solidJs()
  ]
})
