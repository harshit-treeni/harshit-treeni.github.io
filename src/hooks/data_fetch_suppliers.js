import { useDataFetchGet } from "./data_fetch_methods";

export const useFetchSuppliers = () => {
  const [data, isLoading, dataFetchGet] = useDataFetchGet(
    "supplier_supplier_list",
    []
  );

  const fetchSuppliers = (params) => dataFetchGet("suppliers/fetch_suppliers", params);
  return [data, isLoading, fetchSuppliers];
};