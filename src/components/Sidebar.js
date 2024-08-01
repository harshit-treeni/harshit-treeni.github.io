import clsx from "clsx";

import ArrowIcon from "../icons/ArrowIcon";
import PieChartIcon from "../icons/PieChartIcon";
import ElectricityIcon from "../icons/ElectricityIcon";
import BoxesIcon from "../icons/BoxesIcon";
import HideDockIcon from "../icons/HideDockIcon";
import ShowDockIcon from "../icons/ShowDockIcon";
import TVIcon from "../icons/TVIcon";
import WaterIcon from "../icons/WaterIcon";
import BarGraphIcon from "../icons/BarGraphIcon";
import DocumentIcon from "../icons/DocumentIcon";
import EditIcon from "../icons/EditIcon";
import SearchIcon from "../icons/SearchIcon";
import PeopleIcon from "../icons/PeopleIcon";
import { GoPeople } from "react-icons/go";

import { useEffect, useReducer, useRef } from "react";

import { ReactComponent as Avatar } from "./../avatar.svg";
import { ReactComponent as WiproLogo } from "./../logos/wipro_logo.svg";
import { IoHomeOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { GrayPalette } from "../colors";
import { useFetchModules } from "../hooks/data_fetch_methods";

const dataMngmtNavObjs = [
  {
    id: 1,
    Icon: EditIcon,
    label: "Data Analytics",
    path: "/data-management/data-analytics",
    href: "/analytics#/",
    modules_key: "analytics"
  },
  {
    id: 2,
    Icon: BarGraphIcon,
    label: "Data Entry",
    path: "/data-management/data-entry",
    href: "/indicator_data#/",
    modules_key: "indicator_data"
  },
  {
    id: 3,
    Icon: BoxesIcon,
    label: "To-Do-List",
    path: "/data-management/to-do-list",
    href: "/indicator_data#/web_notification_actions?tab=to_do_lists&page=1&limit=10",
    modules_key: "to_do_list"
  },
  {
    id: 4,
    Icon: PeopleIcon,
    label: "SDG's",
    path: "/data-management/sdgs",
    href: "/indicator_data#/sdgs",
    modules_key: "sdg"
  },
  {
    id: 5,
    Icon: ElectricityIcon,
    label: "Data Status Dashboard",
    path: "/data-management/data-status-report",
    modules_key: "data_entry_status"
  },
  {
    id: 6,
    Icon: WaterIcon,
    label: "Data Review",
    path: "/data-management/data-review",
    href: "/indicator_data#/indicator_records_review",
    modules_key: "everyone"
  },
];


const stratNavObjs = [
  {
    id: 1,
    Icon: EditIcon,
    label: "Goals",
    path: "/strategy/goals",
    href: "/goals/#/",
  },
  // {
  //   id: 2,
  //   Icon: BarGraphIcon,
  //   label: "Risk Universe",
  //   path: "/strategy/risk-universe",
  // },
  // {
  //   id: 3,
  //   Icon: BarGraphIcon,
  //   label: "Risk Inventory",
  //   path: "/strategy/risk-inventory",
  // },
];

const disclosureNavObjs = [
  {
    id: 1,
    Icon: EditIcon,
    label: "Publishers",
    path: "/disclosures/publishers",
    href: "/disclosures#/",
    modules_key: "disclosure_publisher"
  },
  {
    id: 2,
    Icon: BarGraphIcon,
    label: "Templates",
    path: "/disclosures/templates",
    href: "/templates#/",
    modules_key: "disclosure_template"
  },
];

function SidebarReducer(state, action) {
  switch (action.type) {
    case "show/hide":
      return {
        ...state,
        isCollapsed: !state.isCollapsed,
        nav: {
          ...state.nav,
          dataMgmt: true,
          supChain: true,
          strat: true,
          disc: true,
        },
      };

    case "dataMgmt click expanded":
      return {
        ...state,
        nav: {
          ...state.nav,
          dataMgmt: !state.nav.dataMgmt,
        },
      };

    case "supChain click expanded":
      return {
        ...state,
        nav: {
          ...state.nav,
          supChain: !state.nav.supChain,
        },
      };

    case "strat click expanded":
      return {
        ...state,
        nav: {
          ...state.nav,
          strat: !state.nav.strat,
        },
      };

    case "disc click expanded":
      return {
        ...state,
        nav: {
          ...state.nav,
          disc: !state.nav.disc,
        },
      };

    case "dataMgmt click collapsed":
      return {
        ...state,
        isCollapsed: false,
        nav: {
          ...state.nav,
          dataMgmt: false,
          supChain: true,
          strat: true,
          disc: true,
        },
      };

    case "supChain click collapsed":
      return {
        ...state,
        isCollapsed: false,
        nav: {
          ...state.nav,
          dataMgmt: true,
          supChain: false,
          strat: true,
          disc: true,
        },
      };

    case "strat click collapsed":
      return {
        ...state,
        isCollapsed: false,
        nav: {
          ...state.nav,
          dataMgmt: true,
          supChain: true,
          strat: false,
          disc: true,
        },
      };

    case "disc click collapsed":
      return {
        ...state,
        isCollapsed: false,
        nav: {
          ...state.nav,
          dataMgmt: true,
          supChain: true,
          strat: true,
          disc: false,
        },
      };

    default:
      throw new Error("Sidebar dispatch called with wrong type " + action.type);
  }
}

export default function Sidebar() {
  const [modules, isModulesLoading, fetchModules] = useFetchModules() 
  useEffect(() => fetchModules(), [])

  const location = useLocation();
  const [state, dispatch] = useReducer(SidebarReducer, {
    isCollapsed: false,
    nav: {
      dataMgmt: location.pathname.split("/")[1] !== "data-management",
      supChain: location.pathname.split("/")[1] !== "supply-chain",
      strat: location.pathname.split("/")[1] !== "strategy",
      disc: location.pathname.split("/")[1] !== "disclosures",
    },
  });

  const { isCollapsed, nav } = state;

  if(isModulesLoading === true || modules === null) return null
  
  return (
    <div
      className={clsx("bg-white overflow-y-auto relative h-vh", {
        "w-[120px]": isCollapsed,
        "w-[270px]": !isCollapsed,
      })}
    >
      <SidebarHeader isCollapsed={isCollapsed} />

      <SidebarHomeItem
        isCollapsed={isCollapsed}
        showHideDock={() => dispatch({ type: "show/hide" })}
      />

      {isCollapsed ? (
        <>
          <CollapsedNavItem
            Icon={BoxesIcon}
            label="Dashboard"
            path="/dashboard"
            href={"/#/"}
          />
          {modules.module_access.data_management ? (
            <CollapsedNavItem
              Icon={PieChartIcon}
              label="Data Management"
              onClick={() => dispatch({ type: "dataMgmt click collapsed" })}
            />
          ) : null}
          {modules.module_access.goals ? (
            <CollapsedNavItem
              Icon={TVIcon}
              label="Strategy"
              onClick={() => dispatch({ type: "strat click collapsed" })}
            />
          ) : null}
          {modules.module_access.disclosure ? (
            <CollapsedNavItem
              Icon={DocumentIcon}
              label="Disclosures"
              onClick={() => dispatch({ type: "disc click collapsed" })}
            />
          ) : null}
        </>
      ) : (
        <>
          <NavItem
            Icon={BoxesIcon}
            label="Dashboard"
            path="/dashboard"
            href={"/#/"}
          />
          {modules.module_access.data_management ? (
            <>
              <NavItem
                Icon={PieChartIcon}
                label="Data Management"
                onClick={() => dispatch({ type: "dataMgmt click expanded" })}
              />
              {nav.dataMgmt
                ? null
                : dataMngmtNavObjs.map((obj) => {
                    if (modules.module_access.data_management[obj.modules_key])
                      return (
                        <NavItem
                          key={obj.id}
                          Icon={obj.Icon}
                          path={obj.path}
                          label={obj.label}
                          href={obj.href}
                        />
                      );
                    else return null;
                  })}
            </>
          ) : null}
          {modules.module_access.goals ? (
            <>
              <NavItem
                Icon={TVIcon}
                label="Strategy"
                onClick={() => dispatch({ type: "strat click expanded" })}
              />
              {nav.strat
                ? null
                : stratNavObjs.map((obj) => (
                    <NavItem
                      key={obj.id}
                      Icon={obj.Icon}
                      path={obj.path}
                      label={obj.label}
                      href={obj.href}
                    />
                  ))}
            </>
          ) : null}
          {modules.module_access.disclosure ? (
            <>
              <NavItem
                Icon={DocumentIcon}
                label="Disclosures"
                onClick={() => dispatch({ type: "disc click expanded" })}
              />
              {nav.disc
                ? null
                : disclosureNavObjs.map((obj) => {
                    if (modules.module_access.disclosure[obj.modules_key])
                      return (
                        <NavItem
                          key={obj.id}
                          Icon={obj.Icon}
                          path={obj.path}
                          label={obj.label}
                          href={obj.href}
                        />
                      );
                    else return null;
                  })}
            </>
          ) : null}
        </>
      )}

      {/* space at the bottom for beauty!! */}
      <div className="h-[200px]" />
    </div>
  );
}

const SidebarHomeItem = ({ isCollapsed, showHideDock }) => {
  const location = useLocation();
  const isSelected = location.pathname === "/";

  const hideDockIconRef = useRef(null);

  if (!isCollapsed)
    return (
      <div
        onClick={(evt) => {
          if (!hideDockIconRef.current.contains(evt.target))
            window.parent.postMessage(
              { type: "navigate", href: "/#/landing_page" },
              "*"
            );
        }}
        className="group relative flex justify-between items-center h-[50px] px-[24px] cursor-pointer"
      >
        <div
          className={"absolute w-full h-full top-0 left-0 z-0"}
          style={{
            visibility: isSelected ? "visible" : "hidden",
            backgroundImage: `linear-gradient(to right, ${GrayPalette.LIGHTEST} , #FFFFFF)`,
          }}
        />
        <div
          className={clsx(
            "h-full w-[4px] absolute top-0 left-0 z-0 bg-gray-palette-lightest",
            { visible: isSelected },
            { hidden: !isSelected }
          )}
        />

        <div
          className={clsx(
            "flex items-center text-[14px] font-[600] font-manrope relative z-10 select-none",
            { "group-hover:text-black text-gray-500": !isSelected },
            { "text-black": isSelected }
          )}
        >
          <IoHomeOutline className="text-[20px]" />

          <div className="w-[8px]" />
          {/* label */}
          {"Home"}
        </div>

        <div ref={hideDockIconRef}>
          <StyledIcon
            onClick={() => showHideDock()}
            Icon={HideDockIcon}
            isChildSelect={false}
            isSelected={isSelected}
          />
        </div>
      </div>
    );
  else {
    return (
      <div className="flex flex-col justify-start items-center">
        <div
          onClick={() => showHideDock()}
          className="h-[40px] w-[40px] rounded-full flex justify-center items-center cursor-pointer bg-gray-100 group"
        >
          <ShowDockIcon className="group-hover:stroke-black stroke-gray-500" />
        </div>
        <div className="h-[20px]" />
        <div
          onClick={() => {
            window.parent.postMessage(
              { type: "navigate", href: "/#/landing_page" },
              "*"
            );
          }}
          className="cursor-pointer flex justify-center items-center h-[50px] relative w-full cursor-pointer group"
        >
          <div
            className={"absolute w-full h-full top-0 left-0 z-0"}
            style={{
              visibility: isSelected ? "visible" : "hidden",
              backgroundImage: "linear-gradient(to right, #DBDBF6 , #FFFFFF)",
            }}
          />
          <div
            className={clsx(
              "h-full w-[4px] absolute top-0 left-0 z-0 bg-gray-palette-lightest",
              { visible: isSelected },
              { hidden: !isSelected }
            )}
          />
          <IoHomeOutline className="text-[20px] z-10 text-gray-500 group-hover:text-black" />
        </div>
      </div>
    );
  }
};

const SidebarHeader = ({ isCollapsed }) => {
  return (
    <div
      className={clsx(
        "flex items-center sticky top-0 z-20 bg-white",
        {
          "py-[24px] px-[30px] flex-col justify-start": isCollapsed,
        },
        {
          "pt-[24px] px-[24px] pb-[44px] flex-row justify-between":
            !isCollapsed,
        }
      )}
    >
      <WiproLogo
        className="cursor-pointer"
        onClick={() => {
          window.parent.postMessage(
            { type: "navigate", href: "/#/landing_page" },
            "*"
          );
        }}
      />

      {isCollapsed ? <div className="h-[28px]" /> : null}

      <div
        className={clsx(
          "flex items-center",
          { "flex-col": isCollapsed },
          { "flex-row": !isCollapsed }
        )}
      >
        {/* <div className="flex justify-center items-center w-[36px] h-[36px] rounded-full relative bg-amber-200">
          <BellIcon className="fill-amber-500" />

          <div className="flex justify-center items-center w-[16px] h-[16px] rounded-full absolute -top-[6px] -right-[10px] border-[3px] border-white text-white text-[9px] font-bold bg-amber-500 box-content">
            21
          </div>
        </div>

        {isCollapsed ? (
          <div className="h-[20px]" />
        ) : (
          <div className="w-[16px]" />
        )} */}

        <div className="bg-gray-100 w-[36px] h-[36px] rounded-full flex justify-center items-center">
          <GoPeople />
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ Icon, label, path, href, ...props }) => {
  const location = useLocation();
  const isSelected = path === location.pathname;

  let isChildSelect = false;
  if (location.pathname.split("/").length === 3) {
    if (
      location.pathname.split("/")[1] ===
      label.toLowerCase().replaceAll(" ", "-")
    )
      isChildSelect = true;
  }

  const { onClick: providedOnClick, ...otherProps } = props;

  return (
    <>
      {/* gray seperator line */}
      <div className="h-[2px] w-full bg-gray-100" />

      {/* NewNavItem */}
      <div
        className="group relative flex justify-between items-center h-[50px] px-[24px] cursor-pointer"
        onClick={() => {
          if (!providedOnClick) {
            if (href)
              window.parent.postMessage({ type: "navigate", href }, "*");
          } else providedOnClick();
        }}
        {...otherProps}
      >
        <div
          className={"absolute w-full h-full top-0 left-0 z-0"}
          style={{
            visibility: isSelected ? "visible" : "hidden",
            backgroundImage: "linear-gradient(to right, #DBDBF6 , #FFFFFF)",
          }}
        />
        <div
          className={clsx(
            "h-full w-[4px] absolute top-0 left-0 z-0 bg-gray-palette-lightest",
            { visible: isSelected },
            { hidden: !isSelected }
          )}
        />

        <div
          className={clsx(
            "flex items-center text-[14px] font-[600] font-manrope relative z-10 select-none",
            { "text-gray-palette-dark": isChildSelect },
            {
              "group-hover:text-black text-gray-500":
                !isSelected && !isChildSelect,
            },
            { "text-black": isSelected && !isChildSelect }
          )}
        >
          {/* blank space if it is a child element */}
          {path && path.split("/").length > 2 ? (
            <div className="w-[24px]" />
          ) : null}

          {/* Icon */}
          <StyledIcon
            Icon={Icon}
            isChildSelect={isChildSelect}
            isSelected={isSelected}
          />

          <div className="w-[8px]" />
          {/* label */}
          {label}
        </div>

        {/* arrow icon */}
        {path ? (
          <ArrowIcon
            className={clsx(
              "relative z-10",
              { "stroke-gray-palette-dark": isChildSelect },
              {
                "group-hover:stroke-black stroke-gray-500":
                  !isSelected && !isChildSelect,
              },
              { "stroke-black": isSelected && !isChildSelect }
            )}
          />
        ) : null}
      </div>
    </>
  );
};

const CollapsedNavItem = ({ Icon, label, path, href, ...props }) => {
  const location = useLocation();
  const isSelected = path === location.pathname;

  let isChildSelect = false;
  if (location.pathname.split("/").length === 3) {
    if (
      location.pathname.split("/")[1] ===
      label.toLowerCase().replaceAll(" ", "-")
    )
      isChildSelect = true;
  }

  const { onClick: providedOnClick, ...otherProps } = props;

  return (
    <div
      className="flex justify-center items-center h-[50px] relative w-full cursor-pointer group"
      onClick={() => {
        if (!providedOnClick) {
          if (href) window.parent.postMessage({ type: "navigate", href }, "*");
        } else providedOnClick();
      }}
      {...otherProps}
    >
      <div
        className={"absolute w-full h-full top-0 left-0 z-0"}
        style={{
          visibility: isSelected || isChildSelect ? "visible" : "hidden",
          backgroundImage: "linear-gradient(to right, #DBDBF6 , #FFFFFF)",
        }}
      />
      <div
        className={clsx(
          "h-full w-[4px] absolute top-0 left-0 z-0 bg-gray-palette-lightest",
          { visible: isSelected || isChildSelect },
          { hidden: !isSelected && !isChildSelect }
        )}
      />

      <div className="relative z-10">
        <StyledIcon
          Icon={Icon}
          isSelected={isSelected || isChildSelect}
          isChildSelect={false}
        />
      </div>
    </div>
  );
};

const StyledIcon = ({ Icon, isChildSelect, isSelected, ...props }) => {
  if (
    [
      ArrowIcon,
      BoxesIcon,
      ElectricityIcon,
      HideDockIcon,
      PieChartIcon,
      SearchIcon,
      ShowDockIcon,
      TVIcon,
      WaterIcon,
    ].includes(Icon)
  )
    return (
      <Icon
        className={clsx(
          { "stroke-gray-palette-dark": isChildSelect },
          {
            "group-hover:stroke-black stroke-gray-500":
              !isSelected && !isChildSelect,
          },
          { "stroke-black": isSelected && !isChildSelect }
        )}
        {...props}
      />
    );
  else
    return (
      <Icon
        className={clsx(
          { "fill-gray-palette-dark": isChildSelect },
          {
            "group-hover:fill-black fill-gray-500":
              !isSelected && !isChildSelect,
          },
          { "fill-black": isSelected && !isChildSelect }
        )}
      />
    );
};
