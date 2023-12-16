import { FaPlusCircle, FaUsers } from "react-icons/fa";

export const sideBarNavigation = [
  {
    name: "Users",
    href: "/",
    icon: FaUsers,
    children: [{ name: "Add", href: "/add", icon: FaPlusCircle }],
  },
];
