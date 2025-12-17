import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Ghost,
  Gift,
  Shield,
  Settings,
  LogOut,
  ChevronRight,
  ChevronDown,
  Proportions,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";

// Sidebar Menu Items
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/" },
  { icon: Users, label: "All user", to: "/allUsers" },
  { icon: Ghost, label: "Avatar", to: "/avatar" },
  { icon: Gift, label: "Referral Reward", to: "/referral-reward" },
  { icon: Proportions, label: "Ads", to: "/ads" },
  { icon: Shield, label: "Admin", to: "/admin" },
  {
    icon: Settings,
    label: "Settings",
    hasSubmenu: true,
    submenuItems: [
      { label: "Privacy policy", to: "/settings/privacy-policy" },
      { label: "Terms & Condition", to: "/settings/terms" },
      { label: "Contact us", to: "/settings/contact-us" },
      { label: "FAQ", to: "/settings/faq" },
    ],
  },
];

export function Sidebar({ toggleSidebar, isOpen }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); //  Added useNavigate

  // Helper function to check if the current path is active
  const isActive = (path) => location.pathname === path;

  // Check if any settings submenu is active
  const isSettingsActive = menuItems
    .find((item) => item.hasSubmenu)
    ?.submenuItems?.some((sub) => isActive(sub.to));

  // Handle toggling of the settings dropdown
  const toggleSettingsDropdown = () => setSettingsOpen(!settingsOpen);
const handleLogout=()=>{
    navigate("/login");
}
  return (
    <div className="bg-[#0d0d1a] border-r border-gray-800 flex flex-col h-full">
      {/* Menu Items */}
      <nav className="flex-1 px-3 py-5">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.label}>
              {/* Fixed: Separate handling for submenu and regular items */}
              {item.hasSubmenu ? (
                // Settings with submenu - just a button
                <button
                  onClick={toggleSettingsDropdown}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                    settingsOpen || isSettingsActive
                      ? "bg-[#292949] text-white"
                      : "text-gray-400 hover:text-white hover:bg-[#1a1a2e]/50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 text-left text-xl font-nunito">
                    {item.label}
                  </span>
                  {settingsOpen ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              ) : (
                //  Regular menu items - wrapped with Link for navigation
                <Link to={item.to}>
                  <button
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                      isActive(item.to)
                        ? "bg-[#292949] text-white"
                        : "text-gray-400 hover:text-white hover:bg-[#1a1a2e]/50"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1 text-left text-xl font-nunito">
                      {item.label}
                    </span>
                  </button>
                </Link>
              )}

              {/* Settings Submenu */}
              {item.hasSubmenu && settingsOpen && item.submenuItems && (
                <ul className="mt-1 ml-4 space-y-3">
                  {item.submenuItems.map((subItem) => (
                    <li key={subItem.label}>
                      <Link to={subItem.to}>
                        <button
                          className={cn(
                            "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                            isActive(subItem.to)
                              ? "text-white bg-[#292949]"
                              : "text-gray-400 hover:text-white"
                          )}
                        >
                          <span
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              isActive(subItem.to)
                                ? "bg-cyan-400"
                                : "bg-gray-600"
                            )}
                          />
                          <span className="flex-1 text-left text-xl font-nunito">
                            {subItem.label}
                          </span>
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-800">
        <button
          onClick={() => {
            handleLogout()
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xl font-nunito">Log Out</span>
        </button>
      </div>
    </div>
  );
}