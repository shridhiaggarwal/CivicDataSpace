import { OrderBy, SortBy } from "./constants";

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
  sort?: SortBy;
  order?: OrderBy;
  page?: number;
  size?: number;
  Geography?: string[];
  sectors?: string[];
  tags?: string[];
  formats?: string[];
}