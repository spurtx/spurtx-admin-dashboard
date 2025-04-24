import { useState, useRef, useEffect } from "react";
import CardContainer from "../ui/CardContainer";
import { IoSearchOutline } from "react-icons/io5";
import { MdSort, MdOutlineCloudUpload } from "react-icons/md";
import AppraisalTable from "./AppraisalTable";
import SurveyTable from "./SurveyTable";

const SpurTable = () => {
  const [activeTab, setActiveTab] = useState<"appraisal" | "survey">("appraisal");
  const tabRefs = {
    appraisal: useRef<HTMLDivElement>(null),
    survey: useRef<HTMLDivElement>(null),
  };
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const tabElement = tabRefs[activeTab].current;
    if (tabElement) {
      const { offsetLeft, offsetWidth } = tabElement;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

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
      <div>
      {/* Tabs */}
      <div className="relative mb-6 inline-block">
        <div className="flex gap-8 relative z-10">
          {(["appraisal", "survey"] as const).map((tab) => (
            <div
              key={tab}
              ref={tabRefs[tab]}
              className="cursor-pointer pb-2 text-sm font-medium text-gray-700"
              onClick={() => setActiveTab(tab)}
            >
              {tab === "appraisal" ? "Appraisals" : "Survey"}
            </div>
          ))}
        </div>

        {/* Gray base underline */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-300 z-0" />

        {/* Gradient underline */}
        <div
          className="absolute bottom-0 h-[2px] bg-gradient-to-r from-[#00A15D] to-[#C16407] transition-all duration-300 z-10"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
        />
      </div>

      {/* Table */}
      <div>
        {activeTab === "appraisal" ? <AppraisalTable /> : <SurveyTable />}
      </div>
    </div>
    </CardContainer>
  );
};

export default SpurTable;
