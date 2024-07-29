/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useReducer } from "react";
import { useDataFetchGet } from "./data_fetch_methods"


export const useFetchCategories = () => {
  const [data, isLoading, dataFetchGet] = useDataFetchGet(
    "dsr_categories",
    { orgNode_category_details: [] }
  );

  const fetchCategories = (params) => dataFetchGet("data_fetch/category_list", params);
  return [
    data.orgNode_category_details,
    isLoading,
    fetchCategories,
  ];
};

export const useFetchIndicators = () => {
  const [data, isLoading, dataFetchGet] = useDataFetchGet(
    "dsr_indicators",
    { data_point_details: [] }
  );

  const fetchIndicators = (params) => dataFetchGet("data_fetch/category_data_point_list", params);
  return [data.data_point_details, isLoading, fetchIndicators];
};

export const useFetchOwners = () => {
  const [data, isLoading, dataFetchGet] = useDataFetchGet(
    "dsr_owners",
    []
  );

  const fetchOwners = (params) => dataFetchGet("data_fetch/action_owner_details", params);
  return [data, isLoading, fetchOwners];
};

export const useFetchDashboard = () => {
  const [data, isLoading, dataFetchGet] = useDataFetchGet("dsr_dashboard", {
    approved_records: 225000,
    pending_records: 205043,
    reject_records: 62700,
  });

  const fetchDashboard = (params) => dataFetchGet("data_fetch/dsr_data_dashboard", params)
  return [data, isLoading, fetchDashboard]
};

export const useFetchFYStart = () => {
  const [data, isLoading, dataFetchGet] = useDataFetchGet("dsr_FY_start", null)
  const fetchFYStart = () => dataFetchGet("client_logo/client_fy_start_month_and_modules")
  return [data, isLoading, fetchFYStart]  
}
  








export const useFetchRecordsObj = () => {
  const [{ recordsObj, isLoading }, dispatch] = useReducer(
    (state, action) => {
      // eslint-disable-next-line default-case
      switch (action.type) {
        case "recordsObj_loaded":
          return {
            recordsObj: action.recordsObj,
            isLoading: false,
          };
        case "recordsObj_loading":
          return {
            ...state,
            isLoading: true,
          };
        case "toggle_select_all":
          if (action.value !== undefined) {
            return {
              ...state,
              recordsObj: {
                ...state.recordsObj,
                records: state.recordsObj.records.map((record) => ({
                  ...record,
                  select: action.value,
                })),
                selectAll: action.value,
              },
            };
          } else
            return {
              ...state,
              recordsObj: {
                ...state.recordsObj,
                records: state.recordsObj.records.map((record) => ({
                  ...record,
                  select: !state.recordsObj.selectAll,
                })),
                selectAll: !state.recordsObj.selectAll,
              },
            };
        case "toggle_record_select":
          const row = action.row;
          const newDataArr = [...state.recordsObj.records];
          newDataArr[row] = {
            ...newDataArr[row],
            select: !newDataArr[row].select,
          };
          if (state.recordsObj.selectAll)
            return {
              ...state,
              recordsObj: {
                ...state.recordsObj,
                records: newDataArr,
                selectAll: false,
              }
            };
          else {
            let flag = true;
            state.recordsObj.records.forEach((record, index) => {
              if (index !== row) {
                if (!record.select) flag = false;
              }
            });

            if (!state.recordsObj.records[row].select && flag)
              return {
                ...state,
                recordsObj: {
                  ...state.recordsObj,
                  records: newDataArr,
                  selectAll: true,
                }
              };
            else 
              return { 
                ...state,
                recordsObj: { 
                  ...state.recordsObj, 
                  records: newDataArr
                }
              };
          }
      }
    },
    {
      recordsObj: null,
      isLoading: true,
    }
  );

  const onMessageListener = useCallback(async (e) => {
    if (e.data.type === "dsr_records") {
      dispatch({ 
        type: "recordsObj_loaded", 
        recordsObj: {
          ...e.data.response,
          records: e.data.response.records.map(mapRecord),
          selectAll: false
        }
      })
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", onMessageListener);
    return () => window.removeEventListener("message", onMessageListener);
  }, []);

  const toggleRecordSelect = (row) => dispatch({type: "toggle_record_select", row})
  const toggleSelectAll = (value) => dispatch({type: "toggle_select_all", value: value})


  const fetchRecordsObj = (body) => {
    window.parent.postMessage(
      {
        type: "fetch",
        method: "POST",
        path: "data_fetch/fetch_dsr_records",
        body,
        returnMessageType: "dsr_records",
      },
      "*"
    );
    dispatch({ type: "recordsObj_loading" })
  };
  return [recordsObj, isLoading, fetchRecordsObj, toggleRecordSelect, toggleSelectAll ];
};

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

function getStatus(state) {
  if (!["Approved", "Under Data Verification"].includes(state)) {
    return "Pending";
  } else if (state === "Approved") {
    return "Approved";
  } else return "Rejected";
}