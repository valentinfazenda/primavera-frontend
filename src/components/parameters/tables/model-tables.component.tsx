"use client";

import chart from "@/assets/svg/chart-network.svg";
import { Switch } from "antd"; // Importing Ant Design Switch
import Image from "next/image";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faPen } from '@fortawesome/pro-light-svg-icons'; // Import Font Awesome icons
import Link from "next/link";

interface DataType {
  key: React.Key;
  name: string; // Model Name
  tokenUsed: number; // Token used last month
  runned: number; // Runned
  apiKey: string; // Dotted API Key
  isActive: boolean; // New field for active status
}

const initialData: DataType[] = [
  {
    key: "1",
    name: "Gpt-4o",
    tokenUsed: 20,
    runned: 30,
    apiKey: "123.456.789.0", // Dotted API Key
    isActive: true,
  },
  {
    key: "2",
    name: "Gemini",
    tokenUsed: 30,
    runned: 50,
    apiKey: "987.654.321.0", // Dotted API Key
    isActive: false,
  },
];

const ModelsTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>(initialData);
  const [sortOrder, setSortOrder] = useState<{ [key: string]: "asc" | "desc" }>({
    serialNo: "asc", // Added sort order for serial number
    name: "asc", // Added sort order for name column
    tokenUsed: "asc",
    runned: "asc",
    apiKey: "asc",
  });

  const handleSort = (column: keyof DataType | "serialNo") => {
    const newSortOrder = sortOrder[column] === "asc" ? "desc" : "asc";
    const sortedData = [...data].sort((a, b) => {
      if (column === "serialNo") {
        return newSortOrder === "asc"
          ? a.key < b.key
            ? -1
            : 1
          : a.key > b.key
          ? -1
          : 1;
      }
      if (newSortOrder === "asc") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });

    setData(sortedData);
    setSortOrder({ ...sortOrder, [column]: newSortOrder });
  };

  const handleActiveChange = (key: React.Key) => {
    const updatedData = data.map((item) =>
      item.key === key ? { ...item, isActive: !item.isActive } : item
    );
    setData(updatedData);
  };

  return (
    <>
      {/* Header Row */}
      <div className="flex items-center justify-between gap-2 py-2 px-3">
        <div onClick={() => handleSort("serialNo")} className="min-w-[30px] table_row">
          #
          <span className="ml-2">
            <FontAwesomeIcon icon={faCaretUp} />
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </div>
        <div onClick={() => handleSort("name")} className="min-w-[150px] table_row">
          Model Name
          <span className="ml-2">
            <FontAwesomeIcon icon={faCaretUp} />
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </div>
        <div onClick={() => handleSort("tokenUsed")} className="min-w-[150px] table_row">
          Token Used
          <span className="ml-2">
            <FontAwesomeIcon icon={faCaretUp} />
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </div>
        <div onClick={() => handleSort("runned")} className="min-w-[150px] table_row">
          Runned
          <span className="ml-2">
            <FontAwesomeIcon icon={faCaretUp} />
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </div>
        <div onClick={() => handleSort("apiKey")} className="min-w-[150px] table_row">
          API Key
          <span className="ml-2">
            <FontAwesomeIcon icon={faCaretUp} />
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </div>
        <div className="min-w-[80px]">Active</div>
        <div className="min-w-[85px]">Edit</div>
      </div>

      {/* Data Rows */}
      {data.map((item, index) => (
        <div key={item.key} className="flex items-center justify-between gap-2 py-2 px-3 bg-white rounded-md mt-2">
          {/* Serial No */}
          <div className="min-w-[30px]">{index + 1}</div>

          {/* Model Name with Image */}
          <div className="flex items-center gap-2 min-w-[150px]">
            <Image src={chart} alt="chart" width={24} height={24} /> {item.name}
          </div>

          {/* Token Used */}
          <div className="min-w-[150px]">{item.tokenUsed}</div>

          {/* Runned */}
          <div className="min-w-[150px]">{item.runned}</div>

          {/* API Key (Masked) */}
          <div className="min-w-[150px]">***</div>

          {/* Active Switch */}
          <div className="min-w-[80px]">
            <Switch
              checked={item.isActive}
              onChange={() => handleActiveChange(item.key)}
            />
          </div>

          {/* Edit Button */}
          <div className="min-w-[85px]">
            <Link href="/parameters/models"><button className=" px-[18px] py-[8px] bg-[#FFEDBC] border border-[#e5e7eb] rounded-[10px] flex items-center gap-1 hover:underline">
              <FontAwesomeIcon icon={faPen} className="icons" /> Edit
            </button></Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default ModelsTable;
