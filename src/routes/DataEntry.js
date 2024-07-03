import clsx from "clsx";
import PageSelect from "../components/PageSelect";
import Loader from "../components/RecordsLoader";
import { useState } from "react";

export default function DataEntry() {
  const [isSelected, setIsSelected] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="p-[36px] flex">
      <div className="h-[700px] w-[270px] rounded-lg bg-white">
        <div className="h-[200px]" />
        <>
          <div className="h-[2px] w-full bg-gray-100" />
          <div className="group relative flex justify-between items-center h-[50px] px-[24px] cursor-pointer">
            <div className="flex items-center group-hover:text-black text-gray-500 text-[14px] font-[600] font-manrope z-10 select-none">
              <svg
                className="group-hover:stroke-black stroke-gray-500"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.47506 10.6341C1.11054 8.66657 1.46029 6.63355 2.46134 4.90095C3.4624 3.16836 5.04902 1.84997 6.93563 1.18311V7.48376L1.47506 10.6341Z"
                  strokeWidth="1.42167"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.73571 9.13929V0.70166C11.2076 0.70188 12.6535 1.0888 13.9288 1.82367C15.2041 2.55853 16.2639 3.61556 17.0022 4.88889C17.7404 6.16222 18.1312 7.60716 18.1353 9.07902C18.1394 10.5509 17.7568 11.998 17.0257 13.2754C16.2946 14.5529 15.2407 15.6158 13.9695 16.3578C12.6984 17.0998 11.2546 17.4948 9.78275 17.5033C8.31091 17.5117 6.86268 17.1334 5.58308 16.406C4.30349 15.6787 3.23744 14.6279 2.4917 13.359L17.0112 4.9021"
                  strokeWidth="1.42167"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="w-[8px]" />

              {"Data Management"}
            </div>

            <div className="flex items-center z-10">
              <div>
                {/* bookmark icon */}
                <svg
                  onClick={() => setIsBookmarked((prev) => !prev)}
                  className={clsx(
                    {
                      "hover:fill-gray-400 fill-transparent":
                        isBookmarked === false,
                    },
                    {
                      "group-hover:fill-black fill-gray-500":
                        isBookmarked === true,
                    }
                  )}
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.0957 9.98212L10.9558 12.3119L9.93143 7.92091L13.3418 4.96651L8.85086 4.57925L7.0957 0.444336L5.34055 4.57925L0.849609 4.96651L4.25373 7.92091L3.23562 12.3119L7.0957 9.98212Z" />
                </svg>
              </div>

              <div className="w-[8px]" />

              {/* arrow icon */}
              <svg
                className="group-hover:stroke-black stroke-gray-500"
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.2417 10.4653L5.95923 5.74772L1.26362 1.05211"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </>
        <>
          <div className="h-[2px] w-full bg-gray-100" />
          <div className="group relative flex justify-between items-center h-[50px] px-[24px] cursor-pointer">
            <div className="flex items-center group-hover:text-black text-gray-500 text-[14px] font-[600] font-manrope z-10 select-none">
              <svg
                className="group-hover:stroke-black stroke-gray-500"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.47506 10.6341C1.11054 8.66657 1.46029 6.63355 2.46134 4.90095C3.4624 3.16836 5.04902 1.84997 6.93563 1.18311V7.48376L1.47506 10.6341Z"
                  strokeWidth="1.42167"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.73571 9.13929V0.70166C11.2076 0.70188 12.6535 1.0888 13.9288 1.82367C15.2041 2.55853 16.2639 3.61556 17.0022 4.88889C17.7404 6.16222 18.1312 7.60716 18.1353 9.07902C18.1394 10.5509 17.7568 11.998 17.0257 13.2754C16.2946 14.5529 15.2407 15.6158 13.9695 16.3578C12.6984 17.0998 11.2546 17.4948 9.78275 17.5033C8.31091 17.5117 6.86268 17.1334 5.58308 16.406C4.30349 15.6787 3.23744 14.6279 2.4917 13.359L17.0112 4.9021"
                  strokeWidth="1.42167"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="w-[8px]" />

              {"Data Management"}
            </div>
          </div>
        </>
        <>
          <div className="h-[2px] w-full bg-gray-100" />
          <div className="group relative flex justify-between items-center h-[50px] px-[24px] cursor-pointer">
            <div
              className="absolute w-full h-[50px] top-0 left-0 z-0"
              style={{
                visibility: "visible",
                backgroundImage: "linear-gradient(to right, #DBDBF6 , #FFFFFF)",
              }}
            />
            <div className="h-full w-[4px] absolute top-0 left-0 z-0 visible bg-indigo-600" />

            <div className="flex items-center text-black text-[14px] font-[600] font-manrope z-10 select-none">
              <svg
                className="stroke-black"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.47506 10.6341C1.11054 8.66657 1.46029 6.63355 2.46134 4.90095C3.4624 3.16836 5.04902 1.84997 6.93563 1.18311V7.48376L1.47506 10.6341Z"
                  strokeWidth="1.42167"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.73571 9.13929V0.70166C11.2076 0.70188 12.6535 1.0888 13.9288 1.82367C15.2041 2.55853 16.2639 3.61556 17.0022 4.88889C17.7404 6.16222 18.1312 7.60716 18.1353 9.07902C18.1394 10.5509 17.7568 11.998 17.0257 13.2754C16.2946 14.5529 15.2407 15.6158 13.9695 16.3578C12.6984 17.0998 11.2546 17.4948 9.78275 17.5033C8.31091 17.5117 6.86268 17.1334 5.58308 16.406C4.30349 15.6787 3.23744 14.6279 2.4917 13.359L17.0112 4.9021"
                  strokeWidth="1.42167"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="w-[8px]" />

              {"Data Management"}
            </div>
          </div>
        </>
        <div className="h-[20px]" />
      </div>

      <div className="w-[28px]" />
      <PageSelect />

      <div className="w-[28px]" />
    </div>
  );
}
