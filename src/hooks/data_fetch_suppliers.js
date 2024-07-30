/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useReducer } from "react";
import { useDataFetchGet } from "./data_fetch_methods";

export const useFetchSuppliers = () => {
  const [data, isLoading, dataFetchGet] = useDataFetchGet(
    "supplier_supplier_list",
    []
  );

  const fetchSuppliers = (params) => dataFetchGet("suppliers/fetch_suppliers", params);
  return [data, isLoading, fetchSuppliers];
};

export const useUpdateSuppliers = () => {
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
    data: null,
    isLoading: false
  })

  const onMessageListener = useCallback(async (e) => {
    if (e.data.type === "update_suppliers") {
      dispatch({ type: "data_loaded", data: e.data.response})
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", onMessageListener);
    return () => window.removeEventListener("message", onMessageListener);
  }, []);

  const updateSuppliers = (suppliers) => {
    window.parent.postMessage(
      {
        type: "fetch",
        method: "PUT",
        path: "suppliers/bulk_update",
        body: suppliers,
        returnMessageType: "update_suppliers",
      },
      "*"
    );
    dispatch({ type: "data_loading" })
  };

  return [state.data, state.isLoading, updateSuppliers]
}