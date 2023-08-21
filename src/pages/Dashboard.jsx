import React from "react";
import SideBar from "../components/core/Dashboard/SideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="text-white  ">
      <div className="flex text-white relative w-full">
        <style>
          {`
            .nav-bar {
              // position: fixed;
              // top: 0;
              
              // width: 100%;
              // z-index:1000;
              background-color:#161d29;
              
            }
          `}
        </style>
        
          <SideBar />
        

        <div className="h-[calc(100vh-3.5 rem)] w-full  overflow-auto ">
          <div className=" lg:w-[calc(100vw-250px)] ml-auto flex items-center justify-center  py-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
