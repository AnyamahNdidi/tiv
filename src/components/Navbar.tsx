"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Logo from "../../public/Shape.png";
import Profile from "../../public/profile.png";
import notification from "../../public/notification.png";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

type NavbarProps = {
  onToggleSidebar: () => void;
};

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const { user } = useSelector((state: RootState) => state.auth);

  console.log("them", user);
  return (
    <nav className="fixed top-0 left-0 z-50 bg-white w-full shadow transition-shadow duration-300">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center space-x-4">
          {/* Hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Icon icon="mdi:menu" className="text-xl text-gray-700" />
          </button>

          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="Tivro logo"
              className="w-7 md:w-10"
              priority
            />
            <span className="font-bold text-lg md:text-2xl text-gray-900">
              Tivro
            </span>
          </Link>
        </div>

        {/* Right: Notification + Profile */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Notification */}
          <button
            className="flex items-center justify-center w-8 h-8 bg-[#F5F5F5] hover:bg-gray-200 rounded-full"
            aria-label="Notifications"
          >
            <Image
              src={notification}
              alt="Notifications"
              className="w-4 h-4 md:w-5 md:h-5"
            />
          </button>

          {/* Profile */}
          <div
            className="flex items-center space-x-2 md:space-x-3 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="User profile"
          >
            <Image
              src={user?.profileImage || Profile}
              alt="User profile image"
              width={10}
              height={10}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full"
            />
            <span className="hidden sm:inline-block text-sm font-medium text-[#333] truncate max-w-[120px]">
              {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
