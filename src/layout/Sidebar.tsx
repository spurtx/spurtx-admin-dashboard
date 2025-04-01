import React from "react";
import { Link, useLocation } from "react-router-dom";

// Import images
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

const sidebarItems = [
  { name: "Dashboard", icon: dash, path: "/dashboard" },
  { name: "Sync", icon: sync, path: "/sync" },
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

  return (
    <div className="h-full bg-white flex flex-col p-3">
       <nav className="flex flex-col gap-3">
        {sidebarItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <div
              className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition ${
                location.pathname === item.path ? "" : ""
              }`}
            >
              <img src={item.icon} alt={item.name} className="w-4 h-4 object-contain" />
              <span className="text-[10px] text-gray-400 hidden xl:block">{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
