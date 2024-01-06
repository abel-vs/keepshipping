"use client";
import {
  Bars3Icon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { Cog, Dumbbell, Library } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { DarkModeButton } from "./dark-mode-button";
import { MenuButton } from "./menu-button";
import { SearchBar } from "../searchbar";

// export function Topbar() {
//   const [isMenuVisible, setMenuVisible] = useState(false);

//   const toggleMenu = () => {
//     console.log("toggleMenu called", !isMenuVisible);
//     setMenuVisible(!isMenuVisible);
//     console.log(isMenuVisible);
//   };

//   return (
//     <>
//       <header className="w-full p-4 flex gap-4 items-center bg-background justify-between z-20">
//         <a href="/" className="flex items-center gap-4">
//           <span className="text-3xl">🚢</span>
//           <span className="text-lg font-semibold">keepshipping</span>
//         </a>
//         <button onClick={toggleMenu}>
//           <Bars3Icon className="h-6 w-6" />
//         </button>
//       </header>

//       <div
//         className={`fixed top-0 z-10 flex w-full justify-center bg-background gap-2 px-4 pb-4 pt-20 text-lg shadow-xl transition-transform duration-200 ease-in-out ${
//           isMenuVisible ? "translate-y-0" : "-translate-y-full"
//         }`}
//       >
//         <SearchBar />
//         <MenuButton />
//         <DarkModeButton />
//       </div>
//     </>
//   );
// }

export function TopBarHeader({ toggleMenu }: { toggleMenu: () => void }) {
  return (
    <div className="w-full p-4 flex gap-4 items-center bg-background justify-between z-30">
      <a href="/" className="flex items-center gap-4">
        <span className="text-3xl">🚢</span>
        <span className="text-lg font-semibold">keepshipping</span>
      </a>
      <button onClick={toggleMenu}>
        <Bars3Icon className="h-6 w-6" />
      </button>
    </div>
  );
}

export function MenuPopup({ isMenuVisible }: { isMenuVisible: boolean }) {
  return (
    <div
      className={` z-10 flex w-full justify-center bg-background gap-2 px-4 pb-4 mb-4 text-lg shadow-xl transition-transform duration-300 ease-in-out ${
        isMenuVisible ? "translate-y-0" : "hidden -translate-y-full"
      }`}
    >
      <SearchBar />
      <MenuButton />
      <DarkModeButton />
    </div>
  );
}

export function Topbar() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <TopBarHeader toggleMenu={toggleMenu} />
      <MenuPopup isMenuVisible={isMenuVisible} />
    </>
  );
}
