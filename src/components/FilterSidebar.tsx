/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterOptions } from "@/utils/constants";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

// TypeScript Interfaces
interface FilterItem {
  [key: string]: number;
}

export interface FilterData {
  Geography?: FilterItem;
  sectors?: FilterItem;
  tags?: FilterItem;
  formats?: FilterItem;
}

export interface SelectedFilters {
  Geography: string[];
  sectors: string[];
  tags: string[];
  formats: string[];
}

interface FilterConfig {
  key: FilterOptions;
  title: string;
  maxVisible: number;
}

interface FilterBlockProps {
  title: string;
  items: FilterItem;
  selectedItems: string[];
  onItemToggle: (item: string) => void;
  maxVisible?: number;
}

interface FilterSidebarProps {
  filterData: FilterData;
  selectedFilters: SelectedFilters;
  onFilterChange: (value: any) => void;
  onClearAll: () => void;
  loading?: boolean;
}

// Filter Block Component
function FilterBlock(props: FilterBlockProps) {
  const { title, items, selectedItems, onItemToggle, maxVisible = 5 } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const itemEntries = Object.entries(items || {});
  const visibleItems = showAll ? itemEntries : itemEntries.slice(0, maxVisible);
  const hasMore = itemEntries.length > maxVisible;

  if (itemEntries.length === 0) {
    return null;
  }

  return (
    <div className=" mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded px-4 py-2"
      >
        <span>{title}</span>
        {isExpanded ? (
          <FaMinus className="w-4 h-4 text-gray-500" />
        ) : (
          <FaPlus className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-3 px-4 space-y-2">
          {visibleItems.map(([key, count]) => (
            <label key={key} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedItems.includes(key)}
                onChange={() => onItemToggle(key)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 group-hover:text-gray-900 flex-1">
                {key}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {count}
              </span>
            </label>
          ))}

          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-[#1f5f8d] font-medium"
            >
              {showAll
                ? "Show Less"
                : `Show ${itemEntries.length - maxVisible} More`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Main Filter Sidebar Component
export default function FilterSidebar(props: FilterSidebarProps) {
  const {
    filterData,
    selectedFilters,
    onFilterChange,
    onClearAll,
    loading = false,
  } = props;
  const filterConfig: FilterConfig[] = [
    { key: FilterOptions.SECTORS, title: "Sectors", maxVisible: 5 },
    { key: FilterOptions.TAGS, title: "Tags", maxVisible: 5 },
    { key: FilterOptions.FORMATS, title: "Data Type", maxVisible: 5 },
    { key: FilterOptions.GEOGRAPHY, title: "Geography", maxVisible: 5 },
  ];

  const handleItemToggle = (
    filterType: keyof SelectedFilters,
    item: string
  ) => {
    const currentItems = selectedFilters[filterType] || [];
    const newItems = currentItems.includes(item)
      ? currentItems.filter((i) => i !== item)
      : [...currentItems, item];

    onFilterChange(filterType, newItems);
  };

  const getTotalSelectedCount = (): number => {
    return Object.values(selectedFilters).reduce(
      (total, items) => total + items.length,
      0
    );
  };

  if (loading) {
    return (
      <div className="w-64 bg-white p-4 border-r border-gray-200 h-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">FILTERS</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded"></div>
                <div className="h-4 bg-gray-100 rounded"></div>
                <div className="h-4 bg-gray-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[300px] bg-white p-4 border-r border-gray-200 shadow-xl rounded-lg h-full overflow-y-auto shrink-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-[#1f5f8d]">FILTERS</h2>
        {getTotalSelectedCount() > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-[#fdb557] font-medium"
          >
            RESET
          </button>
        )}
      </div>

      {filterConfig.map(({ key, title, maxVisible }) => (
        <FilterBlock
          key={key}
          title={title}
          items={filterData[key] || {}}
          selectedItems={selectedFilters[key] || []}
          onItemToggle={(item) => handleItemToggle(key, item)}
          maxVisible={maxVisible}
        />
      ))}
    </div>
  );
}
