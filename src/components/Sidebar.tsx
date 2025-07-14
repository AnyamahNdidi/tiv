"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter, usePathname } from "next/navigation";
import { routeMap } from "@/utils/routemap";
import { logoutUser } from "@/lib/redux/slices/authSlices";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems = [
    {
      name: "Overview",
      icon: "octicon:apps-24",
    },
    {
      name: "Verification",
      icon: "heroicons:clipboard-document-check",
      children: ["Landlord Management", "Tenant Verification", "Tasks"],
    },
    {
      name: "Finance",
      icon: "lucide:coins",
      children: ["Transaction", "Transaction Dump"],
    },
    {
      name: "Inspection",
      icon: "heroicons:rectangle-group",
      children: [
        "Tenant Inspection",
        "Inspection List",
        // "Agents Account"
      ],
    },
    {
      name: "Users",
      icon: "heroicons:user-group",
    },
    {
      name: "Reports",
      icon: "solar:flag-linear",
    },
    {
      name: "Settings",
      icon: "solar:settings-linear",
    },
  ];

  const handleClick = (child: string, parent?: string) => {
    const key = parent ? `${parent} - ${child}` : child;
    const path = routeMap[key];

    if (!path) {
      console.warn(`Missing route for ${key}`);
      return;
    }

    router.push(path);

    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsOpen(false);
      setOpenDropdown(null);
    }
  };

  const isParentActive = (parent: string) => {
    const matchingKeys = Object.keys(routeMap).filter(
      (key) => key === parent || key.startsWith(`${parent} -`)
    );
    return matchingKeys.some((key) => pathname === routeMap[key]);
  };

  const isChildActive = (parent: string, child: string) => {
    const key = `${parent} - ${child}`;
    return pathname === routeMap[key];
  };
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await dispatch(logoutUser() as any).unwrap();
      router.push("/"); // Redirect to login page after logout
    } catch (error) {
      // console.error("Logout failed:", error);
      // Even if the API call fails, we still want to clear local auth state
      router.push("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden p-2 fixed top-4 left-4 bg-white shadow-md rounded-full z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon icon="mdi:menu" className="text-2xl text-gray-700" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-14 left-0 w-64 bg-white p-5 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 
        min-h-screen flex flex-col justify-between`}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden p-2 absolute top-4 right-4 bg-gray-200 rounded-full"
          onClick={() => setIsOpen(false)}
        >
          <Icon icon="mdi:close" className="text-xl text-gray-700" />
        </button>

        {/* Navigation */}
        <nav className="flex flex-col space-y-4 flex-grow mt-8 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => {
                  if (item.children?.length) {
                    setOpenDropdown((prev) =>
                      prev === item.name ? null : item.name
                    );
                  } else {
                    handleClick(item.name);
                  }
                }}
                aria-expanded={openDropdown === item.name}
                aria-controls={`submenu-${item.name}`}
                className={`flex items-center justify-between w-full px-4 py-2 rounded-xl transition ${
                  (item.name === "Overview" &&
                    pathname === routeMap["Overview"]) ||
                  isParentActive(item.name)
                    ? "bg-[#EC5F34] text-white font-bold"
                    : "text-gray-700 hover:bg-orange-100"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon icon={item.icon} className="text-lg" />
                  <span className="text-[12px] font-semibold">{item.name}</span>
                </div>
                {item.children && (
                  <Icon
                    icon={
                      openDropdown === item.name
                        ? "mdi:chevron-up"
                        : "mdi:chevron-down"
                    }
                    className="text-xl"
                  />
                )}
              </button>

              {/* Dropdown for submenu */}
              {item.children && openDropdown === item.name && (
                <div
                  className="ml-10 mt-3 space-y-3"
                  id={`submenu-${item.name}`}
                >
                  {item.children.map((child) => (
                    <button
                      key={child}
                      onClick={() => handleClick(child, item.name)}
                      className={`block text-left w-full text-[12px] font-semibold px-2 py-2 rounded-lg ${
                        isChildActive(item.name, child)
                          ? "bg-[#EC5F34] text-white font-bold"
                          : "text-gray-600 hover:bg-orange-50"
                      }`}
                    >
                      {child}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div>
          <button
            className="flex items-center space-x-3 px-4 py-2 rounded-xl text-red-600 hover:bg-red-100 w-full"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <Icon icon="mdi:logout" className="text-lg" />
            <span className="text-[12px]">
              {isLoggingOut ? "Logging out..." : "Logout"}
            </span>
          </button>

          <div className="mt-6 text-start px-4 text-gray-700 text-xs">
            <p>v. 1.0</p>
            <p>©2025 Product of Urello Technologies Limited - 1787613</p>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
