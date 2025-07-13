import { ApiResponse, SearchParams } from './types';

const BASE_URL = 'https://api.datakeep.civicdays.in/api/search/dataset/';

export const searchDatasets = async (params: SearchParams): Promise<ApiResponse> => {
  try {
    // Build query parameters
    const searchParams = new URLSearchParams();
    
    if (params.query) searchParams.append('query', params.query);
    if (params.Geography) searchParams.append('Geography', params.Geography);
    if (params.sectors) searchParams.append('sectors', params.sectors);
    if (params.tags) searchParams.append('tags', params.tags);
    if (params.formats) searchParams.append('formats', params.formats);
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.size) searchParams.append('size', params.size.toString());
    if (params.sort) searchParams.append('sort', params.sort);
    if (params.order) searchParams.append('order', params.order);

    const response = await fetch(`${BASE_URL}?${searchParams.toString()}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching datasets:', error);
    throw error;
  }
};