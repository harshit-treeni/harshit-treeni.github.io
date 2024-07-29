/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useReducer } from "react";

/* 
  the below function expects an array of query parameters like => 
  [
    [key, value]
    [key, value]
    [key, value]
    [key, value]
  ]
*/

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

export const useDataFetchGet = (returnMessageType, init) => {
  const [ state, dispatch] = useReducer(
    (state, action) => {
      // eslint-disable-next-line default-case
      switch (action.type) {
        case "data_loaded":
          return {
            data: action.data,
            isLoading: false
          }
        case "data_loading":
          return {
            ...state,
            isLoading: true
          }
      }
    },{
    data: init,
    isLoading: true
  })


  const onMessageListener = useCallback(async (e) => {
    if (e.data.type === returnMessageType) {
      dispatch({ type: "data_loaded", data: e.data.response})
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", onMessageListener);
    return () => window.removeEventListener("message", onMessageListener);
  }, []);

  const dataFetchGet = (path, params) => {
    window.parent.postMessage(
      {
        type: "fetch",
        method: "GET",
        path: path + getParamStr(params),
        returnMessageType,
      },
      "*"
    );
    dispatch({type: "data_loading"})
  };

  return [state.data, state.isLoading, dataFetchGet];
};


export const useFetchModules = () => {
  const [data, isLoading, dataFetchGet] = useDataFetchGet("dsr_sidebar_modules", null)
  const fetchModules = () => dataFetchGet("product/modules.json")
  return [data, isLoading, fetchModules]
}

export const useFetchLocations = () => {
  const [data, isLoading, dataFetchGet] = useDataFetchGet(
    "dsr_locations",
    []
  );

  const fetchLocations = (params) => dataFetchGet("goals/org_nodes.json", params);
  return [data, isLoading, fetchLocations];
};
