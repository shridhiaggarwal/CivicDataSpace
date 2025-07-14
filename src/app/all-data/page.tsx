"use client";

import { useState, useEffect, useCallback } from "react";
import { searchDatasets } from "@/utils/api";
import { Dataset } from "@/utils/types";
import SearchBar from "@/components/SearchBar";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import { BiSort } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { OrderBy, SortBy, sortOptions, ViewMode } from "@/utils/constants";
import FilterSidebar, {
  FilterData,
  SelectedFilters,
} from "@/components/FilterSidebar";
import ListDataItem from "@/components/ListDataItem";
import CardDataItem from "@/components/CardDataItem";
import Pagination from "@/components/Pagination";

export default function AllData() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [filterData, setFilterData] = useState<FilterData>({});
  const [datasetsLoading, setDatasetsLoading] = useState(true);
  const [filtersLoading, setFiltersLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.LIST);
  const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.ASCENDING);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.RECENT);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    sectors: [],
    tags: [],
    formats: [],
    Geography: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch filter aggregations only once
  const fetchFilterAggregations = useCallback(async () => {
    try {
      setFiltersLoading(true);

      // Fetch with no filters to get all possible aggregations
      const response = await searchDatasets({
        page: 1,
        size: 1, // We only need aggregations, not the actual data
      });

      setFilterData(response.aggregations);
    } catch (err) {
      console.error("Failed to fetch filter aggregations:", err);
      // Don't set error for filter aggregations failure
    } finally {
      setFiltersLoading(false);
    }
  }, []);

  // Fetch datasets with current filters and search
  const fetchDatasets = useCallback(
    async (
      query: string,
      sort: SortBy,
      order: OrderBy,
      filters: SelectedFilters,
      rowsPerPage: number,
      page: number
    ) => {
      try {
        setDatasetsLoading(true);
        setError(null);

        const response = await searchDatasets({
          page: page,
          size: rowsPerPage,
          sort: sort.toLowerCase() as SortBy,
          order: order as OrderBy,
          query: query.trim() || undefined,
          // Pass the filter arrays
          Geography:
            filters.Geography.length > 0 ? filters.Geography : undefined,
          sectors: filters.sectors.length > 0 ? filters.sectors : undefined,
          tags: filters.tags.length > 0 ? filters.tags : undefined,
          formats: filters.formats.length > 0 ? filters.formats : undefined,
        });

        setDatasets(response.results);
        setTotalItems(response.total);
      } catch (err) {
        setError("Failed to fetch datasets");
        console.error(err);
      } finally {
        setDatasetsLoading(false);
      }
    },
    []
  );

  // Initial fetch on mount - fetch filter aggregations once
  useEffect(() => {
    fetchFilterAggregations();
  }, [fetchFilterAggregations]);

  // Fetch datasets when search, sort, order, or filters change
  useEffect(() => {
    fetchDatasets(
      searchQuery,
      sortBy,
      orderBy,
      selectedFilters,
      rowsPerPage,
      currentPage
    );
  }, [
    fetchDatasets,
    searchQuery,
    sortBy,
    orderBy,
    selectedFilters,
    rowsPerPage,
    currentPage,
  ]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters, searchQuery]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleSortChange = (value: SortBy) => {
    setSortBy(value);
    setIsDropdownOpen(false);
  };

  const handleOrderChange = () => {
    if (orderBy === OrderBy.ASCENDING) {
      setOrderBy(OrderBy.DESCENDING);
    } else {
      setOrderBy(OrderBy.ASCENDING);
    }
  };

  const onPageChange = (value: number) => {
    setCurrentPage(value);
  };

  const onRowsChange = (value: number) => {
    setRowsPerPage(value);
  };

  return (
    <div className="py-8 px-4 md:p-8">
      <div className="mb-8 flex items-center justify-between flex-wrap gap-2">
        {/* SEARCH BAR */}
        <SearchBar onSearch={handleSearch} />

        {/* GRID AND LIST VIEW MODE TOGGLE */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode(ViewMode.GRID)}
            className="cursor-pointer"
          >
            <CiGrid41
              className={`w-8 h-8 ${
                viewMode === ViewMode.GRID ? "fill-[#1f5f8d]" : "fill-gray-500"
              }`}
            />
          </button>
          <button
            onClick={() => setViewMode(ViewMode.LIST)}
            className="cursor-pointer"
          >
            <CiGrid2H
              className={`w-8 h-8 ${
                viewMode === ViewMode.LIST ? "fill-[#1f5f8d]" : "fill-gray-500"
              }`}
            />
          </button>
        </div>

        {/* ORDER BUTTON AND SORT DROPDOWN */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleOrderChange()}
            title={orderBy}
            className="cursor-pointer"
          >
            <BiSort className={`w-8 h-8 fill-[#1f5f8d]`} />
          </button>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50 min-w-[160px] justify-between cursor-pointer"
            >
              <span className="text-sm">{sortBy}</span>
              <FaChevronDown
                className={`w-3 h-3 transition-transform ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {sortOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSortChange(option)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 cursor-pointer ${
                      sortBy === option
                        ? "bg-blue-50 text-[#1f5f8d]"
                        : "text-gray-700"
                    } ${index === 0 ? "rounded-t-lg" : ""} ${
                      index === sortOptions.length - 1 ? "rounded-b-lg" : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-red-500">Error loading datasets: {error}</div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <FilterSidebar
          filterData={filterData}
          selectedFilters={selectedFilters}
          onFilterChange={setSelectedFilters}
          onClearAll={() =>
            setSelectedFilters({
              sectors: [],
              tags: [],
              formats: [],
              Geography: [],
            })
          }
          loading={filtersLoading}
        />
        <div className="flex-1 w-full max-w-full min-w-0">
          {datasetsLoading ? (
            <div className="text-gray-500">Loading datasets...</div>
          ) : (
            <div
              className={
                viewMode === ViewMode.GRID
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                  : "flex flex-col gap-6 mb-8"
              }
            >
              {datasets.map((dataset) =>
                viewMode === ViewMode.GRID ? (
                  <CardDataItem key={dataset.id} data={dataset} />
                ) : (
                  <ListDataItem key={dataset.id} data={dataset} />
                )
              )}
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            totalItems={totalItems}
            onPageChange={onPageChange}
            onRowsChange={onRowsChange}
          />
        </div>
      </div>
    </div>
  );
}
