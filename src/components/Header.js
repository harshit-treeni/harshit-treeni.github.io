import { ReactComponent as ResustainLogo } from "../logos/resustain_logo.svg";
import QuestionIcon from "../icons/QuestionIcon";
import SearchIcon from "../icons/SearchIcon";

export default function Header() {
  return (
    <div className="sticky top-0 left-0 h-[84px] bg-[#8da4ac] w-full flex items-center px-[48px] z-10">
      <div className="flex-1 h-[48px] rounded-lg flex items-center py-[6px] pr-[6px] pl-[20px] bg-white">
        <input
          className="w-full outline-none text-[14px] placeholder:text-[#4F5771] placeholder:text-[14px]"
          placeholder="Search Dashboard"
        />
        <div className="rounded-lg bg-[#8da4ac] h-[36px] px-[12px] flex justify-center items-center">
          <SearchIcon className="fill-[#8da4ac] stroke-white" />
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
