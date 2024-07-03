import { CustomGrayDark } from "../colors";

export default function CDPRankingTable({ CDPHeadings, CDPRows }) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {CDPHeadings.map((element, index) => {
            return (
              <th
                key={index}
                className="font-manrope text-[13px] font-[700] leading-[18px] p-[16px] text-right first:text-left"
              >
                {element}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {CDPRows.map((row, index) => {
          return (
            <tr className="odd:bg-[#F6F6FB] last:rounded-b-[14px]" key={index}>
              {row.map((element, index) => {
                return (
                  <td
                    key={index}
                    className="text-[13px] leading-[16px] font-[400] px-[24px] py-[16px] text-right first:text-left"
                    style={{
                      color: element.includes("-")
                        ? "red"
                        : index === 0
                        ? "black"
                        : CustomGrayDark,
                    }}
                  >
                    {element}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
