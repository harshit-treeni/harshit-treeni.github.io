import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

export default function ColumnGraphBlock({ data, dispatch }) {
  return (
    <div className="w-full bg-white py-[40px] px-[60px] rounded-[14px]">
      <div className="font-[500] text-[22px]">Data Status Report</div>

      <div className="h-[42px]" />

      <ResponsiveContainer width="98%" height={200} className={"mx-auto"}>
        <BarChart data={data}>
          <XAxis
            padding={{ left: 80, right: 80 }}
            dataKey={"name"}
            axisLine={false}
            tickLine={false}
            style={{
              fontFamily: "Inter",
              fontSize: "16px",
            }}
          />
          <YAxis
            dataKey={"number"}
            axisLine={false}
            tickLine={false}
            domain={[0, (dataMax) => dataMax * 1.25]}
            style={{
              fontFamily: "Inter",
              fontSize: "15px",
            }}
          />
          <CartesianGrid vertical={false} stroke="#F3F3F3" />
          <Bar
            barSize={160}
            onClick={(...args) => {
              dispatch({ type: "recordsObj loading" });

              if (args[1] === 0)
                window.parent.postMessage(
                  { type: "status", data: "Approved" },
                  "*"
                );
              if (args[1] === 1)
                window.parent.postMessage(
                  { type: "status", data: "Draft" },
                  "*"
                );
              if (args[1] === 2)
                window.parent.postMessage(
                  { type: "status", data: "Revise Draft" },
                  "*"
                );
            }}
            dataKey="number"
            background={{ fill: "#F5F2FF" }}
          >
            {data.map((entry, index) => (
              <Cell
                style={{ cursor: "pointer" }}
                key={index}
                fill={getColor(entry.name)}
                radius={8}
              />
            ))}
            <LabelList
              content={(props) => {
                const { x, y, width, height, name } = props;

                return (
                  <text
                    x={x + width / 2}
                    y={height > 30 ? y + height / 2 : y - 12}
                    fill={getLabelColor(name)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {data.find((datum) => datum.name === name).number}
                  </text>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="h-[24px]" />

      <div className="flex items-center text-black/60">
        <div
          onClick={() => {
            dispatch({ type: "recordsObj loading" });
            window.parent.postMessage(
              { type: "status", data: "Approved" },
              "*"
            );
          }}
          className="flex items-center mr-[20px] cursor-pointer"
        >
          <div className="bg-[#54CB52] w-[16px] h-[16px] rounded-full mr-[6px] text-[14px]" />
          Approved
        </div>

        <div
          onClick={() => {
            dispatch({ type: "recordsObj loading" });
            window.parent.postMessage({ type: "status", data: "Draft" }, "*");
          }}
          className="flex items-center mr-[20px] cursor-pointer"
        >
          <div className="bg-[#EEC985] w-[16px] h-[16px] rounded-full mr-[6px] text-[14px]" />
          Pending
        </div>

        <div
          onClick={() => {
            dispatch({ type: "recordsObj loading" });
            window.parent.postMessage(
              { type: "status", data: "Revise Draft" },
              "*"
            );
          }}
          className="flex items-center cursor-pointer"
        >
          <div className="bg-[#F98888] w-[16px] h-[16px] rounded-full mr-[6px] text-[14px]" />
          Rejected
        </div>
      </div>
    </div>
  );
}

function getColor(name) {
  if (name === "Approved") return "#54CB52";
  else if (name === "Pending") return "#EEC985";
  else return "#F98888";
}

function getLabelColor(name) {
  if (name === "Approved") return "#0A780A";
  else if (name === "Pending") return "#B68B3D";
  else return "#BC4747";
}
