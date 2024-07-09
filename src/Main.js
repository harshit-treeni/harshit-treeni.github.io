import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function Main() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 overflow-y-auto relative bg-gray-100">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
