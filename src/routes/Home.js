import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Arrow, useLayer } from "react-laag";
import { FaArrowLeft } from "react-icons/fa6";
import { BiExport } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";

import DetailsIcon from "../icons/DetailsIcon";
import clsx from "clsx";

const dummyData = [
  {
    type: "threat",
    title: "Waste Reduction",
    yearStr: "2016-2023",
    percentage: 0,
    subtitle: "",
  },
  {
    type: "threat",
    title: "Reduction in waste to landfill",
    yearStr: "2017-2020",
    percentage: 57.38,
    subtitle: "Depletion of grow",
  },
  {
    type: "opportunity",
    title: "Plant trees",
    yearStr: "2020-2025",
    percentage: 12.5,
    subtitle: "Decrease in GHGS",
  },
  {
    type: "threat and opportunity",
    title: "Sample Goal",
    yearStr: "2020-2030",
    percentage: 72.5,
    subtitle: "Enterprise Risk",
  },
  {
    type: "dummy",
    title: "Waste Reduction",
    yearStr: "2018-2023",
    percentage: 80,
    subtitle: "waste is to be reduced",
  },
]

export default function Home() {  
  const [isDetailsMenuOpen, setIsDetailsMenuOpen] = useState(false);

  // helper function to close the menu
  function closeDetailsMenu() {
    setIsDetailsMenuOpen(false);
  }

  const { renderLayer: renderDetailsMenuLayer, triggerProps: detailsMenuTriggerProps, layerProps: detailsMenuLayerProps, arrowProps: detailsMenuArrowProps } = useLayer({
    isOpen: isDetailsMenuOpen,
    onOutsideClick: closeDetailsMenu, // close the menu when the user clicks outside
    onDisappear: closeDetailsMenu, // close the menu when the menu gets scrolled out of sight
    overflowContainer: false, // keep the menu positioned inside the container
    auto: true, // automatically find the best placement
    placement: "bottom-end", // we prefer to place the menu "top-end"
    triggerOffset: 12, // keep some distance to the trigger
    containerOffset: 16, // give the menu some room to breath relative to the container
    arrowOffset: 16, // let the arrow have some room to breath also
  });

  return (
    <div className="p-[48px] flex flex-col h-[calc(100%-84px)] w-full">
      <div className="w-full flex items-center">
        <div 
          onClick={() => window.parent.postMessage({ type: "window_back"}, "*")}
          className="rounded-full p-[8px] bg-[white] flex items-center cursor-pointer">
          <div className="bg-gray-palette-lightest/[0.1] rounded-full w-[24px] h-[24px] flex justify-center items-center">
            <FaArrowLeft className="text-gray-palette-lightest text-[14px]" />
          </div>
          <div className="w-[8px]" />
          <div className="font-[600] font-manrope text-[15px] leading-[18px] select-none">
            {"Back"}
          </div>
          <div className="w-[8px]" />
        </div>

        <div className="w-[24px]" />

        <div className="flex-1 leading-[40px] font-[600] text-[27px] font-roboto">
          {"Strategy / Shared Goals"}
        </div>

        <div
          {...detailsMenuTriggerProps}
          onClick={() => setIsDetailsMenuOpen(!isDetailsMenuOpen)}
          className="cursor-pointer rounded-full"
        >
          <DetailsIcon className="stroke-gray-500 " />
        </div>
        {renderDetailsMenuLayer(
          <AnimatePresence>
            {isDetailsMenuOpen && (
              <div className="bg-white rounded-lg p-[4px] border border-gray-300" {...detailsMenuLayerProps}>
                <div className="text-gray-500 cursor-pointer hover:bg-gray-50 rounded-md py-[8px] px-[12px] flex items-center">
                  <BiExport className="text-gray-500 text-[28px] pr-[8px]" />
                  Option 1
                </div>
                <div className="text-gray-500 cursor-pointer hover:bg-gray-50 rounded-md py-[8px] px-[12px] flex items-center">
                  <BiExport className="text-gray-500 text-[28px] pr-[8px]" />
                  Option 2
                </div>
                <Arrow borderWidth={1} borderColor="#D1D5DB" {...detailsMenuArrowProps} />
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    
      <div className="h-[20px]" />
      <div className="w-full flex items-center justify-between"> 
        <div className="flex items-center">
          <div className="flex items-center text-[20px] font-[600]">
            <div className="rounded-full w-[18px] h-[18px] bg-red-500" /> 
            <div className="w-[8px]" />
            {"Threat"}
          </div>

          <div className="w-[36px]" />
          <div className="flex items-center text-[20px] font-[600]">
            <div className="rounded-full w-[18px] h-[18px] bg-green-500" /> 
            <div className="w-[8px]" />
            {"Opportunity"}
          </div>

          <div className="w-[36px]" />
          <div className="flex items-center text-[20px] font-[600]">
            <div className="rounded-full w-[18px] h-[18px] bg-amber-400" /> 
            <div className="w-[8px]" />
            {"Threat and Opportunity"}
          </div>

          <div className="w-[36px]" />
          <div className="flex items-center text-[20px] font-[600]">
            <div className="rounded-full w-[18px] h-[18px] bg-indigo-600" /> 
            <div className="w-[8px]" />
            {"Dummmy"}
          </div>
        </div>

        <div className="rounded-xl bg-green-200 px-[24px] py-[12px] flex items-center text-green-600 text-[16px] cursor-pointer">
          <FiPlusCircle className="text-[18px]" />
          
          <div className="w-[8px]" />
          {"Add new goal"}
        </div>
      </div>

      <div className="h-[30px]" />
      <div className="bg-white flex-auto w-full rounded-xl">
        {/* headings row */}
        <div className="bg-indigo-300 h-[72px] rounded-t-xl flex">
          <div className="flex-[6] flex items-center justify-start pl-[48px] pr-[8px] text-[20px] font-[600]">
            Goal
          </div>
          <div className="flex-[3] flex items-center justify-start px-[8px] text-[20px] font-[600]">
            Year
          </div>
          <div className="flex-[3] flex items-center justify-start px-[36px] text-[20px] font-[600]">
            Goal Baseline
          </div>
          <div className="flex-[3] flex items-center justify-start px-[8px] text-[20px] font-[600]">
            {"Goal value (%)"}
          </div>
          <div className="flex-[8] flex items-center justify-start pl-[8px] pr-[48px] text-[20px] font-[600]">
            Filter
          </div>
        </div>

        {dummyData.map((datum, index) => {
          return <GoalRow 
            percentage={datum.percentage}
            subtitle={datum.subtitle}
            title={datum.title}
            bgColor={index % 2 === 1 ? "white": "not white"}
            type={datum.type}
            yearStr={datum.yearStr}
            key={index}
          />
        })}
      </div>

      {/* <div className="h-[48px]" />
      <div className="h-[48px] w-full bg-[#9D9BFF]" />
      <div className="h-[48px] w-full bg-indigo-300" /> */}
      
    </div>
  );
}

const GoalRow = ({ title, subtitle, percentage, type, yearStr, bgColor }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={clsx(
        { "bg-indigo-50": bgColor !== "white" },
        { "bg-white": bgColor === "white" }
      )}
    >
      <div className="h-[88px] flex">
        <div className="flex-[6] flex items-center justify-start pl-[48px] pr-[8px] text-[16px] font-manrope font-[500]">
          {title}
        </div>
        <div className="flex-[3] flex items-center justify-start px-[8px] text-[16px] font-manrope font-[500] text-gray-500">
          {yearStr}
        </div>
        <div className="flex-[3] flex items-center justify-start px-[36px] text-[16px] font-manrope">
          <ProgressBar percentage={percentage} type={type} />
        </div>
        <div className="flex-[3] flex items-center justify-start px-[8px] text-[16px] font-manrope font-[500] text-gray-500">
          {`${percentage}%`}
        </div>
        <div className="flex-[8] flex items-center justify-between pl-[8px] pr-[48px] text-[16px] font-manrope">
          <SubtitleBlock subtitle={subtitle} type={type} />

          <div
            onClick={() => setIsExpanded(prev => !prev)}
            className={clsx(
              "rounded-full font-[500] px-[24px] py-[12px] cursor-pointer",
              { "bg-indigo-200 ": bgColor !== "white" },
              { "bg-gray-100": bgColor === "white" }
            )}
          >
            {isExpanded ? "Hide Details" : "View Details"}
          </div>
        </div>
      </div>
      
      {isExpanded ? <div className="p-[48px]">Hello World</div> : null}
    </div>
  );
}

const ProgressBar = ({ percentage, type }) => {
  switch (type) {
    case "threat":
      return <div className="h-[3px] w-full bg-red-100">
        <div className="bg-red-500 h-full" style={{ width: `${percentage}%`}}/>
      </div>
    case "opportunity":
      return <div className="h-[3px] w-full bg-green-100">
        <div className="bg-green-500 h-full" style={{ width: `${percentage}%`}}/>
      </div>
    case "threat and opportunity":
      return <div className="h-[3px] w-full bg-amber-100">
        <div className="bg-amber-400 h-full" style={{ width: `${percentage}%`}}/>
      </div>
    case "dummy":
      return <div className="h-[3px] w-full bg-indigo-200">
        <div className="bg-indigo-600 h-full" style={{ width: `${percentage}%`}}/>
      </div>
    default:
      throw new Error("Unexpected type passed to the ProgessBar component!!!!");
  }
}

const SubtitleBlock = ({ subtitle, type }) => {
  switch (type) {
    case "threat":
      return <div className="flex items-center text-gray-500 font-[500]">
        <div className="rounded-full w-[18px] h-[18px] bg-red-500" /> 
        <div className="w-[8px]"/>
        {subtitle}
      </div>
    case "opportunity":
      return <div className="flex items-center text-gray-500 font-[500]">
        <div className="rounded-full w-[18px] h-[18px] bg-green-500" /> 
        <div className="w-[8px]"/>
        {subtitle}
      </div>
    case "threat and opportunity":
      return <div className="flex items-center text-gray-500 font-[500]">
        <div className="rounded-full w-[18px] h-[18px] bg-amber-400" /> 
        <div className="w-[8px]"/>
        {subtitle}
      </div>
    case "dummy":
      return <div className="flex items-center text-gray-500 font-[500]">
        <div className="rounded-full w-[18px] h-[18px] bg-indigo-600" /> 
        <div className="w-[8px]"/>
        {subtitle}
      </div>
    default:
      throw new Error("Unexpected type passed to the SubtitleBlock component!!!!");
  }
}







