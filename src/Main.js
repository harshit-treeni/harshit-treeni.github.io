import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { CustomGrayLight } from "./colors";

function Main() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div
        style={{ background: CustomGrayLight }}
        className="flex-1 overflow-y-auto relative"
      >
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
