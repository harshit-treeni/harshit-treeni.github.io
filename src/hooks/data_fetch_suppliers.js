import { useDataFetchGet, useDataFetchPost, useDataFetchPut } from "./data_fetch_methods";

export const useFetchSuppliers = () => {
  const [data, isLoading, dataFetchGet] = useDataFetchGet("fetch_suppliers", []);
  const fetchSuppliers = () => dataFetchGet("suppliers/fetch_suppliers");
  return [data, isLoading, fetchSuppliers];
};

export const useUpdateSuppliers = () => {
  const [data, isLoading, dataFetchPut] = useDataFetchPut("update_suppliers", []);
  const updateSuppliers = (params) => dataFetchPut("suppliers/bulk_update", params);
  return [data, isLoading, updateSuppliers];
}

export const useCreateSuppliers = () => {
  const [data, isLoading, dataFetchPost] = useDataFetchPost("create_suppliers", []);
  const createSuppliers = (params) => dataFetchPost("suppliers/bulk_create", params);
  return [data, isLoading, createSuppliers];
}
