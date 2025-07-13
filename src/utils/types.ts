export interface Dataset {
  id: string;
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: any;
  tags: string[];
  sectors: string[];
  formats: string[];
  organization: {
    name: string;
  };
  geography: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  results: Dataset[];
  total: number;
  aggregations: {
    Geography: { [key: string]: number };
    sectors: { [key: string]: number };
    tags: { [key: string]: number };
    formats: { [key: string]: number };
  };
}

export interface SearchParams {
  query?: string;
  Geography?: string;
  sectors?: string;
  tags?: string;
  formats?: string;
  page?: number;
  size?: number;
  sort?: "recent" | "alphabetical";
  order?: "asc" | "desc";
}

export enum HEADER {
  ALL_DATA = "all-data",
  SECTORS = "sectors",
  USE_CASES = "use-cases",
  PUBLISHERS = "publishers",
  ABOUT_US = "about-us",
  SEARCH = "search",
  LOGIN = "login",
}

// Define the breadcrumb item type
export interface BreadcrumbItem {
  name: string;
  href: string;
  isLast?: boolean;
}
