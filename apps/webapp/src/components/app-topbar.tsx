import React from "react";
import UserMenu from "./ui/user-menu";
import { ThemeToggle } from "./ui/theme-toggle";

const AppTopBar = () => {
	return (
		<header className="w-full border-b bg-transparent shadow-sm text-white flex space-x-2  justify-end-safe px-5 pt-2 pb-1 items-center">
			<ThemeToggle />
			<UserMenu />
		</header>
	);
};

export default AppTopBar;
