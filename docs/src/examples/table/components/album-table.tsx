import {
  Pagination,
  PaginationList,
  PaginationListItem,
  PaginationNextPageTrigger,
  PaginationPrevPageTrigger
} from "@ark-ui/solid"
import {
  For,
  Show,
  createResource,
  createSignal,
  type Component,
  type ResourceSource
} from "solid-js"
import { Badge, Button, Indicator, Rating } from "../../../common/ui"
import { FilterIcon } from "../../../common/ui/icons"
import type { Album } from "../schemas"
import AlbumService from "../services/album-service"

const useAlbumsData = (page: ResourceSource<number>) =>
  createResource(page, (page) => AlbumService.list(page))

const formatDate = (date: string) =>
  Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(
    new Date(date)
  )

const Table: Component<{ albums: Album[]; isLoading: boolean }> = (props) => {
  return (
    <table class="min-w-[960px] w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3 sticky left-0 bg-gray-50 dark:bg-gray-700">
            Title
          </th>
          <th scope="col" class="px-6 py-3">
            Artist
          </th>
          <th scope="col" class="px-6 py-3">
            Released At
          </th>
          <th scope="col" class="px-6 py-3">
            Genres
          </th>
          <th scope="col" class="px-6 py-3">
            Rates
          </th>
        </tr>
      </thead>
      <tbody>
        <For each={props.albums}>{(album) => <Item album={album} />}</For>
      </tbody>
    </table>
  )
}

const Item: Component<{ album: Album }> = (props) => {
  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 sticky left-0 bg-white dark:bg-gray-800 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {props.album.title}
      </th>
      <td class="px-6 py-4">{props.album.artist}</td>
      <td class="px-6 py-4">{formatDate(props.album.releasedAt)}</td>
      <td class="px-6 py-4 tabular-nums">
        <div class="flex gap-1">
          <For each={props.album.genres}>{(genre) => <Badge>{genre}</Badge>}</For>
        </div>
      </td>
      <td class="px-6 py-4">
        <Rating rate={props.album.rates} />
      </td>
    </tr>
  )
}

export const AlbumTable: Component = () => {
  const [page, setPage] = createSignal(1)
  const [albums] = useAlbumsData(page)

  return (
    <div class="space-y-2">
      <div class="flex gap-1.5 justify-between">
        <div>
          <Show when={albums.loading}>
            <div class="flex gap-2 items-center">
              <Indicator />
              <span class="text-sm font-medium tracking-wider">Loading...</span>
            </div>
          </Show>
        </div>

        <Button type="button">
          <FilterIcon class="w-4 h-4" /> Filter
        </Button>
      </div>

      <div class="relative overflow-x-auto rounded">
        <Table albums={albums()?.data ?? []} isLoading={albums.loading} />
      </div>

      <div class="flex justify-end">
        <Pagination
          count={albums()?.total ?? 0}
          pageSize={10}
          siblingCount={2}
          onChange={({ page }) => setPage(page)}
        >
          {(_) => (
            <PaginationList class="flex gap-2">
              <PaginationListItem class="list-none">
                <PaginationPrevPageTrigger asChild>
                  <Button type="button">
                    Previous <span class="visually-hidden">Page</span>
                  </Button>
                </PaginationPrevPageTrigger>
              </PaginationListItem>

              <PaginationListItem class="list-none">
                <PaginationNextPageTrigger asChild>
                  <Button>
                    Next <span class="visually-hidden">Page</span>
                  </Button>
                </PaginationNextPageTrigger>
              </PaginationListItem>
            </PaginationList>
          )}
        </Pagination>
      </div>
    </div>
  )
}
