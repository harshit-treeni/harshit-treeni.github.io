import { HiDotsVertical } from "react-icons/hi";
import PinIcon from "../icons/PinIcon";

export default function WidgetContainer({ children, title, subtitle, padStr }) {
  return (
    <div
      style={{ boxShadow: "0px 4px 4px 0px #EFEFEF" }}
      className="rounded-[14px] overflow-hidden"
    >
      <div className="w-full h-[72px] px-[28px] py-[16px] bg-purple-200">
        <div className="flex justify-between items-center">
          {subtitle ? (
            <div className="flex flex-col justify-start items-start h-[40px]">
              <div className="text-[16px] font-[500]">{title}</div>
              <div className="text-[14px] font-[500] font-manrope text-gray-500">
                {subtitle}
              </div>
            </div>
          ) : (
            <div className="text-[16px] font-[500] leading-[40px]">{title}</div>
          )}

          <div className="flex items-center">
            <div className="w-[32px] h-[32px] rounded-full bg-[#4A47EB]/[0.11] flex justify-center items-center overflow-visible">
              <PinIcon color="#4A47EB" />
            </div>
            <div className="w-[8px]" />
            <div className="w-[32px] h-[32px] rounded-full flex justify-center items-center bg-gray-100">
              <HiDotsVertical className="text-[black]" />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ padding: getPadding(padStr) }}
        className="bg-[white] w-full"
      >
        {children}
      </div>
    </div>
  );
}

function getPadding(padStr) {
  if (!padStr) return "0px";
  else if (padStr === "table") return "8px 40px 24px";
}
