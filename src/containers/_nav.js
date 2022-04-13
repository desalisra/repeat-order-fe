import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faColumns,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: (
      <FontAwesomeIcon
        icon={faColumns}
        size={"lg"}
        className="c-sidebar-nav-icon"
      />
    ),
  },

  {
    _tag: "CSidebarNavItem",
    name: "Repeat Order",
    to: "/repeat-order",
    icon: (
      <FontAwesomeIcon
        icon={faListAlt}
        size={"lg"}
        className="c-sidebar-nav-icon"
      />
    ),
  },

  {
    _tag: "CSidebarNavItem",
    name: "Coba Data",
    to: "/reqdata",
    icon: (
      <FontAwesomeIcon
        icon={faListAlt}
        size={"lg"}
        className="c-sidebar-nav-icon"
      />
    ),
  },
];

export default _nav;
