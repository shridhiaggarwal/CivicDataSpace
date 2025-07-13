"use client";

import { useState, useEffect, useCallback } from "react";
import { searchDatasets } from "@/utils/api";
import { Dataset } from "@/utils/types";
import SearchBar from "@/components/SearchBar";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import { BiSort } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { OrderBy, SortBy, sortOptions, ViewMode } from "@/utils/constants";
import FilterSidebar, { FilterData, SelectedFilters } from "@/components/FilterSidebar";

export default function AllData() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [filterData, setFilterData] = useState<FilterData>({});
  const [loading, setLoading] = useState(true);
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

  // Fetch data function
  const fetchData = useCallback(
    async (query: string, sort: SortBy, order: OrderBy) => {
      try {
        setLoading(true);
        setError(null);

        const response = await searchDatasets({
          page: 1,
          size: 20,
          sort: sort.toLowerCase() as SortBy,
          order: order as OrderBy,
          query: query.trim() || undefined,
        });

        console.log("API Response:", response);
        setDatasets(response.results);
        setFilterData(response.aggregations);
      } catch (err) {
        setError("Failed to fetch datasets");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Initial fetch on mount
  useEffect(() => {
    fetchData(searchQuery, sortBy, orderBy);
  }, [fetchData, searchQuery, sortBy, orderBy]);

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

      <div className="space-y-4">
        {loading ? (
          <div className="text-gray-500">Loading datasets...</div>
        ) : (
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
              loading={loading}
            />
            <div className="flex flex-col">
              {datasets.map((dataset) => (
                <div key={dataset.id} className="border p-4 rounded">
                  <h3 className="font-semibold">{dataset.title}</h3>
                  <p className="text-gray-600">{dataset.description}</p>
                  <p className="text-sm text-gray-500">
                    Organization: {dataset.organization.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
