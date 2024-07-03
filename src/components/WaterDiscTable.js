import { CustomGrayDark } from "../colors";

export default function WaterDiscTable({ WaterDiscHeadings, WaterDiscRows }) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {WaterDiscHeadings.map((element, index) => {
            return (
              <th
                key={index}
                className="text-[16px] font-[600] leading-[19px] p-[40px] text-left"
              >
                {element}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {WaterDiscRows.map((row, index) => {
          return (
            <tr className="odd:bg-[#F6F6FB]" key={index}>
              {row.map((element, index) => {
                return (
                  <td
                    key={index}
                    style={{ color: CustomGrayDark }}
                    className="text-[13px] leading-[16px] font-[600] text-left p-[40px] first:font-[700] first:text-[black]"
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
