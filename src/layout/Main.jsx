

import { useState } from "react";

import { Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader/MainHeader";
import { Sidebar } from "../components/Sidebar/Sidebar";


const Main = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
        <div className=" h-[100%] text-white">
     <div>
  
            <MainHeader toggleSidebar={toggleSidebar} />
     </div>
      {/* Main Content */}
      <div className="flex  overflow-hidden min-h-screen w-[100%]">
       {/* Sidebar  */}
    <div className="w-[20%]">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>

          <div className="w-[100%] overflow-x-hidden overflow-y-auto bg-[#0D0D1A] ">
          <Outlet></Outlet>
        </div>
  
      </div>
    </div>
  );
};

export default Main;
