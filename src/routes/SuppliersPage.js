/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useRef, useEffect } from "react";
import DataEditor, { GridCellKind } from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import { BiSearchAlt } from "react-icons/bi";
import { useLayer } from "react-laag";
import { useCreateSuppliers, useDeleteSuppliers, useFetchSupplierNodeId, useFetchSuppliers, useUpdateSuppliers } from "../hooks/data_fetch_suppliers";
import { useFetchOrgNodes } from "../hooks/data_fetch_methods";

import MyComboBox from "./../components/MyComboBox"
import RecordsLoader from "../components/RecordsLoader";

const teal = {
  primaryColor: "#009688", // Teal
  secondaryColor: "#4DB6AC", // Light Teal
  accentColor: "#00796B", // Dark Teal
  accentDark: "#004D40", // Darker Teal
  backgroundColor: "#E0F2F1", // Very Light Teal
  textColor: "#00352F", // Nearly Black Teal
  lightAccentColor: "#B2DFDB", // Pale Teal
  headerTextColor: "#FFFFFF", // White (for contrast)
};

const customTheme = {
  accentColor: teal.accentColor,
  textDark: teal.textColor,
  textMedium: teal.textColor,
  textLight: teal.textColor,
  textBubble: teal.backgroundColor,
  bgIconHeader: teal.accentDark,
  fgIconHeader: teal.headerTextColor,
  textHeader: teal.headerTextColor,
  bgCell: teal.backgroundColor,
  bgCellMedium: teal.backgroundColor,
  bgHeader: teal.accentDark,
  bgHeaderHasFocus: teal.accentColor,
  bgHeaderHovered: teal.accentColor,
  borderColor: "transparent",
  headerFontStyle: "600 22px",
  baseFontStyle: "18px",
  fontFamily: "Inter",
  cellHorizontalPadding: 36,
  editorFontSize: "20px",
};

const headerIcons = {
  "checkbox-unchecked": (p) =>
    `<svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5C5.44772 5 5 5.44772 5 6V13V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V13V6C19 5.44772 18.5523 5 18 5H6ZM3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V13V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V13V6Z" fill="#fff"></path> </g></svg>`,
  "checkbox-checked": (p) =>
    `<svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 21 21"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g></svg>`,
};

export default function SuppliersPage() {
  const gridRef = useRef(null);
  
  const [orgNodes, isOrgNodesLoading, fetchOrgNodes] = useFetchOrgNodes()
  const [supplierNodeId, isSupplierNodeIdLoading, fetchSupplierNodeId] = useFetchSupplierNodeId()

  const [suppliers, isSuppliersLoading, fetchSuppliers] = useFetchSuppliers()
  const [updateSuppliersResponse, isSuppliersUpdating, updateSuppliers] = useUpdateSuppliers()
  const [createSuppliersResponse, isSuppliersCreating, createSuppliers] = useCreateSuppliers()
  const [deleteSuppliersResponse, isSuppliersDeleting, deleteSuppliers] = useDeleteSuppliers()
  
  const [data, setData] = useState([]);
  // const [gridSelection, setGridSelection] = useState();
  const [selectAllSuppliers, setSelectAllSuppliers] = useState(false)

  const columns = [
    {
      title: "",
      id: "select",
      width: 60,
      icon: selectAllSuppliers ? "checkbox-checked" : "checkbox-unchecked",
      themeOverride: {
        ...customTheme,
        cellHorizontalPadding: 19,
      },
    },
    { title: "Supplier Name", id: "supplier_name", grow: 1 },
    { title: "Locations", id: "supplies_to_locations", grow: 3 },
    { title: "Contact Person", id: "contact_person_name", grow: 1 },
    { title: "Email", id: "contact_person_email", grow: 1 },
    { title: "Address", id: "supplier_address", grow: 1 },
  ];
  
  useEffect(() => {
    fetchOrgNodes()
    fetchSupplierNodeId()
  }, [])

  useEffect(() => {
    if(!isSuppliersCreating && !isSuppliersUpdating && !isSuppliersDeleting) {
      fetchSuppliers()
    }
  }, [isSuppliersCreating, isSuppliersUpdating, isSuppliersDeleting])

  useEffect(() => {
    if(isSuppliersLoading === false) setData(suppliers)
  }, [isSuppliersLoading])


  const getCellContent = useCallback(
    (cell) => {
      const [col, row] = cell;
      const dataRow = data[row];
      const dataKey = columns.map((obj) => obj.id)[col];
      const cellData = dataRow[dataKey];

      if (dataKey === "select") {
        return {
          kind: GridCellKind.Boolean,
          displayData: cellData,
          data: cellData,
          contentAlign: "center"
        };
      }

      if (dataKey === "supplies_to_locations") {
        return {
          kind: GridCellKind.Text,
          allowOverlay: false,
          readonly: true,
          displayData: cellData.map(obj => obj.name).join(", "),
          data: cellData,
          themeOverride: cellData.length === 0
            ? {
                ...customTheme,
                bgCell: "#FF000026",
              }
            : {
                ...customTheme,
                bgCell: row % 2 === 0 ? "white" : teal.lightAccentColor,
              },
        };
      }

      return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        readonly: dataKey === "contact_person_email" && dataRow.id ? true : false,
        displayData: cellData?.toString() || "",
        data: cellData,
        themeOverride: (dataKey !== "contact_person_email" && [undefined, "", null].includes(cellData)) || (dataKey === "contact_person_email" && !isEmailValid(cellData))
          ? {
              ...customTheme,
              bgCell: "#FF000026",
            }
          : {
              ...customTheme,
              bgCell: row % 2 === 0 ? "white" : teal.lightAccentColor,
            },
      };
    },
    [data]
  );

  const onCellEdited = useCallback(
    (cell, newValue) => {
      const [col, row] = cell;
      const dataKey = columns.map((obj) => obj.id)[col];

      let newSelectedAllSuppliers = null
      setData((prevData) => {
        const newData = [...prevData];
        if (dataKey === "select") {
          const unselectedRows = newData.map((sup, indx) => ({...sup, indx})).filter(sup => !sup.select)
          if(unselectedRows.length === 0) {
            newSelectedAllSuppliers = false
          } else if (unselectedRows.length === 1 && (unselectedRows[0].indx === row)) {
            newSelectedAllSuppliers = true
          }
            
          newData[row] = {
            ...newData[row],
            [dataKey]: newValue.data
          }
          } else if (dataKey === "supplier_name") {
          newData[row] = { 
            ...newData[row], 
            [dataKey]: newValue.data, 
            supplier_edit_data: {
              ...newData[row].supplier_edit_data,
              name: newValue.data
            }
          };
        } else if (dataKey === "contact_person_name") {
          newData[row] = { 
            ...newData[row], 
            [dataKey]: newValue.data, 
            supplier_edit_data: {
              ...newData[row].supplier_edit_data,
              supplier_user: {
                ...newData[row].supplier_edit_data.supplier_user,
                name: newValue.data
              }
            }
          };
        } else if (dataKey === "contact_person_email") {
          newData[row] = { 
            ...newData[row], 
            [dataKey]: newValue.data,
          }
        } else if (dataKey === "supplier_address") {
          newData[row] = { 
            ...newData[row], 
            [dataKey]: newValue.data, 
            supplier_edit_data: {
              ...newData[row].supplier_edit_data,
              address: newValue.data
            }
          };
        }

        newData[row] = { ...newData[row], [dataKey]: newValue.data };
        return newData;
      });

      if(newSelectedAllSuppliers !== null) {
        setSelectAllSuppliers(newSelectedAllSuppliers)
      }
    },
    [data]
  );

  // const copySelection = useCallback(() => {
  //   if (gridSelection?.current === undefined) return "";

  //   const { x, y, width, height } = gridSelection.current.range;
  //   let result = "";

  //   for (let row = y; row < y + height; row++) {
  //     for (let col = 0; col < x; col++) result += "\t";
  //     for (let col = x; col < x + width; col++) {
  //       const cell = getCellContent([col, row]);
  //       result += cell.data;
  //       if (col < x + width - 1) result += "\t";
  //     }
  //     for (let col = x + width; col < 5; col++) result += "\t";
  //     if (row < y + height - 1) result += "\n";
  //   }

  //   return result;
  // }, [gridSelection, getCellContent]);

  // const pasteData = useCallback((pasteString) => {
  //   const rows = pasteString.split("\n");
  //   const newData = rows.map((row) => {
  //     const cells = row.split("\t");
  //     return {
  //       supplier: cells[0],
  //       locations: cells[1],
  //       person: cells[2],
  //       email: cells[3],
  //       address: cells[4],
  //     };
  //   });

  //   setData((prevData) => [...newData, ...prevData]);
  // }, []);

  // const onKeyDown = useCallback(
  //   (e) => {
  //     if (e.key === "c" && (e.ctrlKey || e.metaKey)) {
  //       const copyText = copySelection();
  //       navigator.clipboard.writeText(copyText).then(() => {
  //         console.log("Copied to clipboard");
  //       });
  //     } else if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
  //       navigator.clipboard.readText().then((pasteText) => {
  //         pasteData(pasteText);
  //       });
  //     }
  //   },
  //   [copySelection, pasteData]
  // );

  const getRowThemeOverride = useCallback((row) => {
    return {
      bgCell: row % 2 === 0 ? "white" : teal.lightAccentColor,
    };
  }, []);

  const [menu, setMenu] = React.useState();
  const isOpen = menu !== undefined;
  const { layerProps, renderLayer } = useLayer({
    isOpen,
    auto: true,
    placement: "bottom-start",
    triggerOffset: 2,
    onOutsideClick: (...args) => {
      if(document.getElementById("headlessui-portal-root"))
        return 
      
      if (menu?.first === true) {
        setMenu({ ...menu, first: false });
      } else {
        setMenu(undefined);
      }      
    },
    trigger: {
      getBounds: () => ({
        left: menu?.bounds.x ?? 0,
        top: menu?.bounds.y ?? 0,
        width: menu?.bounds.width ?? 0,
        height: menu?.bounds.height ?? 0,
        right: (menu?.bounds.x ?? 0) + (menu?.bounds.width ?? 0),
        bottom: (menu?.bounds.y ?? 0) + (menu?.bounds.height ?? 0),
      }),
    },
  });

  const handleCellClicked = (...args) => {
    // supplies to locations click
    if (args[0][0] === 2)
      if (menu?.cell[1] !== args[0][1])
        setMenu({ cell: args[0], bounds: args[1].bounds, first: true });
  };

  return (
    <div className="p-[48px]">
      <div className="flex justify-between items-end">
        <div className="flex flex-col items-start justify-start">
          <div className="text-[36px] text-teal-text">List of Suppliers</div>

          <div className="h-[12px]" />
          <div className="w-[300px] relative">
            <input
              className="focus:outline-none pl-[40px] pb-[4px] pr-[8px] bg-gray-100 placeholder:text-[22px] placeholder:text-teal-accent text-[22px] text-teal-text border-teal-text border-b-[2px] w-full"
              placeholder="Search"
            />
            <BiSearchAlt className="absolute top-[4px] left-[8px] text-[24px] text-teal-text" />
          </div>
        </div>

        <div className="flex flex-col items-end justify-start">
          <div
            onClick={() => {
              if(gridRef.current === null || !supplierNodeId) return

              gridRef.current.scrollTo(0, 0)
              setData([
                {
                  select: false,
                  supplier_name: "",
                  supplies_to_locations: [],
                  contact_person_name: "",
                  contact_person_email: "",
                  supplier_address: "",
                  supplier_node_id: supplierNodeId
                },
                ...data,
              ]);
            }}
            className="bg-teal-accent-dark text-white text-[16px] rounded-xl px-[14px] py-[10px]"
          >
            ADD NEW SUPPLIER
          </div>
          <div className="h-[6px]" />
          <div className="bg-teal-accent-dark text-white text-[16px] rounded-xl px-[14px] py-[10px]">
            ADD CSV
          </div>
        </div>
      </div>

      <div className="h-[36px]" />
      <div
        className="w-[100%] h-[calc(100vh-380px)] rounded-xl overflow-clip mx-auto bg-white relative"
        // onKeyDown={onKeyDown}
        tabIndex={0}
      >
        <DataEditor
          onHeaderClicked={(...args) => {
            if(args[0] === 0) {
              setData(prev => [...prev].map(sup => ({...sup, select: !selectAllSuppliers})))
              setSelectAllSuppliers(!selectAllSuppliers)
            }
          }}
          headerIcons={headerIcons}
          onPaste={false}
          ref={gridRef}
          columns={columns}
          rows={data.length}
          getCellContent={getCellContent}
          onCellEdited={onCellEdited}
          // gridSelection={gridSelection}
          // onGridSelectionChange={setGridSelection}
          height={"100%"}
          width={"100%"}
          theme={customTheme}
          getRowThemeOverride={getRowThemeOverride}
          headerHeight={72}
          rowHeight={84}
          onCellClicked={handleCellClicked}
        />
        {isOpen &&
          renderLayer(
            <div
              className="shadow-l rounded-full border-[2px] border-black/25"
              {...layerProps}
            >
              <MyComboBox 
                forDataGrid={true}
                placeholder={"Choose Locations"}
                options={orgNodes} 
                value={data[menu.cell[1]].supplies_to_locations} 
                onChange={(newValue) => {
                  setData(prev => {
                    const newData = [...prev]
                    const row = menu.cell[1]
                    newData[row] = {
                      ...newData[row],
                      supplies_to_locations: newValue,
                      supplier_edit_data: {
                        ...newData[row].supplier_edit_data,
                        org_node_ids: newValue.map(obj => obj.id),
                        locations: newValue
                      }
                    }
                    return newData
                  })
                }} />
            </div>
          )}
          {isSuppliersLoading !== false || isSuppliersUpdating || isSuppliersCreating || isSuppliersDeleting ? <RecordsLoader /> : null}
      </div>

      <div className="h-[16px]" />
      <div className="flex justify-end">
        {data.reduce((accum, curr) => accum + (curr.select ? 1 : 0), 0) === 0 ? null : (
          <div
            onClick={() => {
              if(isSuppliersDeleting) return null 

              const selectedSupplierIds = data.filter(sup => sup.id && sup.select).map(sup => sup.id)
              deleteSuppliers(selectedSupplierIds.map((id, index) => [`supplier_ids[${index}]`, id]))
            }}
            className="bg-teal-accent-dark text-white text-[16px] rounded-xl px-[14px] py-[10px] cursor-pointer">
            {`DELETE ${data.reduce((accum, curr) => accum + (curr.select ? 1 : 0), 0)}`}
          </div>
        )}
        
        <div className="w-[24px]" />
        <div 
          onClick={() => {
            if(gridRef.current === null) return
            if(isSuppliersLoading !== false || isSuppliersUpdating || isSuppliersCreating ) return null
            if(suppliers.length === 0 || data.length === 0) return null

            // todo: handle validation
            let areEmptyRecordsPresent = false
            let validData = []
            for(let i = 0; i < data.length; i++) {
              if(isDatumEmpty(data[i])) {
                areEmptyRecordsPresent = true
                continue
              }
              
              const invalidColumns = getInvalidColumns(data[i])
              if(invalidColumns.length > 0) 
                return gridRef.current.scrollTo(invalidColumns[0], i)             
              
              validData.push(data[i])
            }

            let updatedSuppliers = []
            for(let latestSup of validData.filter(sup => sup.id)) {
              if(!suppliers.find(sup => sup.id === latestSup.id)) { 
                continue
              }
              
              if (!areSuppliersEqual(latestSup, suppliers.find(sup => sup.id === latestSup.id))) {
                updatedSuppliers = [latestSup, ...updatedSuppliers]
              }
            }

            if(updatedSuppliers.length > 0)
              updateSuppliers({suppliers: updatedSuppliers.map(obj => obj.supplier_edit_data)})

            const newSuppliers = validData.filter(sup => !sup.id)
            if(newSuppliers.length > 0) {
              const payload = newSuppliers
                .map(sup => ({
                  action: "new",
                  org_node_type_id: sup.supplier_node_id,
                  name: sup.supplier_name,
                  myLocations: sup.supplies_to_locations.map(loc => loc.name).join(", "),
                  locations: sup.supplies_to_locations,
                  supplier_user: {
                    name: sup.contact_person_name,
                    email: sup.contact_person_email,
                  },
                  address: sup.supplier_address,
                  org_node_ids: sup.supplies_to_locations.map(loc => loc.id),
                }))
              createSuppliers({suppliers: payload})
            }
            if(updatedSuppliers.length === 0 && newSuppliers.length === 0 && areEmptyRecordsPresent) {
              console.log("in case there are empty rows")
              fetchSuppliers()
            }
          }}
          className="bg-teal-accent-dark text-white text-[16px] rounded-xl px-[14px] py-[10px] cursor-pointer">
          SAVE
        </div>
      </div>
    </div>
  );
}

function areSuppliersEqual(supplierOne, supplierTwo) {
  if(supplierOne.supplier_name !== supplierTwo.supplier_name) return false
  else if(supplierOne.contact_person_name !== supplierTwo.contact_person_name) return false
  else if(supplierOne.supplier_address !== supplierTwo.supplier_address) return false
  else return areLocationsEqual(supplierOne.supplies_to_locations, supplierTwo.supplies_to_locations)
}

function areLocationsEqual(locationsOne, locationsTwo) {
  const locationsOneIds = locationsOne.map(obj => obj.id).sort().join("")
  const locationsTwoIds = locationsTwo.map(obj => obj.id).sort().join("")
  return locationsOneIds === locationsTwoIds
}

function isDatumEmpty(datum) {
  if(
    datum.supplier_name === "" && 
    datum.supplies_to_locations.length === 0 &&
    datum.contact_person_name === "" &&
    datum.contact_person_email === "" &&
    datum.supplier_address === ""
  ) return true
  else return false
}

function getInvalidColumns(datum) {
  let arr = []
  if(datum.supplier_name === "") arr.push(0)
  if(datum.supplies_to_locations.length === 0) arr.push(1)
  if(datum.contact_person_name === "") arr.push(2)
  if(!isEmailValid(datum.contact_person_email)) arr.push(3)
  if(datum.supplier_address === "") arr.push(4)
  return arr
}

function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}