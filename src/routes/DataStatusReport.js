/* eslint-disable react-hooks/exhaustive-deps */
import { FaArrowLeft } from "react-icons/fa6";
import { CustomGrayDark } from "../colors";

import DetailsIcon from "../icons/DetailsIcon";

import ColumnGraphBlock from "../components/ColumnGraphBlock";
import RecordsBlock from "../components/RecordsBlock";
import PageSelect from "../components/PageSelect";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { BiExport } from "react-icons/bi";
import { LuArrowBigRightDash } from "react-icons/lu";
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
  useFetchOwners,
  useFetchRecordsObj,
} from "../hooks/data_fetch_dsr";
import {
  useFetchLocations
} from "../hooks/data_fetch_methods"
import MyDatePicker from "../components/MyDatePicker";


function DSRReducer(state, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "fromDate change":
      return {
        ...state,
        fromDate: action.fromDate,
        currPage: 1,
        status: null,
      }
    case "toDate change":
      return {
        ...state,
        toDate: action.toDate,
        currPage: 1,
        status: null,
      }
    case "location change":
      return {
        ...state,
        location: action.location,
        category: [],
        indicator: [],
        owner: [],
        currPage: 1,
        status: null,
      };
    case "category change":
      return {
        ...state,
        category: action.category,
        indicator: [],
        owner: [],
        currPage: 1,
        status: null,
      };
    case "indicator change":
      return {
        ...state,
        indicator: action.indicator,
        owner: [],
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
        fromDate: null,
        toDate: null,
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
        fromDate: null,
        toDate: null,
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
    fromDate: null,
    toDate: null,
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
    fromDate,
    toDate,
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
    if(isFYStartLoading === false) {
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
    fetchCategories(location.map((locationObj, index) => { return [`location[${index}]`, locationObj.id]}));
  }, [location])
  
  useEffect(() => {
    fetchIndicators([
      ...location.map((locationObj, index) => { return [`location[${index}]`, locationObj.id]}),
      ...category.map((categoryObj, index) => { return [`category[${index}]`, categoryObj.id]})
    ]);
  }, [location, category])
  
  useEffect(() => {
    fetchOwners([
      ...location.map((locationObj, index) => { return [`location[${index}]`, locationObj.id]}),
      ...category.map((categoryObj, index) => { return [`category[${index}]`, categoryObj.id]}),
      ...indicator.map((indicatorObj, index) => { return [`indicator[${index}]`, indicatorObj.id]})
    ]);
  }, [location, category, indicator])

  useEffect(() => {
    if(FYOption) {
      fetchDashboard([
        ...location.map((locationObj, index) => { return [`location[${index}]`, locationObj.id]}),
        ...category.map((categoryObj, index) => { return [`category[${index}]`, categoryObj.id]}),
        ...indicator.map((indicatorObj, index) => { return [`indicator[${index}]`, indicatorObj.id]}),
        ...owner.map((ownerObj, index) => { return [`action_owner_id[${index}]`, ownerObj.id]}),
        ["year_filter", FYOption.FY],
        ["from_date", fromDate?.format("YYYY-MM-DD")],
        ["to_date", toDate?.format("YYYY-MM-DD")],
      ])
    }
  }, [location, category, indicator, owner, FYOption, fromDate, toDate])

  useEffect(() => {
    if(FYOption) {
      fetchRecordsObj({
        page: currPage,
        itemsPerPage: pageOption.option,
        location: location.map(loc => loc.id),
        category: category.map(cat => cat.id),
        indicator: indicator.map(indicat => indicat.id),
        status, 
        action_owner_id: owner.map(owner => owner.id),
        year_filter: FYOption.FY,
        from_date: fromDate?.format("YYYY-MM-DD"),
        to_date: toDate?.format("YYYY-MM-DD")
      })
    }
  }, [location, category, indicator, owner, FYOption, fromDate, toDate, pageOption.id, status, currPage])

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

  const [isConfirmPromptOpen, setIsConfirmPromptOpen] = useState(false);

  // helper function to close the menu
  function closeConfirmPrompt() {
    setIsConfirmPromptOpen(false);
  }

  const { renderLayer: renderConfirmPromptLayer, triggerProps: confirmPromptTriggerProps, layerProps: confirmPromptLayerProps, arrowProps: confirmPromptArrowProps } = useLayer({
    isOpen: isConfirmPromptOpen,
    onOutsideClick: closeConfirmPrompt, // close the menu when the user clicks outside
    onDisappear: closeConfirmPrompt, // close the menu when the menu gets scrolled out of sight
    overflowContainer: false, // keep the menu positioned inside the container
    auto: true, // automatically find the best placement
    placement: "right-start", // we prefer to place the menu "top-end"
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
              window.parent.history.go(-1);
            }}
            className="font-[600] font-manrope text-[15px] leading-[18px] select-none"
          >
            {"Back"}
          </div>
          <div className="w-[8px]" />
        </div>

        <div className="w-[24px]" />

        <div className="flex-1 leading-[40px] font-[600] text-[27px] font-roboto">
          {"Data Status Dashboard"}
        </div>

        <div
          {...detailsMenuTriggerProps}
          onClick={() => setIsDetailsMenuOpen(!isDetailsMenuOpen)}
          className="cursor-pointer rounded-full"
        >
          <DetailsIcon color={CustomGrayDark} />
        </div>
        {renderDetailsMenuLayer(
          <AnimatePresence>
            {isDetailsMenuOpen && (
              <div className="bg-white rounded-lg p-[4px]" {...detailsMenuLayerProps}>
                <div
                  onClick={() => {
                    console.log("export button clicked");

                    const params = [
                      ...location.map((locationObj, index) => { return [`location[${index}]`, locationObj.id]}),
                      ...category.map((categoryObj, index) => { return [`category[${index}]`, categoryObj.id]}),
                      ...indicator.map((indicatorObj, index) => { return [`indicator[${index}]`, indicatorObj.id]}),
                      ...owner.map((ownerObj, index) => { return [`action_owner_id[${index}]`, ownerObj.id]}),
                      ["year_filter", FYOption.FY],
                      ["from_date", fromDate?.format("YYYY-MM-DD")],
                      ["to_date", toDate?.format("YYYY-MM-DD")],
                      ["status", status],
                    ];
                    const paramsStr = getParamStr(params);

                    window.parent.postMessage(
                      { type: "handle_dsr_export", paramsStr },
                      "*"
                    );

                    closeDetailsMenu();

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
                <Arrow color="white" {...detailsMenuArrowProps} />
              </div>
            )}
          </AnimatePresence>
        )}
      </div>

      <div className="h-[28px]" />
      <div className="rounded-[8px] py-[14px] px-[24px] border-[0.5px] border-[#CDCDFF] flex justify-between items-center w-full">
        <div className="flex items-center">
          <MyDatePicker 
            maxDate={toDate}
            date={fromDate} 
            onClear={() => dispatch({type: "fromDate change", fromDate: null})}
            onChange={(newValue) => dispatch({type: "fromDate change", fromDate: newValue})}/>

          <div className="w-[4px]" />
          <LuArrowBigRightDash className="text-[24px] text-black/35" />
          <div className="w-[4px]" />
          
          <MyDatePicker 
            minDate={fromDate}
            date={toDate} 
            onClear={() => dispatch({type: "toDate change", toDate: null})}
            onChange={(newValue) => dispatch({type: "toDate change", toDate: newValue})}/>

          <div className="w-[16px]" />          

          {isLocationsLoading !== false ? (
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

          {isCategoriesLoading !== false ? (
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

          {isIndicatorsLoading !== false ? (
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

          {isOwnersLoading !== false ? (
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
        </div>

        <div className="flex items-center">
          <div className="w-[16px]" />
          <div
            onClick={() => dispatch({type: "clear all filters"})}
            className={clsx(
              "cursor-pointer rounded-full px-4 py-2 bg-red-400 text-sm/6 text-white tracking-wide whitespace-nowrap w-[78.5833px]",
              "hover:bg-red-500",
            )}
          >
            {"Clear".toUpperCase()}
          </div>
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
          {...confirmPromptTriggerProps}
          onClick={() => {
            // todo notify admin here .....
            if (recordsObj) {
              if (recordsObj.records.filter((record) => record.select).length === 0) {
                toast("Please choose atleast 1 record.", {
                  type: "error",
                  autoClose: 5000,
                });
                // window.alert("Please choose atleast 1 record.");
              } else {
                setIsConfirmPromptOpen(true)
              }
              // else if (
              //   window.confirm(
              //     `Are you sure you want to notify the admin about the chosen records?`
              //   )
              // ) {
              //   window.parent.postMessage(
              //     {
              //       type: "dsr_notify_admin",
              //       data: recordsObj.records
              //         .filter((record) => record.select)
              //         .map((record) => record.id),
              //     },
              //     "*"
              //   );
              //   toggleSelectAll(false);
              // }
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
        {renderConfirmPromptLayer(
          <AnimatePresence>
            {isConfirmPromptOpen && (
              <div className="bg-white rounded-lg p-[4px] w-[440px] h-[150px] p-4" {...confirmPromptLayerProps}>
                <div className="flex flex-col justify-between h-full text-[18px]">
                  {"Are you sure you want to notify the user about the chosen records?"}
                  <div className="flex justify-end">
                    <div 
                      onClick={() => {
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
                        closeConfirmPrompt();
                      }}
                      className="py-1 px-2 bg-green-700 rounded-lg text-white font-semibold text-[16px] cursor-pointer">
                      {"Yes".toUpperCase()}
                    </div>
                    <div className="w-[18px]" />
                    <div 
                      onClick={() => {
                        toggleSelectAll(false);
                        closeConfirmPrompt()
                      }}
                      className="py-1 px-2 bg-red-500 rounded-lg text-white font-semibold text-[16px] cursor-pointer">
                      {"No".toUpperCase()}
                    </div>
                  </div>
                </div>
                <Arrow color="white" {...confirmPromptArrowProps} />
              </div>
            )}
          </AnimatePresence>
        )}

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
        {isrecordsLoading !== false ? <RecordsLoader /> : null}
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