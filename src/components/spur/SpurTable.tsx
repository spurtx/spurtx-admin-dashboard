


import { useState } from "react";
import CardContainer from "../ui/CardContainer";
import { IoSearchOutline } from "react-icons/io5";
import { MdSort, MdOutlineCloudUpload } from "react-icons/md";
import AppraisalTable from "./AppraisalTable";
import SurveyTable from "./SurveyTable";

const SpurTable = () => {
  const [activeTab, setActiveTab] = useState<"appraisal" | "survey">("appraisal");

  return (
    <CardContainer>
      {/* Top Controls */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-3 border border-gray-400 rounded-[5px] w-[300px] py-1 px-4">
          <IoSearchOutline className="text-gray-400 mt-1" />
          <input
            placeholder="search"
            className="text-gray-600 outline-none bg-transparent w-full"
          />
        </div>
        <div className="flex gap-3">
          <button className="flex gap-2 border items-center px-3 border-gray-300 text-gray-400 rounded-[3px]">
            <MdSort />
            Sort Table
          </button>
          <button className="flex gap-2 border items-center px-3 border-gray-300 text-gray-400 rounded-[3px]">
            <MdOutlineCloudUpload />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 mb-6 border-b border-gray-300">
        {["appraisal", "survey"].map((tab) => (
          <div
            key={tab}
            className="cursor-pointer relative pb-2 text-sm font-medium text-gray-700"
            onClick={() => setActiveTab(tab as "appraisal" | "survey")}
          >
            {tab === "appraisal" ? "Appraisals" : "Survey"}
            <div
              className={`absolute bottom-0 left-0 h-[3px] w-full transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#00A15D] to-[#C16407]"
                  : "bg-gray-400"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Table */}
      <div>
        {activeTab === "appraisal" ? <AppraisalTable /> : <SurveyTable />}
      </div>
    </CardContainer>
  );
};

export default SpurTable;
