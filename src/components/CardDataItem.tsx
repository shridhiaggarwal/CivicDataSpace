/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { IoMdCalendar } from "react-icons/io";
import { LuDownload, LuGlobe } from "react-icons/lu";
import { FaChartBar } from "react-icons/fa";
import { Dataset } from "@/utils/types";
import { formatDate } from "@/utils/constants";

interface CardDataItemProps {
  data: Dataset;
}

export default function CardDataItem(props: CardDataItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    title,
    description,
    metadata,
    sectors,
    organization,
    modified,
    download_count,
    has_charts,
  } = props.data;

  const getGeography = () => {
    const geoMetadata = metadata.find(
      (item: any) => item.metadata_item.label === "Geography"
    );
    return geoMetadata ? geoMetadata.value : "-";
  };

  // Function to check if description is longer than 4 lines (approximate)
  const isDescriptionLong = () => {
    return description.length > 80 * 4;
  };

  const shouldShowToggle = isDescriptionLong();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md cursor-pointer">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#1f5f8d] mb-3 leading-tight">
          {title}
        </h2>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <IoMdCalendar className="w-4 h-4 text-[#b17f3d]" />
            <span>{formatDate(modified)}</span>
          </div>

          <div className="flex items-center gap-1">
            <LuDownload className="w-4 h-4 text-[#b17f3d]" />
            <span>{download_count}</span>
          </div>

          <div className="flex items-center gap-1">
            <LuGlobe className="w-4 h-4 text-[#b17f3d]" />
            <span>{getGeography()}</span>
          </div>
        </div>

        {/* Description */}
        <div className="text-gray-700 text-sm leading-relaxed">
          <p className={shouldShowToggle && !isExpanded ? "line-clamp-4" : ""}>
            {description}
          </p>
          {shouldShowToggle && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#1f5f8d] hover:text-[#1f5f8d] text-sm font-medium mt-1 transition-colors"
            >
              {isExpanded ? "See less" : "See more"}
            </button>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col justify-between gap-2">
        {/* Sectors */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sectors:</span>
          <div className="flex gap-2 flex-wrap">
            {sectors.map((sector: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-4 py-1 bg-orange-100 text-orange-800 text-sm rounded"
              >
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                {sector}
              </span>
            ))}
          </div>
        </div>

        {/* Charts Icon */}
        {has_charts && <FaChartBar className="w-5 h-5 text-[#b17f3d]" />}

        {/* Publisher */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Published by:</span>
          <span className="text-sm text-gray-600 font-bold">
            {organization.name}
          </span>
        </div>
      </div>
    </div>
  );
}
