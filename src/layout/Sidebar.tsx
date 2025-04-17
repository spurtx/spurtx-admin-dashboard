
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import dash from "../assets/images/side/dash-logo.png";
import sync from "../assets/images/side/sync-logo.png";
import sparks from "../assets/images/side/sparks-logo.png";
import spur from "../assets/images/side/spur-logo.png";
import spot from "../assets/images/side/spot-logo.png";
import score from "../assets/images/side/score-logo.png";
import wallet from "../assets/images/side/wallet-logo.png";
import employee from "../assets/images/side/employee-logo.png";
import temp from "../assets/images/side/temp-logo.png";
import prod from "../assets/images/side/prod-logo.png";
import subs from "../assets/images/side/subs-logo.png";
import account from "../assets/images/side/account-logo.png";
import sync_task from "../assets/images/svg/sync_tasks.svg";
import sync_proj from "../assets/images/svg/sync_proj.svg";
import sync_prop from "../assets/images/svg/sync_propo.svg";
import sync_mile from "../assets/images/svg/sync_mile.svg";
import arr from "../assets/images/svg/arr-right.svg";

const sidebarItems = [
  { name: "Dashboard", icon: dash, path: "/" },
  {
    name: "Sync",
    icon: sync,
    path: "/sync",
    subItems: [
      { name: "Projects", path: "/sync/projects", icon: sync_proj },
      { name: "Milestones", path: "/sync/milestones", icon: sync_mile },
      { name: "Proposals", path: "/sync/proposals", icon: sync_prop },
      { name: "Tasks", path: "/sync/tasks", icon: sync_task },
    ],
  },
  { name: "Sparks", icon: sparks, path: "/sparks" },
  { name: "Spur", icon: spur, path: "/spur" },
  { name: "Spot", icon: spot, path: "/spot" },
  { name: "Score", icon: score, path: "/score" },
  { name: "Sync! Wallet", icon: wallet, path: "/sync-wallet" },
  { name: "Employees", icon: employee, path: "/employees" },
  { name: "Templates", icon: temp, path: "/templates" },
  { name: "Product Lists", icon: prod, path: "/products" },
  { name: "Subscription", icon: subs, path: "/subscription" },
  { name: "Account Management", icon: account, path: "/account-management" },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropDown] = useState<string | null>(null);

  const handleDropdownToggle = (name: string) => {
    setOpenDropDown(openDropdown === name ? null : name);
  };

  return (
    <div className="h-full bg-white flex flex-col p-3">
      <nav className="flex flex-col gap-3">
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname.startsWith(item.path);
          const isDropdownOpen = openDropdown === item.name;

          return (
            <div key={index}>
              {item.subItems ? (
                <>
                  {/* Parent Menu Item (With Dropdown) */}
                  <div
                    className="flex items-center justify-between p-2 rounded-md cursor-pointer transition"
                    onClick={() => handleDropdownToggle(item.name)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.icon}
                        alt={item.name}
                        className={`w-4 h-4 object-contain transition ${
                          isActive
                            ? "bg-gradient-to-r from-[#00A15D] to-[#C16407] text-transparent bg-clip-text"
                            : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`text-[10px] hidden xl:block transition ${
                          isActive
                            ? "bg-gradient-to-r from-[#00A15D] to-[#C16407] text-transparent bg-clip-text font-semibold"
                            : "text-gray-400"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>

                    {/* Dropdown Arrow */}
                    <img
                      src={arr}
                      alt="Dropdown arrow"
                      className={`w-2.5 h-2.5 transition-transform ${
                        isDropdownOpen
                          ? "rotate-90 bg-gradient-to-r from-[#00A15D] to-[#C16407] text-transparent bg-clip-text"
                          : "text-gray-400"
                      }`}
                    />
                  </div>

                  {/* Dropdown Sub-Items */}
                  {isDropdownOpen && (
                    <div className="ml-6 flex flex-col gap-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={subItem.path}
                          className={({ isActive }) =>
                            `flex items-center gap-3 p-2 rounded-md transition ${
                              isActive ? "text-purple-500 font-semibold" : "text-gray-400"
                            }`
                          }
                        >
                          <img src={subItem.icon} alt={subItem.name} className="w-4 h-4 object-contain" />
                          <span className="text-[10px] hidden xl:block">{subItem.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                /* Regular Menu Item */
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 transition ${
                      isActive
                        ? "bg-gradient-to-r from-[#00A15D] to-[#C16407] text-transparent bg-clip-text"
                        : "text-gray-400"
                    }`
                  }
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={`w-4 h-4 object-contain transition ${
                      isActive
                        ? "bg-gradient-to-r from-[#00A15D] to-[#C16407] text-transparent bg-clip-text"
                        : "text-gray-400"
                    }`}
                  />
                  <span className="text-[10px] hidden xl:block">{item.name}</span>
                </NavLink>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

