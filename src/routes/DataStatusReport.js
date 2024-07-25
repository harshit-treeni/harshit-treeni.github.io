/* eslint-disable react-hooks/exhaustive-deps */
import { FaArrowLeft } from "react-icons/fa6";
import { CustomGrayDark } from "../colors";

import DetailsIcon from "../icons/DetailsIcon";

import ColumnGraphBlock from "../components/ColumnGraphBlock";
import RecordsBlock from "../components/RecordsBlock";
import PageSelect from "../components/PageSelect";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { BiExport } from "react-icons/bi";
import MyComboBox from "../components/MyComboBox";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import clsx from "clsx";

import RecordsLoader from "../components/RecordsLoader";
import ComboBoxLoader from "../components/ComboBoxLoader";
import { Arrow, useLayer } from "react-laag";
import { AnimatePresence } from "framer-motion";
import FYSelect from "../components/FYSelect";

import {
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { toast } from "react-toastify";
import {
  useFetchCategories,
  useFetchDashboard,
  useFetchFYStart,
  useFetchIndicators,
  useFetchLocations,
  useFetchOwners,
  useFetchRecordsObj,
} from "../hooks/data_fetch_methods";

function DSRReducer(state, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "location change":
      return {
        ...state,
        location: action.location,
        currPage: 1,
        status: null,
      };
    case "category change":
      return {
        ...state,
        category: action.category,
        currPage: 1,
        status: null,
      };
    case "indicator change":
      return {
        ...state,
        indicator: action.indicator,
        currPage: 1,
        status: null,
      };
    case "owner change":
      return {
        ...state,
        owner: action.owner,
        currPage: 1,
        status: null,
      };
    case "clear all filters":
      return {
        ...state,
        location: [],
        category: [],
        indicator: [],
        owner: [],
        currPage: 1,
        status: null,
      }
    case "status change":
      return {
        ...state,
        status: action.status,
        currPage: 1,
      };
    case "pageOption change":
      return {
        ...state,
        pageOption: action.pageOption,
        currPage:
          Math.floor(
            (state.pageOption.option * (state.currPage - 1) + 1) /
              action.pageOption.option
          ) + 1,
      };
    case "FYOption change":
      return {
        ...state,
        FYOption: action.FYOption,
        currPage: 1,
        status: null,
      };
    case "currPage change":
      return {
        ...state,
        currPage: action.currPage
      }
  }
  throw Error("Unknown action type " + action.type);
}


const date = new Date();
const month = date.getMonth();
const year = date.getFullYear();

export default function DataStatusReport() {
  const toastID = useRef(null);
  
  const [FYStart, isFYStartLoading, fetchFYStart] = useFetchFYStart()
  const [locations, isLocationsLoading, fetchLocations] = useFetchLocations();
  const [categories, isCategoriesLoading, fetchCategories] = useFetchCategories();
  const [indicators, isIndicatorsLoading, fetchIndicators] = useFetchIndicators();
  const [owners, isOwnersLoading, fetchOwners] = useFetchOwners();
  // eslint-disable-next-line no-unused-vars
  const [dashboard, isDashboardLoading, fetchDashboard] = useFetchDashboard();
  const [recordsObj, isrecordsLoading, fetchRecordsObj, toggleRecordSelect, toggleSelectAll] = useFetchRecordsObj();

  const [state, dispatch] = useReducer(DSRReducer, {
    location: [],
    category: [],
    indicator: [],
    owner: [],
    status: null,
    currPage: 1,
    pageOption: { id: 1, option: 10 },
    FYOption: null
  })

  const {
    location,
    category,
    indicator,
    owner,
    status,
    currPage,
    pageOption,
    FYOption
  } = state

  const onMessageListener = useCallback(e => {
    if (e.data.type === "dsr_export_success") {
      toast.update(toastID.current, {
        render: "Exported file successfully",
        type: "success",
        autoClose: 5000,
      });
    }
  }, [])

  useEffect(() => {
    window.addEventListener("message", onMessageListener);
    return () => window.removeEventListener("message", onMessageListener);
  }, [onMessageListener]);


  useEffect(() => {
    if(!isFYStartLoading) {
      if (FYStart.fin_start_month === 4) {
        dispatch({ type: "FYOption change", FYOption: {
          id: 1,
          option: month < 3 ? year : year + 1,
          FY: month < 3 ? `${year - 1}-${year}` : `${year}-${year + 1}`,
          startMonth: 4,
        } })
      } else {
        dispatch({ type: "FYOption change", FYOption: {
          id: 1,
          option: year,
          FY: `${year}-${year + 1}`,
          startMonth: 1,
        } })
      }
    }
  }, [isFYStartLoading, FYStart])


  useEffect(() => {
    fetchFYStart()
    fetchLocations();
  }, []);
  
  useEffect(() => {
    fetchCategories([
      // ["location", location ? location._id : null]
    ]);    
  }, [])
  // }, [location])
  
  useEffect(() => {
    fetchIndicators([
      // ["location", location ? location._id : null],
      // ["category", category ? category._id : null],
    ]);
  }, [])
  // }, [location, category])
  
  useEffect(() => {
    fetchOwners([
      // ["location", location ? location._id : null],
      // ["category", category ? category._id : null],
      // ["indicator", indicator ? indicator._id : null],
    ]);
  }, [])
  // }, [location, category, indicator])

  useEffect(() => {
    if(FYOption) {
      fetchDashboard([
        // ["location", location ? location._id : null],
        // ["category", category ? category.name : null],
        // ["indicator", indicator ? indicator.id : null],
        // ["action_owner_id", owner ? owner.id : null],
        ["year_filter", FYOption.FY],
      ])
    }
  }, [FYOption])
  // }, [location, category, indicator, owner, FYOption])

  useEffect(() => {
    if(FYOption) {
      fetchRecordsObj({
        page: currPage,
        itemsPerPage: pageOption.option,
        // selectedLocation:
        //   location === null
        //     ? null
        //     : { label: location.name, value: location.id },
        // Category:
        //   category === null
        //     ? null
        //     : { label: category.name, value: category.id },
        // selectedIndicator:
        //   indicator === null
        //     ? null
        //     : { label: indicator.name, value: indicator.id },
        status: status, 
        // action_owner_id: owner ? owner.id : null,
        year_filter: FYOption.FY,
      })
    }
  }, [FYOption, pageOption.id, status, currPage])
  // }, [location, category, indicator, owner, FYOption, pageOption.id, status, currPage])

  const [isOpen, setOpen] = useState(false);

  // helper function to close the menu
  function close() {
    setOpen(false);
  }

  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen,
    onOutsideClick: close, // close the menu when the user clicks outside
    onDisappear: close, // close the menu when the menu gets scrolled out of sight
    overflowContainer: false, // keep the menu positioned inside the container
    auto: true, // automatically find the best placement
    placement: "bottom-end", // we prefer to place the menu "top-end"
    triggerOffset: 12, // keep some distance to the trigger
    containerOffset: 16, // give the menu some room to breath relative to the container
    arrowOffset: 16, // let the arrow have some room to breath also
  });

  return (
    <div className="p-[48px] flex flex-col justify-start items-start ">
      <div className="w-full flex items-center">
        <div className="rounded-full p-[8px] bg-[white] flex items-center cursor-pointer">
          <div className="bg-gray-palette-lightest/[0.1] rounded-full w-[24px] h-[24px] flex justify-center items-center">
            <FaArrowLeft className="text-gray-palette-lightest text-[14px]" />
          </div>
          <div className="w-[8px]" />
          <div
            onClick={() => {
              window.history.go(-1);
            }}
            className="font-[600] font-manrope text-[15px] leading-[18px] select-none"
          >
            {"Back"}
          </div>
          <div className="w-[8px]" />
        </div>

        <div className="w-[24px]" />

        <div className="flex-1 leading-[40px] font-[600] text-[27px]">
          {"Data Management / Data Status Report"}
        </div>

        <div
          {...triggerProps}
          onClick={() => setOpen(!isOpen)}
          className="cursor-pointer rounded-full"
        >
          <DetailsIcon color={CustomGrayDark} />
        </div>
        {renderLayer(
          <AnimatePresence>
            {isOpen && (
              <div className="bg-white rounded-lg p-[4px]" {...layerProps}>
                <div
                  onClick={() => {
                    console.log("export button clicked");

                    const params = [
                      ["location", location ? location._id : null],
                      ["category", category ? category.name : null],
                      ["indicator", indicator ? indicator.id : null],
                      ["action_owner_id", owner ? owner.id : null],
                      ["year_filter", FYOption.FY],
                      ["status", status],
                    ];
                    const paramsStr = getParamStr(params);

                    window.parent.postMessage(
                      { type: "handle_dsr_export", paramsStr },
                      "*"
                    );

                    close();

                    toastID.current = toast(<ExportLoadingToast />, {
                      type: "info",
                      autoClose: false,
                    });
                  }}
                  className="text-gray-500 cursor-pointer hover:bg-gray-50 rounded-md py-[8px] px-[12px] flex items-center"
                >
                  <BiExport className="text-gray-500 text-[28px] pr-[8px]" />
                  Export
                </div>
                <Arrow color="white" {...arrowProps} />
              </div>
            )}
          </AnimatePresence>
        )}
      </div>

      <div className="h-[28px]" />
      <div className="rounded-[8px] py-[14px] px-[24px] border-[0.5px] border-[#CDCDFF] flex items-center w-full">
        <div className="font-manrope font-[600] text-[16px] leading-[20px]">
          Select one or multiple filters
        </div>

        <div className="w-[32px]" />

        {isLocationsLoading ? (
          <ComboBoxLoader type={"simple"} />
        ) : (
          <MyComboBox
            placeholder={"Location"}
            value={location}
            onClear={() => dispatch({ type: "location change", location: [] })}
            onChange={(value) =>
              dispatch({ type: "location change", location: value })
            }
            options={locations}
          />
        )}
        <div className="w-[16px]" />

        {isCategoriesLoading ? (
          <ComboBoxLoader type={"simple"} />
        ) : (
          <MyComboBox
            placeholder={"Category"}
            value={category}
            onClear={() => dispatch({ type: "category change", category: [] })}
            onChange={(value) =>
              dispatch({ type: "category change", category: value })
            }
            options={categories}
          />
        )}
        <div className="w-[16px]" />

        {isIndicatorsLoading ? (
          <ComboBoxLoader type={"simple"} />
        ) : (
          <MyComboBox
            placeholder={"Indicator"}
            value={indicator}
            onClear={() =>
              dispatch({ type: "indicator change", indicator: [] })
            }
            onChange={(value) =>
              dispatch({ type: "indicator change", indicator: value })
            }
            options={indicators}
          />
        )}
        <div className="w-[16px]" />

        {isOwnersLoading ? (
          <ComboBoxLoader type={"simple"} />
        ) : (
          <MyComboBox
            placeholder={"Owner"}
            value={owner}
            onClear={() => dispatch({ type: "owner change", owner: [] })}
            onChange={(value) =>
              dispatch({ type: "owner change", owner: value })
            }
            options={owners}
          />
        )}

        <div className="w-[16px]" />
        <div
          onClick={() => dispatch({type: "clear all filters"})}
          className={clsx(
            "cursor-pointer rounded-full px-6 py-2 bg-red-400 text-sm/6 text-white font-bold tracking-wide",
            "hover:bg-red-500",
          )}
        >
          {"Clear All".toUpperCase()}
        </div>
      </div>

      <div className="h-[28px]" />
      <ColumnGraphBlock
        rawData={dashboard}
        setStatus={(value) =>
          dispatch({ type: "status change", status: value })
        }
      />

      <div className="h-[28px]" />
      <div className="flex justify-between items-end w-full">
        <div
          onClick={() => {
            // todo notify admin here .....
            if (recordsObj) {
              if (
                recordsObj.records.filter((record) => record.select).length ===
                0
              )
                window.alert("Please choose atleast 1 record.");
              else if (
                window.confirm(
                  `Are you sure you want to notify the admin about the chosen records?`
                )
              ) {
                window.parent.postMessage(
                  {
                    type: "dsr_notify_admin",
                    data: recordsObj.records
                      .filter((record) => record.select)
                      .map((record) => record.id),
                  },
                  "*"
                );
                toggleSelectAll(false);
              }
            }
          }}
          className="bg-gray-palette-lightest rounded-full font-manrope text-[16px] font-[600] leading-[16px] py-[16px] px-[20px] text-white cursor-pointer"
        >
          Notify User{" "}
          {recordsObj
            ? recordsObj.records.reduce(
                (accumalator, record) => accumalator + (record.select ? 1 : 0),
                0
              )
            : null}
        </div>

        <div className="flex items-center">
          <div className="font-manrope font-[600] text-[16px] leading-[20px]">
            {"Select Financial Year"}
          </div>
          <div className="w-[16px]" />
          {FYOption ? (
            <FYSelect
              value={FYOption}
              onChange={(value) => {
                if (value.id !== FYOption.id)
                  dispatch({ type: "FYOption change", FYOption: value });
              }}
            />
          ) : null}
        </div>
      </div>
      <div className="h-[42px]" />
      <div className="w-full rounded-[14px] overflow-hidden relative">
        <RecordsBlock
          recordsObj={
            recordsObj === null ? { records: [], selectAll: false } : recordsObj
          }
          toggleRecordSelect={toggleRecordSelect}
          toggleSelectAll={toggleSelectAll}
        />
        {isrecordsLoading ? <RecordsLoader /> : null}
      </div>
      <div className="h-[28px]" />
      <div className="flex items-center justify-between w-full">
        <div className="text-gray-500 text-[14px] font-manrope flex items-center">
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
            onChange={(value) => {
              if (value.id !== pageOption.id)
                dispatch({ type: "pageOption change", pageOption: value });
            }}
          />
        </div>
        <PaginationBlock
          recordsObj={recordsObj}
          setCurrPage={(pg) =>
            dispatch({ type: "currPage change", currPage: pg })
          }
        />
      </div>
    </div>
  );
}

function PaginationBlock({ recordsObj, setCurrPage }) {
  const handleFirst = () => setCurrPage(1);
  const handleLast = () => setCurrPage(recordsObj?.totalPages);
  const handlePageClick = (pg) => setCurrPage(pg)
  const handleNext = () => setCurrPage(recordsObj.page + 1)
  const handlePrev = () => setCurrPage(recordsObj.page - 1)

  if (!recordsObj || recordsObj.totalPages === 1) return null;
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
                    "bg-gray-palette-lightest text-white":
                      recordsObj.page === pg,
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
      return <div className="flex items-center">
        {[1, 2, 3].map((pg) => {
          return (
            <div className="flex" key={pg}>
              <div
                onClick={() => handlePageClick(pg)}
                className={clsx({
                  "cursor-pointer rounded-md border border-black/5 px-[16px] py-[10px] font-manrope font-[600] text-[12px]": true,
                  "bg-gray-palette-lightest text-white": recordsObj.page === pg,
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
                      "bg-gray-palette-lightest text-white":
                        recordsObj.page === pg,
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
              <div className="select-none text-[12px] font-[600] font-manrope">
                {"Next"}
              </div>
              <div className="w-[6px]" />
              <div className="bg-gray-300 w-[26px] h-[26px] rounded-full flex items-center justify-center">
                <ChevronRightIcon className="size-4 fill-black" />
              </div>
            </div>

            <div className="w-[10px]" />

            <div
              onClick={() => handleLast()}
              className="cursor-pointer flex items-center bg-white rounded-md border border-black/5 py-[8px] pl-[12px] pr-[8px]"
            >
              <div className="select-none text-[12px] font-[600] font-manrope">
                {"Last"}
              </div>
              <div className="w-[6px]" />
              <div className="bg-gray-300 w-[26px] h-[26px] rounded-full flex items-center justify-center">
                <MdKeyboardDoubleArrowRight className="size-4 fill-black" />
              </div>
            </div>
          </div>
        );
      } else if (recordsObj.page === recordsObj.totalPages) {
        return (
          <div className="flex items-center">
            <div
              onClick={() => handleFirst()}
              className="cursor-pointer flex items-center bg-white rounded-md border border-black/5 py-[8px] pr-[12px] pl-[8px]"
            >
              <div className="bg-gray-300 w-[26px] h-[26px] rounded-full flex items-center justify-center">
                <MdOutlineKeyboardDoubleArrowLeft className="size-4 fill-black" />
              </div>
              <div className="w-[6px]" />
              <div className="select-none text-[12px] font-[600] font-manrope">
                {"First"}
              </div>
            </div>

            <div className="w-[10px]" />

            <div
              onClick={() => handlePrev()}
              className="cursor-pointer flex items-center bg-white rounded-md border border-black/5 py-[8px] pr-[12px] pl-[8px]"
            >
              <div className="bg-gray-300 w-[26px] h-[26px] rounded-full flex items-center justify-center">
                <ChevronLeftIcon className="size-4 fill-black" />
              </div>
              <div className="w-[6px]" />
              <div className="select-none text-[12px] font-[600] font-manrope">
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
                      "bg-gray-palette-lightest text-white":
                        recordsObj.page === pg,
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
              onClick={() => handleFirst()}
              className="cursor-pointer flex items-center bg-white rounded-md border border-black/5 py-[8px] pr-[12px] pl-[8px]"
            >
              <div className="bg-gray-300 w-[26px] h-[26px] rounded-full flex items-center justify-center">
                <MdOutlineKeyboardDoubleArrowLeft className="size-4 fill-black" />
              </div>
              <div className="w-[6px]" />
              <div className="select-none text-[12px] font-[600] font-manrope">
                {"First"}
              </div>
            </div>

            <div className="w-[10px]" />

            <div
              onClick={() => handlePrev()}
              className="cursor-pointer flex items-center bg-white rounded-md border border-black/5 py-[8px] pr-[12px] pl-[8px]"
            >
              <div className="bg-gray-300 w-[26px] h-[26px] rounded-full flex items-center justify-center">
                <ChevronLeftIcon className="size-4 fill-black" />
              </div>
              <div className="w-[6px]" />
              <div className="select-none text-[12px] font-[600] font-manrope">
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
                        "bg-gray-palette-lightest text-white":
                          recordsObj.page === pg,
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
              <div className="select-none text-[12px] font-[600] font-manrope">
                {"Next"}
              </div>
              <div className="w-[6px]" />
              <div className="bg-gray-300 w-[26px] h-[26px] rounded-full flex items-center justify-center">
                <ChevronRightIcon className="size-4 fill-black" />
              </div>
            </div>

            <div className="w-[10px]" />

            <div
              onClick={() => handleLast()}
              className="cursor-pointer flex items-center bg-white rounded-md border border-black/5 py-[8px] pl-[12px] pr-[8px]"
            >
              <div className="select-none text-[12px] font-[600] font-manrope">
                {"Last"}
              </div>
              <div className="w-[6px]" />
              <div className="bg-gray-300 w-[26px] h-[26px] rounded-full flex items-center justify-center">
                <MdKeyboardDoubleArrowRight className="size-4 fill-black" />
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

const ExportLoadingToast = () => {
  const [str, setStr] = useState(".");

  setTimeout(() => {
    setStr((prev) => {
      if (prev.length === 4) return "";
      else return prev + ".";
    });
  }, 400);

  return <>{`Preparing export file${str}`}</>;
};

const getParamStr = (paramsArr) => {
  let paramsStr = "";
  if (paramsArr)
    paramsArr.forEach((param, index) => {
      if (param[1]) {
        paramsStr += `${param[0]}=${param[1]}`;
        if (paramsArr.length - 1 !== index) paramsStr += "&";
      }
    });
  return paramsStr !== "" ? "?" + paramsStr : paramsStr;
}