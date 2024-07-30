/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useRef, useEffect } from "react";
import DataEditor, { GridCellKind } from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import { BiSearchAlt } from "react-icons/bi";
import { useLayer } from "react-laag";
import { useFetchSuppliers, useUpdateSuppliers } from "../hooks/data_fetch_suppliers";
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

const columns = [
  { title: "Supplier Name", id: "supplier_name", grow: 1 },
  { title: "Locations", id: "supplies_to_locations", grow: 3 },
  { title: "Contact Person", id: "contact_person_name", grow: 1 },
  { title: "Email", id: "contact_person_email", grow: 1 },
  { title: "Address", id: "supplier_address", grow: 1 },
];

export default function SuppliersPage() {
  const [data, setData] = useState([]);
  // const [gridSelection, setGridSelection] = useState();
  const gridRef = useRef(null);

  const [orgNodes, isOrgNodesLoading, fetchOrgNodes] = useFetchOrgNodes()
  const [suppliers, isSuppliersLoading, fetchSuppliers] = useFetchSuppliers()
  const [updateSuppliersResponse, isSuppliersUpdating, updateSuppliers] = useUpdateSuppliers()
  
  useEffect(() => {
    fetchOrgNodes()
  }, [])

  useEffect(() => {
    if(!isSuppliersUpdating) {
      fetchSuppliers()
    }
  }, [isSuppliersUpdating])

  useEffect(() => {
    if(!isSuppliersLoading) {
      setData(suppliers)
    }
  }, [isSuppliersLoading])



  const getCellContent = useCallback(
    (cell) => {
      const [col, row] = cell;
      const dataRow = data[row];
      const dataKey = columns.map((obj) => obj.id)[col];
      const cellData = dataRow[dataKey];

      if (col === 1) {
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
        readonly: col === 3 ? true : false,
        displayData: cellData?.toString() || "",
        data: cellData,
        themeOverride: [undefined, "", null].includes(cellData)
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

      setData((prevData) => {
        const newData = [...prevData];
        if(col === 0) {
          newData[row] = { 
            ...newData[row], 
            [dataKey]: newValue.data, 
            supplier_edit_data: {
              ...newData[row].supplier_edit_data,
              name: newValue.data
            }
          };
        } else if(col === 2) {
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
        } else {
          // col should be equal to 4
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
    if (args[0][0] === 1)
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
              // setData([
              //   {
              //     supplier_name: "",
              //     supplies_to_locations: [],
              //     contact_person_name: "",
              //     contact_person_email: "",
              //     supplier_address: "",
              //   },
              //   ...data,
              // ]);
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
          {isSuppliersLoading || isSuppliersUpdating ? <RecordsLoader /> : null}
      </div>

      <div className="h-[16px]" />
      <div className="flex justify-end">
        <div 
          onClick={() => {
            if(isSuppliersUpdating || isSuppliersLoading) return null
            if(suppliers.length === 0 || data.length === 0) return null

            let updatedSuppliers = []
            for(let newSupplier of data) {
              if(!suppliers.find(sup => sup.id === newSupplier.id)) { 
                console.log("This should really not be happening.")
                continue
              }
              
              if (!compareSupplier(newSupplier, suppliers.find(sup => sup.id === newSupplier.id))) {
                updatedSuppliers = [newSupplier, ...updatedSuppliers]
              }
            }

            if(updatedSuppliers.length > 0)
              updateSuppliers({suppliers: updatedSuppliers.map(obj => obj.supplier_edit_data)})
          }}
          className="bg-teal-accent-dark text-white text-[16px] rounded-xl px-[14px] py-[10px] cursor-pointer">
          SAVE
        </div>
      </div>
    </div>
  );
}

// const columns = [
//   { title: "Supplier Name", id: "supplier_name", grow: 1 }, //
//   { title: "Locations", id: "supplies_to_locations", grow: 3 }, 
//   { title: "Contact Person", id: "contact_person_name", grow: 1 }, //
//   { title: "Email", id: "contact_person_email", grow: 1 },
//   { title: "Address", id: "supplier_address", grow: 1 }, //
// ]

function compareSupplier(supplierOne, supplierTwo) {
  if(supplierOne.supplier_name !== supplierTwo.supplier_name) return false
  else if(supplierOne.contact_person_name !== supplierTwo.contact_person_name) return false
  else if(supplierOne.supplier_address !== supplierTwo.supplier_address) return false
  else return compareLocations(supplierOne.supplies_to_locations, supplierTwo.supplies_to_locations)
}

function compareLocations(locationsOne, locationsTwo) {
  const locationsOneIds = locationsOne.map(obj => obj.id).sort().join("")
  const locationsTwoIds = locationsTwo.map(obj => obj.id).sort().join("")
  return locationsOneIds === locationsTwoIds
}