import React, { useState, useCallback, useRef, useEffect } from "react";
import DataEditor, { GridCellKind } from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import { BiSearchAlt } from "react-icons/bi";
import { useLayer } from "react-laag";
import Select from "react-select";
import { useFetchSuppliers } from "../hooks/data_fetch_suppliers";

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
  { title: "Supplier Name", id: "supplier", grow: 1 },
  { title: "Locations", id: "locations", grow: 1 },
  { title: "Contact Person", id: "person", grow: 1 },
  { title: "Email", id: "email", grow: 1 },
  { title: "Address", id: "address", grow: 1 },
];

export default function SuppliersPage() {
  const [suppliers, isSuppliersLoading, fetchSuppliers] = useFetchSuppliers()
  useEffect(() => {
    fetchSuppliers()
  }, [])

  const [data, setData] = useState([]);
  const [gridSelection, setGridSelection] = useState();
  const gridRef = useRef(null);

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
          displayData: cellData?.join(",") || "",
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
      }

      return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        readonly: false,
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
      const dataKey = Object.keys(data[row])[col];

      setData((prevData) => {
        const newData = [...prevData];
        newData[row] = { ...newData[row], [dataKey]: newValue.data };
        return newData;
      });
    },
    [data]
  );

  const copySelection = useCallback(() => {
    if (gridSelection?.current === undefined) return "";

    const { x, y, width, height } = gridSelection.current.range;
    let result = "";

    for (let row = y; row < y + height; row++) {
      for (let col = 0; col < x; col++) result += "\t";
      for (let col = x; col < x + width; col++) {
        const cell = getCellContent([col, row]);
        result += cell.data;
        if (col < x + width - 1) result += "\t";
      }
      for (let col = x + width; col < 5; col++) result += "\t";
      if (row < y + height - 1) result += "\n";
    }

    return result;
  }, [gridSelection, getCellContent]);

  const pasteData = useCallback((pasteString) => {
    const rows = pasteString.split("\n");
    const newData = rows.map((row) => {
      const cells = row.split("\t");
      return {
        supplier: cells[0],
        locations: cells[1],
        person: cells[2],
        email: cells[3],
        address: cells[4],
      };
    });

    setData((prevData) => [...newData, ...prevData]);
  }, []);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "c" && (e.ctrlKey || e.metaKey)) {
        const copyText = copySelection();
        navigator.clipboard.writeText(copyText).then(() => {
          console.log("Copied to clipboard");
        });
      } else if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
        navigator.clipboard.readText().then((pasteText) => {
          pasteData(pasteText);
        });
      }
    },
    [copySelection, pasteData]
  );

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
    placement: "bottom-end",
    triggerOffset: 2,
    onOutsideClick: (...args) => {
      if (menu?.first === true) {
        console.log("first");
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
              setData([
                {
                  supplier: "",
                  locations: "",
                  person: "",
                  email: "",
                  address: "",
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
        className="w-[100%] h-[calc(100vh-380px)] rounded-xl overflow-clip mx-auto bg-white"
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        <DataEditor
          onPaste={false}
          ref={gridRef}
          columns={columns}
          rows={data.length}
          getCellContent={getCellContent}
          onCellEdited={onCellEdited}
          gridSelection={gridSelection}
          onGridSelectionChange={setGridSelection}
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
              className="bg-white p-3 rounded-xl border border-black/[0.1] shadow-md"
              {...layerProps}
            >
              <Select
                defaultValue={[{ value: "chocolate", label: "Chocolate" }]}
                isMulti
                options={[
                  { value: "chocolate", label: "Chocolate" },
                  { value: "strawberry", label: "Strawberry" },
                  { value: "vanilla", label: "Vanilla" },
                ]}
                onChange={(...args) => {
                  console.log(args);
                }}
              />
            </div>
          )}
      </div>

      <div className="h-[16px]" />
      <div className="flex justify-end">
        <div className="bg-teal-accent-dark text-white text-[16px] rounded-xl px-[14px] py-[10px]">
          SAVE
        </div>
      </div>
    </div>
  );
}
