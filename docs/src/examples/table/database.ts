import Dexie, { type Table } from "dexie"
import albums from "./albums.json"
import type { Album } from "./schemas"

const HAS_SEDDED_KEY = "hasDatabaseSeeded"

export class Database extends Dexie {
  albums!: Table<Album>

  constructor() {
    super("db")
    this.version(1).stores({
      albums: "++id, title, artist, releasedAt, genres, rates"
    })
    this._trySeeding()
  }

  private _trySeeding() {
    const hasSeeded = Boolean(localStorage.getItem(HAS_SEDDED_KEY))
    if (!hasSeeded) {
      this.albums.bulkAdd(albums)
      localStorage.setItem(HAS_SEDDED_KEY, "true")
    }
  }
}

export const db = new Database()
