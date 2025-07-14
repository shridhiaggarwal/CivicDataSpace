/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { IoMdCalendar } from "react-icons/io";
import { LuDownload, LuGlobe } from "react-icons/lu";
import { FaChartBar, FaFileCsv, FaFilePdf } from "react-icons/fa";
import {
  BsFiletypeXlsx,
  BsFiletypeXls,
  BsFiletypeJson,
  BsFileZip,
} from "react-icons/bs";
import { Dataset } from "@/utils/types";
import { formatDate } from "@/utils/constants";

interface IFormats {
  [key: string]: {
    icon: any;
    iconColor: string;
  };
}

interface ListDataItemProps {
  data: Dataset;
}

export default function ListDataItem(props: ListDataItemProps) {
  const {
    title,
    description,
    metadata,
    tags,
    sectors,
    formats,
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

  const getFormatDetails = (format: string) => {
    const formatInfo: IFormats = {
      CSV: {
        icon: FaFileCsv,
        iconColor: "text-green-600",
      },
      PDF: {
        icon: FaFilePdf,
        iconColor: "text-red-600",
      },
      XLSX: {
        icon: BsFiletypeXlsx,
        iconColor: "text-blue-600",
      },
      XLS: {
        icon: BsFiletypeXls,
        iconColor: "text-yellow-600",
      },
      JSON: {
        icon: BsFiletypeJson,
        iconColor: "text-purple-600",
      },
      ZIP: {
        icon: BsFileZip,
        iconColor: "text-orange-600",
      },
    };
    return (
      formatInfo[format.toUpperCase()] || {
        icon: null,
        color: "bg-gray-100 text-gray-800",
        iconColor: "text-gray-600",
      }
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[#1f5f8d] mb-4">{title}</h2>
        <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Metadata Row */}
      <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <IoMdCalendar className="w-4 h-4 text-[#b17f3d]" />
          <span>Last Updated:</span>
          <span className="font-bold">{formatDate(modified)}</span>
        </div>

        <div className="flex items-center gap-2">
          <LuDownload className="w-4 h-4 text-[#b17f3d]" />
          <span>Downloads:</span>
          <span className="font-bold">{download_count}</span>
        </div>

        <div className="flex items-center gap-2">
          <LuGlobe className="w-4 h-4 text-[#b17f3d]" />
          <span>Geography:</span>
          <span className="font-bold">{getGeography()}</span>
        </div>

        {has_charts && (
          <div className="flex items-center gap-2">
            <FaChartBar className="w-4 h-4 text-[#b17f3d]" />
            <span className="font-medium">With Charts</span>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="flex items-start gap-4 w-full">
        {/* Left Side - Sectors and Tags */}
        <div className="flex flex-col flex-wrap gap-4 w-[50%]">
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

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Tags:</span>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-4 py-1 bg-[#84dccf] text-black text-sm rounded border border-solid border-black"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Publisher and Formats */}
        <div className="flex flex-col flex-wrap gap-6 w-[50%]">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Published by:</span>
            <span className="text-sm text-gray-600 font-bold">
              {organization.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Formats:</span>
            <div className="flex gap-1 flex-wrap">
              {formats.map((format: string, index: number) => {
                const formatDetails = getFormatDetails(format);
                const IconComponent = formatDetails.icon;
                return (
                  IconComponent && (
                    <IconComponent
                      key={index}
                      className={`w-6 h-6 ${formatDetails.iconColor}`}
                    />
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
