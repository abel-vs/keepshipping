import { SearchBar } from "../searchbar";
import { DarkModeButton } from "./dark-mode-button";
import { MenuButton } from "./menu-button";

export const Header = () => {
  return (
    <header className="w-full p-4 flex gap-4 items-center justify-between">
      <a href="/" className="flex items-center gap-4">
        <span className="text-3xl">🚢</span>
        <span className="text-xl font-semibold">keepshipping</span>
      </a>
      <SearchBar />
      <div className="flex items-center gap-2">
        <MenuButton />
        <DarkModeButton />
      </div>
    </header>
  );
};
