import { FaArrowLeft } from "react-icons/fa6";
import { CustomBlue, CustomGrayDark } from "../colors";

import DetailsIcon from "../icons/DetailsIcon";

import ColumnGraphBlock from "../components/ColumnGraphBlock";
import RecordsBlock from "../components/RecordsBlock";
import PageSelect from "../components/PageSelect";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import MyComboBox from "../components/MyComboBox";
import { useReducer } from "react";
import clsx from "clsx";

import RecordsLoader from "../components/RecordsLoader";
import ComboBoxLoader from "../components/ComboBoxLoader";

function DSRReducer(state, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "location change":
      return {
        ...state,
        location: action.location,
        loadingState: {
          recordsObj: true,
          categories: true,
          indicators: true,
        },
      };
    case "category change":
      return {
        ...state,
        category: action.category,
        loadingState: {
          recordsObj: true,
          indicators: true,
        },
      };
    case "indicator change":
      return {
        ...state,
        indicator: action.indicator,
        loadingState: {
          recordsObj: true,
        },
      };
    case "pageOption change":
      return {
        ...state,
        pageOption: action.pageOption,
        loadingState: {
          recordsObj: true,
        },
      };
    case "locations change":
      return {
        ...state,
        locations: action.locations,
        loadingState: {
          ...state.loadingState,
          locations: false,
        },
      };
    case "categories change":
      return {
        ...state,
        categories: action.categories,
        loadingState: {
          ...state.loadingState,
          categories: false,
        },
      };
    case "indicators change":
      return {
        ...state,
        indicators: action.indicators,
        loadingState: {
          ...state.loadingState,
          indicators: false,
        },
      };
    case "dashboardData change":
      return {
        ...state,
        dashboardData: action.dashboardData,
      };
    case "recordsObj change":
      return {
        ...state,
        recordsObj: action.recordsObj,
        loadingState: {
          ...state.loadingState,
          recordsObj: false,
        },
      };
    case "recordsObj loading":
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          recordsObj: true,
        },
      };
  }
  throw Error("Unknown action type " + action.type);
}

export default function DataStatusReport() {
  const [state, dispatch] = useReducer(DSRReducer, {
    location: null,
    category: null,
    indicator: null,
    pageOption: { id: 1, option: 10 },
    locations: [],
    categories: [],
    indicators: [],
    dashboardData: [
      {
        name: "Approved",
        number: 225000,
      },
      {
        name: "Pending",
        number: 205043,
      },
      {
        name: "Rejected",
        number: 62700,
      },
    ],
    recordsObj: null,
    loadingState: {
      recordsObj: true,
      locations: true,
      categories: true,
      indicators: true,
    },
  });

  const {
    location,
    category,
    indicator,
    pageOption,
    locations,
    categories,
    indicators,
    dashboardData,
    recordsObj,
    loadingState,
  } = state;

  window.parent.postMessage(
    {
      type: "sync",
      data: { location, category, indicator, pageOption },
    },
    "*"
  );

  window.onmessage = (e) => {
    if (e.data.type === "data") {
      if (compareTwoArraysOfObj(e.data.data.locations, locations))
        dispatch({
          type: "locations change",
          locations: e.data.data.locations,
        });

      if (
        compareTwoArraysOfObj(
          e.data.data.categories.orgNode_category_details,
          categories
        )
      )
        dispatch({
          type: "categories change",
          categories: e.data.data.categories.orgNode_category_details,
        });

      if (
        compareTwoArraysOfObj(
          e.data.data.indicators.data_point_details,
          indicators
        )
      )
        dispatch({
          type: "indicators change",
          indicators: e.data.data.indicators.data_point_details,
        });

      if (
        compareDashboardData(
          getDashboardDataObj(e.data.data.dashboardData),
          dashboardData
        )
      ) {
        dispatch({
          type: "dashboardData change",
          dashboardData: getDashboardDataObj(e.data.data.dashboardData),
        });
      }

      if (e.data.data.recordsObj) {
        if (recordsObj === null || e.data.data.recordsObj.id !== recordsObj.id)
          dispatch({
            type: "recordsObj change",
            recordsObj: {
              ...e.data.data.recordsObj,
              records: e.data.data.recordsObj.records.map(mapRecord),
              selectAll: false,
            },
          });
      }
    }
  };

  return (
    <div className="p-[48px] flex flex-col justify-start items-start ">
      <div className="w-full flex items-center">
        <div className="rounded-full p-[8px] bg-[white] flex items-center cursor-pointer">
          <div
            style={{ background: "rgba(74, 71, 235, 0.11)" }}
            className="rounded-full w-[24px] h-[24px] flex justify-center items-center"
          >
            <FaArrowLeft
              style={{ color: CustomBlue }}
              className="text-[14px]"
            />
          </div>
          <div className="w-[8px]" />
          <div
            onClick={() => {
              window.history.go(-1);
            }}
            className="font-[600] font-manrope text-[15px] leading-[18px]"
          >
            {"Back"}
          </div>
          <div className="w-[8px]" />
        </div>

        <div className="w-[24px]" />

        <div className="flex-1 leading-[40px] font-[600] text-[27px]">
          {"Data Management / Data Status Report"}
        </div>

        <div className="cursor-pointer rounded-full">
          <DetailsIcon color={CustomGrayDark} />
        </div>
      </div>

      <div className="h-[28px]" />
      <div className="rounded-[8px] py-[14px] px-[24px] border-[0.5px] border-[#CDCDFF] flex items-center w-full">
        <div className="font-manrope font-[600] text-[16px] leading-[20px]">
          Select one or multiple filters
        </div>

        <div className="w-[32px]" />

        {loadingState.locations ? (
          <ComboBoxLoader type={"day-night"} />
        ) : (
          <MyComboBox
            placeholder={"Location"}
            value={location}
            onChange={(val) => {
              if (val !== location)
                dispatch({ type: "location change", location: val });
            }}
            options={locations}
          />
        )}
        <div className="w-[16px]" />

        {loadingState.categories ? (
          <ComboBoxLoader type={"waves"} />
        ) : (
          <MyComboBox
            placeholder={"Category"}
            value={category}
            onChange={(val) => {
              if (val !== location)
                dispatch({ type: "category change", category: val });
            }}
            options={categories}
          />
        )}
        <div className="w-[16px]" />

        {loadingState.indicators ? (
          <ComboBoxLoader type={"clouds"} />
        ) : (
          <MyComboBox
            placeholder={"Indicator"}
            value={indicator}
            onChange={(val) => {
              if (val !== location)
                dispatch({ type: "indicator change", indicator: val });
            }}
            options={indicators}
          />
        )}
        <div className="w-[16px]" />

        <MyComboBox
          placeholder={"Owner"}
          value={null}
          onChange={() => {}}
          options={[]}
        />
      </div>

      <div className="h-[28px]" />
      <ColumnGraphBlock data={dashboardData} dispatch={dispatch} />

      <div className="h-[28px]" />
      <div
        onClick={() => {
          if (recordsObj) {
            if (
              recordsObj.records.filter((record) => record.select).length === 0
            )
              window.alert("Please choose atleast 1 record.");
            else if (
              window.confirm(
                `Are you sure you want to notify the admin about the chosen records?`
              )
            ) {
              window.parent.postMessage(
                {
                  type: "notify admin",
                  data: recordsObj
                    ? recordsObj.records
                        .filter((record) => record.select)
                        .map((record) => record.id)
                    : null,
                },
                "*"
              );
            }
          }
        }}
        className="rounded-full font-manrope text-[16px] font-[600] leading-[16px] py-[16px] px-[20px] text-white cursor-pointer"
        style={{ background: CustomBlue }}
      >
        Notify Admin{" "}
        {recordsObj
          ? recordsObj.records.reduce(
              (accumalator, record) => accumalator + (record.select ? 1 : 0),
              0
            )
          : null}
      </div>
      <div className="h-[42px]" />
      <div className="w-full rounded-[14px] overflow-hidden relative">
        <RecordsBlock
          recordsObj={
            recordsObj !== null ? recordsObj : { records: [], selectAll: false }
          }
          dispatch={dispatch}
        />
        {loadingState.recordsObj ? <RecordsLoader /> : null}
      </div>
      <div className="h-[28px]" />
      <div className="flex items-center justify-between w-full">
        <div
          className="text-[14px] font-manrope flex items-center"
          style={{ color: CustomGrayDark }}
        >
          <div className="font-[700] text-black">
            {recordsObj
              ? `${
                  recordsObj.totalRecords === 0
                    ? 0
                    : (recordsObj.page - 1) * recordsObj.limit + 1
                }-${
                  recordsObj.totalPages === recordsObj.page
                    ? recordsObj.totalRecords
                    : recordsObj.page * recordsObj.limit
                }`
              : null}
          </div>
          <div className="w-[6px]" />
          {recordsObj ? `of ${recordsObj.totalRecords}` : null}
          <div className="w-[56px]" />
          {"Results per page"}
          <div className="w-[28px]" />
          <PageSelect
            value={pageOption}
            onChange={(val) =>
              dispatch({ type: "pageOption change", pageOption: val })
            }
          />
        </div>
        <PaginationBlock recordsObj={recordsObj} dispatch={dispatch} />
      </div>
    </div>
  );
}

function mapRecord(record) {
  return {
    select: false,
    category: record.indicator_category ? record.indicator_category : "",
    indicator: record.indicator_name ? record.indicator_name : "",
    status: record.state ? getStatus(record.state) : "",
    startDate: record.start_date ? record.start_date : "",
    endDate: record.end_date ? record.end_date : "",
    siteName: record.site ? record.site : "",
    count: record.record_count.toString() ? record.record_count.toString() : "",
    owner: record.assigned_to ? record.assigned_to : "",
    id: record.id,
  };
}

function compareTwoArraysOfObj(arr1, arr2) {
  if (arr1.length !== arr2.length) return true;
  else if (
    arr1[0] &&
    (arr1[0].id !== arr2[0].id ||
      arr1[arr1.length - 1].id !== arr2[arr2.length - 1].id)
  )
    return true;
  else return false;
}

function compareDashboardData(dashboardDataOne, dashboardDataTwo) {
  if (dashboardDataOne[0].number !== dashboardDataTwo[0].number) return true;
  else if (dashboardDataOne[1].number !== dashboardDataTwo[1].number)
    return true;
  else if (dashboardDataOne[2].number !== dashboardDataTwo[2].number)
    return true;
  else return false;
}

function getDashboardDataObj(dashboardData) {
  return [
    {
      name: "Approved",
      number: dashboardData.approved_records,
    },
    {
      name: "Pending",
      number: dashboardData.pending_records,
    },
    {
      name: "Rejected",
      number: dashboardData.reject_records,
    },
  ];
}

function PaginationBlock({ recordsObj, dispatch }) {
  const handlePageClick = (pg) => {
    dispatch({ type: "recordsObj loading" });
    if (recordsObj.page === pg) return;
    else window.parent.postMessage({ type: "page", data: pg }, "*");
  };

  const handleNext = () => {
    dispatch({ type: "recordsObj loading" });
    window.parent.postMessage({ type: "nextPage" }, "*");
  };

  const handlePrev = () => {
    dispatch({ type: "recordsObj loading" });
    window.parent.postMessage({ type: "prevPage" }, "*");
  };

  if (recordsObj === null || recordsObj.totalPages === 1) return null;
  else {
    if (recordsObj.totalPages === 2) {
      return (
        <div className="flex items-center">
          {[1, 2].map((pg) => {
            return (
              <div className="flex" key={pg}>
                <div
                  onClick={() => handlePageClick(pg)}
                  className={clsx({
                    "cursor-pointer rounded-md border border-black/5 px-[16px] py-[10px] font-manrope font-[600] text-[12px]": true,
                    "bg-blue-700 text-white": recordsObj.page === pg,
                    "bg-white text-black": recordsObj.page !== pg,
                  })}
                >
                  {pg}
                </div>

                {pg === 2 ? null : <div className="w-[10px]" />}
              </div>
            );
          })}
        </div>
      );
    } else if (recordsObj.totalPages === 3) {
      <div className="flex items-center">
        {[1, 2, 3].map((pg) => {
          return (
            <div className="flex" key={pg}>
              <div
                onClick={() => handlePageClick(pg)}
                className={clsx({
                  "cursor-pointer rounded-md border border-black/5 px-[16px] py-[10px] font-manrope font-[600] text-[12px]": true,
                  "bg-blue-700 text-white": recordsObj.page === pg,
                  "bg-white text-black": recordsObj.page !== pg,
                })}
              >
                {pg}
              </div>

              {pg === 3 ? null : <div className="w-[10px]" />}
            </div>
          );
        })}
      </div>;
    } else {
      if (recordsObj.page === 1) {
        return (
          <div className="flex items-center">
            {[1, 2, 3].map((pg) => {
              return (
                <div className="flex" key={pg}>
                  <div
                    onClick={() => handlePageClick(pg)}
                    className={clsx({
                      "cursor-pointer rounded-md border border-black/5 px-[16px] py-[10px] font-manrope font-[600] text-[12px]": true,
                      "bg-blue-700 text-white": recordsObj.page === pg,
                      "bg-white text-black": recordsObj.page !== pg,
                    })}
                  >
                    {pg}
                  </div>

                  <div className="w-[10px]" />
                </div>
              );
            })}

            <div
              onClick={() => handleNext()}
              className="cursor-pointer flex items-center bg-white rounded-md border border-black/5 py-[8px] pl-[12px] pr-[8px]"
            >
              <div className="text-[12px] font-[600] font-manrope">
                {"Next"}
              </div>
              <div className="w-[6px]" />
              <div className="bg-gray-300 w-[26px] h-[26px] rounded-full flex items-center justify-center">
                <ChevronRightIcon className="size-4 fill-black" />
              </div>
            </div>
          </div>
        );
      } else if (recordsObj.page === recordsObj.totalPages) {
        return (
          <div className="flex items-center">
            <div
              onClick={() => handlePrev()}
              className="cursor-pointer flex items-center bg-white rounded-md border border-black/5 py-[8px] pr-[12px] pl-[8px]"
            >
              <div className="bg-gray-300 w-[26px] h-[26px] rounded-full flex items-center justify-center">
                <ChevronLeftIcon className="size-4 fill-black" />
              </div>
              <div className="w-[6px]" />
              <div className="text-[12px] font-[600] font-manrope">
                {"Back"}
              </div>
            </div>

            <div className="w-[10px]" />

            {[
              recordsObj.totalPages - 2,
              recordsObj.totalPages - 1,
              recordsObj.totalPages,
            ].map((pg) => {
              return (
                <div className="flex" key={pg}>
                  <div
                    onClick={() => handlePageClick(pg)}
                    className={clsx({
                      "cursor-pointer rounded-md border border-black/5 px-[16px] py-[10px] font-manrope font-[600] text-[12px]": true,
                      "bg-blue-700 text-white": recordsObj.page === pg,
                      "bg-white text-black": recordsObj.page !== pg,
                    })}
                  >
                    {pg}
                  </div>

                  <div className="w-[10px]" />
                </div>
              );
            })}
          </div>
        );
      } else {
        return (
          <div className="flex items-center">
            <div
              onClick={() => handlePrev()}
              className="cursor-pointer flex items-center bg-white rounded-md border border-black/5 py-[8px] pr-[12px] pl-[8px]"
            >
              <div className="bg-gray-300 w-[26px] h-[26px] rounded-full flex items-center justify-center">
                <ChevronLeftIcon className="size-4 fill-black" />
              </div>
              <div className="w-[6px]" />
              <div className="text-[12px] font-[600] font-manrope">
                {"Back"}
              </div>
            </div>

            <div className="w-[10px]" />

            {[recordsObj.page - 1, recordsObj.page, recordsObj.page + 1].map(
              (pg) => {
                return (
                  <div className="flex" key={pg}>
                    <div
                      onClick={() => handlePageClick(pg)}
                      className={clsx({
                        "cursor-pointer rounded-md border border-black/5 px-[16px] py-[10px] font-manrope font-[600] text-[12px]": true,
                        "bg-blue-700 text-white": recordsObj.page === pg,
                        "bg-white text-black": recordsObj.page !== pg,
                      })}
                    >
                      {pg}
                    </div>

                    <div className="w-[10px]" />
                  </div>
                );
              }
            )}

            <div
              onClick={() => handleNext()}
              className="cursor-pointer flex items-center bg-white rounded-md border border-black/5 py-[8px] pl-[12px] pr-[8px]"
            >
              <div className="text-[12px] font-[600] font-manrope">
                {"Next"}
              </div>
              <div className="w-[6px]" />
              <div className="bg-gray-300 w-[26px] h-[26px] rounded-full flex items-center justify-center">
                <ChevronRightIcon className="size-4 fill-black" />
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

function getStatus(state) {
  if (!["Approved", "Under Data Verification"].includes(state)) {
    return "Pending";
  } else if (state === "Approved") {
    return "Approved";
  } else return "Rejected";
}
