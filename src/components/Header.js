import { ReactComponent as ResustainLogo } from "../logos/resustain_logo.svg";
import QuestionIcon from "../icons/QuestionIcon";
import SearchIcon from "../icons/SearchIcon";

export default function Header() {
  return (
    <div className="sticky top-0 left-0 h-[84px] bg-gray-palette-lightest w-full flex items-center px-[48px] z-[99]">
      <div className="flex-1 h-[48px] rounded-lg flex items-center py-[6px] pr-[6px] pl-[20px] bg-white">
        <input
          disabled
          className="w-full outline-none text-[14px] placeholder:text-[#4F5771] placeholder:text-[14px] bg-white"
          placeholder="Search Dashboard"
        />
        <div className="rounded-lg bg-gray-palette-lightest h-[36px] px-[12px] flex justify-center items-center cursor-not-allowed">
          <SearchIcon className="fill-gray-palette-lightest stroke-white" />
        </div>
      </div>

      <div
        className="px-[40px] flex items-end text-[16px]"
        style={{ color: "white" }}
      >
        Powered By
        <div className="w-[4px]" />
        <div className="relative">
          <ResustainLogo
            className="cursor-pointer"
            onClick={() => {
              console.log("resustain logo click");
              window.parent.postMessage(
                {
                  type: "navigate",
                  href: "/#/landing_page",
                },
                "*"
              );
            }}
          />
          <div className="absolute top-[2px] -right-[8px] text-[7px]">TM</div>
        </div>
      </div>

      <QuestionIcon />
    </div>
  );
}
