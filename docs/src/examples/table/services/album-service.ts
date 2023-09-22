import { db } from "../database"

const PAGE_SIZE = 10

const AlbumService = {
  async list(page: number) {
    const [albums, total] = await Promise.all([
      db.albums
        .offset((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .toArray(),
      db.albums.count()
    ])

    return {
      total: total,
      data: albums
    }
  }
}

export default AlbumService
