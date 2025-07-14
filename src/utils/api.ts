import { ApiResponse, SearchParams } from "./types";

const BASE_URL = "https://api.datakeep.civicdays.in/api/search/dataset/";

export const searchDatasets = async (
  params: SearchParams
): Promise<ApiResponse> => {
  try {
    // Build query parameters
    const searchParams = new URLSearchParams();

    //search
    if (params.query) searchParams.append("query", params.query);
    //sort and order
    if (params.sort) searchParams.append("sort", params.sort);
    if (params.order) searchParams.append("order", params.order);

    //pagination
    if (params.page) searchParams.append("page", params.page.toString());
    if (params.size) searchParams.append("size", params.size.toString());

    // Handle filter arrays - Comma-separated values
    if (params.Geography && params.Geography.length > 0) {
      searchParams.append("Geography", params.Geography.join(","));
    }

    if (params.sectors && params.sectors.length > 0) {
      searchParams.append("sectors", params.sectors.join(","));
    }

    if (params.tags && params.tags.length > 0) {
      searchParams.append("tags", params.tags.join(","));
    }

    if (params.formats && params.formats.length > 0) {
      searchParams.append("formats", params.formats.join(","));
    }

    const queryString = searchParams.toString();
    console.log("API Query String:", queryString);
    const response = await fetch(`${BASE_URL}?${queryString}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching datasets:", error);
    throw error;
  }
};
