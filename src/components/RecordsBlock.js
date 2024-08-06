import {
  CompactSelection,
  DataEditor,
  GridCellKind,
} from "@glideapps/glide-data-grid";
import { useCallback, useMemo } from "react";
import { CustomGrayDark, GrayPalette } from "../colors";

const indexes = [
  "select",
  "category",
  "indicator",
  "status",
  "startDate",
  "endDate",
  "siteName",
  "count",
  "owner",
];

const theme = {
  bgCell: "#F3F2FF",
  bgHeader: GrayPalette.LIGHTEST,
  borderColor: "transparent",
  cellHorizontalPadding: 36,
  headerFontStyle: "600 18px",
  baseFontStyle: "14px",
  fontFamily: "Inter",
  textDark: CustomGrayDark,
  accentColor: "transparent",
  accentFg: "transparent",
  accentLight: "transparent",
  bgHeaderHasFocus: "transparent",
  bgHeaderHovered: "transparent",
  drilldownBorder: "transparent",
  textHeader: "white",
};

function getTheme(colName, d) {
  if (colName === "category") return { textDark: "black" };

  if (colName === "status") {
    if (d === "Approved") return { textDark: "#008000" };
    else if (d === "Pending") return { textDark: "#B98E40" };
    else return { textDark: "#BE4040" };
  }

  if (colName === "count") return { cellHorizontalPadding: 56 };
}

const emptyGridSelection = {
  columns: CompactSelection.empty(),
  rows: CompactSelection.empty(),
  current: undefined,
};

const headerIcons = {
  "checkbox-unchecked": (p) =>
    `<svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5C5.44772 5 5 5.44772 5 6V13V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V13V6C19 5.44772 18.5523 5 18 5H6ZM3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V13V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V13V6Z" fill="#fff"></path> </g></svg>`,
  "checkbox-checked": (p) =>
    `<svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 21 21"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g></svg>`,
};

export default function RecordsBlock({ recordsObj, toggleRecordSelect, toggleSelectAll  }) {
  const columns = useMemo(() => {
    return [
      {
        title: "",
        id: "select",
        width: 60,
        icon: recordsObj.selectAll ? "checkbox-checked" : "checkbox-unchecked",
        themeOverride: {
          ...theme,
          cellHorizontalPadding: 19,
        },
      },
      { title: "Category", id: "category", grow: 1 },
      { title: "Indicator", id: "indicator", grow: 1 },
      { title: "Status", id: "status", grow: 1 },
      { title: "Start Date", id: "startDate", grow: 1 },
      { title: "End Date", id: "endDate", grow: 1 },
      { title: "Site Name", id: "siteName", grow: 1 },
      { title: "Count", id: "count", with: 40 },
      { title: "Owner", id: "owner", grow: 5 },
    ];
  }, [recordsObj.selectAll]);

  const drawCell = useCallback((args, draw) => {
    const { ctx, rect, col, cell } = args;
    if (col !== 3) return draw();

    ctx.beginPath();
    ctx.roundRect(
      rect.x + (rect.width * 44) / 186,
      rect.y + 25,
      rect.width - (rect.width * 88) / 186,
      rect.height - 48,
      8
    );
    ctx.closePath();
    ctx.save();
    ctx.fillStyle =
      cell.data === "Approved"
        ? "#AEE1AE"
        : cell.data === "Pending"
        ? "#FFE1AA"
        : "#FFB4B4";
    ctx.fill();
    ctx.restore();

    draw();
  }, []);

  const getCellContent = useCallback(
    (cell) => {
      const [col, row] = cell;
      const dataRow = recordsObj.records[row];
      const d = dataRow[indexes[col]];

      if (indexes[col] === "select") {
        return {
          kind: GridCellKind.Boolean,
          displayData: d,
          data: d,
          contentAlign: "center",
        };
      }

      return {
        kind: GridCellKind.Text,
        allowOverlay: false,
        readonly: true,
        displayData: d,
        data: d,
        themeOverride: getTheme(indexes[col], d),
        contentAlign: indexes[col] === "status" ? "center" : "left",
      };
    },
    [recordsObj.records]
  );

  return (
    <DataEditor
      headerIcons={headerIcons}
      gridSelection={emptyGridSelection}
      columnSelect="none"
      rowSelect="none"
      rangeSelect="none"
      theme={theme}
      getRowThemeOverride={(i) =>
        i % 2 === 1
          ? undefined
          : {
              bgCell: "#fff",
            }
      }
      width="100%"
      height="750px"
      headerHeight={72}
      rowHeight={84}
      getCellContent={getCellContent}
      columns={columns}
      rows={recordsObj.records.length}
      drawCell={drawCell}
      onHeaderClicked={(...args) => {
        if (args[0] === 0) {
          toggleSelectAll()
        }
      }}
      onCellClicked={(...args) => {
        const [cell] = args;
        const [col, row] = cell;
        if (col === 0) {
          toggleRecordSelect(row)
        }
      }}
    />
  );
}
