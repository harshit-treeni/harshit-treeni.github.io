import { useDataFetchGet } from "./data_fetch_methods";

export const useFetchSuppliers = () => {
  const [data, isLoading, dataFetchGet] = useDataFetchGet(
    "supplier_supplier_list",
    []
  );

  const fetchSuppliers = (params) => dataFetchGet("suppliers/suppliers.json", params);
  return [data, isLoading, fetchSuppliers];
};