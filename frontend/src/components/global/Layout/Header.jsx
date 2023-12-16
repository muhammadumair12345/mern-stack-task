import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { signout } = useAuth();
  return (
    <header className="px-4 py-2.5 bg-primary border-b border-secondary fixed left-0 right-0 top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg cursor-pointer md:hidden focus:bg-secondary focus:ring-2 focus:ring-white  hover:bg-secondary"
          >
            <FaBars className="w-6 h-6 text-white" />
            <span className="sr-only">Toggle sidebar</span>
          </button>
          <Link to="/" className="text-secondary font-bold text-xl">
            Admin Panel
          </Link>
        </div>
        {/* User */}
        <Menu as="div">
          <div>
            <Menu.Button className="flex mx-3 text-sm bg-primary rounded-full focus:ring-4 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary text-white font-bold shadow-md">
                U
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 py-1 m-2 origin-top-right bg-white rounded-md shadow-lg w-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <div className="py-1 text-gray-700">
                  <div
                    onClick={signout}
                    className="block cursor-pointer px-4 py-2 text-sm hover:bg-white"
                  >
                    Sign out
                  </div>
                </div>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
