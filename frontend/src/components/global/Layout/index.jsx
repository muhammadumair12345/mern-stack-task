import { useState } from "react";
import Main from "./Main";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import ASide from "./Aside";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen antialiased bg-gray-50 ">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <ASide sidebarOpen={sidebarOpen} />
      <Main>
        {children} <Outlet />
      </Main>
    </div>
  );
};

export default Layout;
