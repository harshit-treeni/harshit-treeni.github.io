import { useEffect } from "react";
import "./../css/peer_benchmarking.css";
import Flexmonster from "flexmonster";
import "flexmonster/flexmonster.css";
// import RoundedBarGraph from "./rounded_bar_graph"
// import RectangleBarGraph from "./rectangle_bar_graph"
// import MixedBarGraph from "./mixed_bar_graph"

import { GoShareAndroid } from "react-icons/go";

import DetailsIcon from "../icons/DetailsIcon";

import { CustomGrayDark } from "../colors";
import WidgetContainer from "../components/WidgetContainer";
import CDPRankingTable from "../components/CDPRankingTable";
import WaterDiscTable from "../components/WaterDiscTable";

const CDPHeadings = ["Organization", "2018", "2019", "2020", "2021", "2022"];
const CDPRows = [
  ["Wipro", "A -", "A -", "A -", "A", "A"],
  ["Atos", "A -", "A", "A", "A", "A"],
  ["TCS", "B", "A -", "A -", "B", "A -"],
  ["Tech Mahindra", "A -", "A -", "A -", "A", "A -"],
  ["Accenture", "C", "B -", "D", "B", "B"],
  ["Infosys", "A", "A -", "A", "A", "A"],
  ["Capgemini", "A", "A -", "A -", "A", "A"],
  ["Wipro", "B", "A", "A -", "A", "A"],
];

const WaterDiscHeadings = [
  "Name",
  "Water Recycling",
  "Water Intensity",
  "Water Consumption",
];
const WaterDiscRows = [
  [
    "Wipro",
    "Water recycled as a % of total water consumption",
    "Water recycled as a % of total water consumption",
    "% water from different sources- municipal, groundwater, private water, rainwater",
  ],
  ["Atos", "NA", "NA", "NA"],
  [
    "TCS",
    "Total treated sewage recycled as a percentage of the total sewage generated",
    "Do not calculate",
    "% water from different sources- municipal, groundwater, third party, rainwater",
  ],
  [
    "HCL",
    "Water recycled as a % of total water used for a year",
    "Do not calculate",
    "Annual water consumption- source wise data is not available",
  ],
  [
    "Tech Mahindra",
    "Total water recycled quantity",
    "Water consumption/employee",
    "Water Consumption total volume, Water withdrawal by sources",
  ],
  [
    "Infosys",
    "Water recycled as a % of sewage generated",
    "Water Consumption per Employee",
    "Total Water Consumption",
  ],
  [
    "Accenture",
    "Water recycled as a % of total freshwater consumption",
    "Water consumption per capita (previously), Water Consumption/unit revenue",
    "Total water consumption by sources of water- third party, rainwater, groundwater",
  ],
];

export default function Dashboard({ licenseKey }) {
  useEffect(() => {
    const data = [
      { Company: "Infosys", Category: "Electronics", Price: 1000 },
      { Company: "Wipro", Category: "Electronics", Price: 500 },
      { Company: "Atos", Category: "Electronics", Price: 1200 },
      { Company: "TCS", Category: "Electronics", Price: 600 },
      { Company: "HCL", Category: "Electronics", Price: 800 },
      { Company: "Tch Mehindra", Category: "Electronics", Price: 400 },
      { Company: "Accenture", Category: "Electronics", Price: 400 },
    ];

    const pivot = new Flexmonster({
      container: "pivot-container",
      // componentFolder: "https://cdn.flexmonster.com/",
      licenseKey:
        "Z7O6-XIJ75O-3R0054-04156T-725K3K-5J6O0H-3B583N-72346J-3N3Q72-29",
      // licenseKey: {licenseKey},
      toolbar: false,
      height: "350px",
      report: {
        dataSource: {
          data: data, // Using manual data
        },
        slice: {
          rows: [
            {
              uniqueName: "Company",
            },
          ],
          measures: [
            { uniqueName: "Price" },
            { uniqueName: "Discount" },
            { uniqueName: "Quantity" },
          ],
        },
        options: {
          viewType: "charts",
          configuratorButton: false,
          chart: {
            type: "pie",
            showFilter: false,
            showMeasures: false,
          },
        },
      },
    });

    // return () => {
    //     pivot.dispose();
    // };
  }, []);

  useEffect(() => {
    const data = [
      { Company: "Infosys", Category: "Electronics", Price: 1000 },
      { Company: "Wipro", Category: "Electronics", Price: 500 },
      { Company: "Atos", Category: "Electronics", Price: 1200 },
      { Company: "TCS", Category: "Electronics", Price: 600 },
      { Company: "HCL", Category: "Electronics", Price: 800 },
      { Company: "Tch Mehindra", Category: "Electronics", Price: 400 },
      { Company: "Accenture", Category: "Electronics", Price: 400 },
    ];

    const pivot = new Flexmonster({
      container: "pivot-container-second",
      // componentFolder: "https://cdn.flexmonster.com/",
      licenseKey:
        "Z7O6-XIJ75O-3R0054-04156T-725K3K-5J6O0H-3B583N-72346J-3N3Q72-29",
      // licenseKey: {licenseKey},
      toolbar: false,
      height: "350px",
      report: {
        dataSource: {
          data: data, // Using manual data
        },
        slice: {
          rows: [
            {
              uniqueName: "Company",
            },
          ],
          measures: [
            { uniqueName: "Price" },
            { uniqueName: "Discount" },
            { uniqueName: "Quantity" },
          ],
        },
        options: {
          viewType: "charts",
          configuratorButton: false,
          chart: {
            type: "pie",
            showFilter: false,
            showMeasures: false,
          },
        },
      },
    });

    // return () => {
    //     pivot.dispose();
    // };
  }, []);

  return (
    <div className="p-[48px]">
      {/* this is the page heading block */}
      <div className="flex justify-between items-center">
        <div className="text-[26px] font-[600]">Peer Benchmarking</div>
        <div className="flex items-center">
          <GoShareAndroid className="text-gray-500 text-[18px] relative -top-[1px]" />
          <div className="w-[4px]" />
          <div className="text-gray-500 text-[14px] font-[500] ">Share</div>
          <div className="w-[20px]" />
          <div>
            <DetailsIcon color={CustomGrayDark} />
          </div>
        </div>
      </div>

      <div className="h-[28px]" />

      {/* this is the CDPRankingTable */}
      <WidgetContainer title={"CDP Rankings"} padStr={"table"}>
        <CDPRankingTable CDPHeadings={CDPHeadings} CDPRows={CDPRows} />
      </WidgetContainer>

      <div className="h-[28px]" />

      <div className="box-bar-module">
        <div className="box-name">
          <div className="title-module">
            <div className="title-subtitle">
              <p className="title">Number of Material Topics</p>
              <p className="sub-title">Material Topics</p>
            </div>
            <span className="icons">
              {"pin"}
              {"menu"}
            </span>
          </div>
          <div>
            <div
              id="pivot-container"
              style={{ width: "50%", height: "350px" }}
            />
          </div>
        </div>

        <div className="box-name">
          <div className="title-module">
            <div className="title-subtitle">
              <p className="title">E,S,G Material Topics Count</p>
              <p className="sub-title">Count E, S, G Topic</p>
            </div>
            <span className="icons">
              {"pin"}
              {"menu"}
            </span>
          </div>
          <div>
            <div
              id="pivot-container-second"
              style={{ width: "20%", height: "200px" }}
            />
          </div>
        </div>
      </div>

      <div className="graph-bar-module">
        <div className="box-graph">
          <div className="title-module">
            <p className="title">Female Representation</p>
            <span className="icons">
              {"pin"}
              {"menu"}
            </span>
          </div>
          <div>
            {/* <div id="pivot-container" style={{ width: "50%", height: "350px" }} /> */}
            {/* <RoundedBarGraph/> */}
          </div>
        </div>
        <div className="box-graph">
          <div className="title-module">
            <p className="title">Total Emissions</p>

            <span className="icons">
              {"pin"}
              {"menu"}
            </span>
          </div>
          <div>
            {/* <div id="pivot-container" style={{ width: "50%", height: "350px" }} /> */}
            {/* <RectangleBarGraph/> */}
          </div>
        </div>
        <div className="box-graph">
          <div className="title-module">
            <p className="title">Scope 3 Emissions</p>

            <span className="icons">
              {"pin"}
              {"menu"}
            </span>
          </div>
          <div>
            {/* <div id="pivot-container" style={{ width: "50%", height: "350px" }} /> */}
            {/* <MixedBarGraph/> */}
          </div>
        </div>
      </div>

      <div className="h-[28px]" />

      {/* this is the WaterDiscTable */}
      <WidgetContainer title={"Water Disclosures"}>
        <WaterDiscTable
          WaterDiscHeadings={WaterDiscHeadings}
          WaterDiscRows={WaterDiscRows}
        />
      </WidgetContainer>

      <WidgetContainer title={"asdf"} subtitle={"asdf asdfasd asdf"}>
        <div className="h-[300px]"></div>
      </WidgetContainer>
    </div>
  );
}
