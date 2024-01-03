import Spacer from "../ui/spacer";
import { MenuButton } from "./menu-button";

export const Header = () => {
  return (
    <header className="w-full p-4 flex gap-4 items-center">
      <span className="text-3xl">🚢</span>
      <span className="text-xl font-semibold">keepshipping</span>
      <Spacer />
      <MenuButton />
    </header>
  );
};
