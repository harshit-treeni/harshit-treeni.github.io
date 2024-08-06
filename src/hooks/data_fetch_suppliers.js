import { useDataFetchDelete, useDataFetchGet, useDataFetchPost, useDataFetchPut } from "./data_fetch_methods";

export const useFetchSupplierNodeId = () => {
  const [data, isLoading, dataFetchGet] = useDataFetchGet("fetch_supplier_node_id", { id: null });
  const fetchSupplierNodeId = () => dataFetchGet("org_node_types/supplier_node_type.json");
  return [data.id, isLoading, fetchSupplierNodeId];
}

export const useFetchSuppliers = () => {
  const [data, isLoading, dataFetchGet] = useDataFetchGet("fetch_suppliers", []);
  const fetchSuppliers = () => dataFetchGet("suppliers/fetch_suppliers");
  const suppliers = data.map(sup => ({
    select: false,
    ...sup
  }));
  return [suppliers, isLoading, fetchSuppliers];
};

export const useUpdateSuppliers = () => {
  const [data, isLoading, dataFetchPut] = useDataFetchPut("update_suppliers", null);
  const updateSuppliers = (params) => dataFetchPut("suppliers/bulk_update", params);
  return [data, isLoading, updateSuppliers];
}

export const useCreateSuppliers = () => {
  const [data, isLoading, dataFetchPost] = useDataFetchPost("create_suppliers", null);
  const createSuppliers = (params) => dataFetchPost("suppliers/bulk_create", params);
  return [data, isLoading, createSuppliers];
}

export const useDeleteSuppliers = () => {
  const [data, isLoading, dataFetchDelete] = useDataFetchDelete("delete_suppliers", null);
  const deleteSuppliers = (params) => dataFetchDelete("suppliers/bulk_delete", params);
  return [data, isLoading, deleteSuppliers];
}
