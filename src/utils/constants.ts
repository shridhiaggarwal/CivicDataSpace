export enum HEADER {
  ALL_DATA = "all-data",
  SECTORS = "sectors",
  USE_CASES = "use-cases",
  PUBLISHERS = "publishers",
  ABOUT_US = "about-us",
  SEARCH = "search",
  LOGIN = "login",
}

export enum ViewMode {
  GRID = "grid",
  LIST = "list",
}

export enum SortBy {
  RECENT = "recent",
  ALPHABETICAL = "alphabetical",
}

export enum OrderBy {
  ASCENDING = "asc",
  DESCENDING = "desc",
}

export const sortOptions = [SortBy.RECENT, SortBy.ALPHABETICAL];

export enum FilterOptions {
    SECTORS = "sectors",
    TAGS = "tags",
    FORMATS = "formats",
    GEOGRAPHY = "Geography",
}
