/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderBy, SortBy } from "./constants";

export interface Dataset {
  id: string;
  title: string;
  description: string;
  metadata: any;
  tags: string[];
  sectors: string[];
  formats: string[];
  organization: {
    name: string;
  };
  modified: string;
  download_count: string;
  has_charts: boolean;
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
