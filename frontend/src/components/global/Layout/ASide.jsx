import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { sideBarNavigation } from "../../../routes";

const ASide = ({ sidebarOpen }) => {
  const { pathname } = useLocation();
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSubMenu = (name) => {
    if (openSubMenu === name) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(name);
    }
  };

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform bg-white border-r border-gray-200 shadow-sm md:translate-x-0`}
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="h-full px-3 py-5 overflow-y-auto bg-white">
        <ul className="space-y-2">
          {sideBarNavigation?.map((item) => (
            <li key={item.name}>
              <div
                className={`${
                  pathname === item.href ||
                  (item.children && openSubMenu === item.name)
                    ? "bg-primary text-white"
                    : "text-gray-900"
                } flex items-center justify-between p-3 text-base font-medium rounded-lg hover:bg-primary hover:text-white group`}
              >
                <Link to={item.href} className="flex items-center">
                  <item.icon
                    className={`${
                      pathname === item.href ||
                      (item.children && openSubMenu === item.name)
                        ? "bg-primary text-white"
                        : "text-gray-900"
                    } w-5 h-5 transition duration-75 group-hover:text-white`}
                    aria-hidden="true"
                  />
                  <span className="ml-3">{item.name}</span>
                </Link>
                {item.children && (
                  <button
                    onClick={() => toggleSubMenu(item.name)}
                    className="ml-auto"
                  >
                    {openSubMenu === item.name ? (
                      <FaChevronUp className="w-5 h-5" />
                    ) : (
                      <FaChevronDown className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
              {item.children && openSubMenu === item.name && (
                <ul className="ml-5 mt-1 flex flex-col gap-1">
                  {item.children.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        to={subItem.href}
                        className={`${
                          pathname === subItem.href
                            ? "border-l-4 border-primary text-primary"
                            : "text-gray-600"
                        } flex items-center justify-between p-2 text-[14px] rounded-lg font-medium  hover:border-l-4 hover:border-primary hover:text-primary  group`}
                      >
                        <div className="flex items-center gap-2">
                          <subItem.icon
                            className={`${
                              pathname === subItem.href
                                ? " text-primary"
                                : "text-gray-600"
                            } w-4 h-4 transition duration-75 group-hover:text-primary`}
                            aria-hidden="true"
                          />
                          <span>{subItem.name}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ASide;
