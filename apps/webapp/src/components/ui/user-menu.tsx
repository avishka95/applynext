"use client";

import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./dropdown-menu";

const UserMenu = () => {
	const [open, setOpen] = useState(false);
	const menuRef = useRef(null);

	const handleClick = () => {
		setOpen((e) => !e);
	};
	return (
		<div className="relative mx-1 p-1 align-middle">
			{/* <button
				type="button"
				className="rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600"
				id="user-menu-button"
				aria-haspopup="true"
				aria-expanded={open}
				// onClick={handleUserMenuClick}
			>
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</button> */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => {}}>
						Login
					</DropdownMenuItem>
					{/* <DropdownMenuItem onClick={() => {}}>Dark</DropdownMenuItem>
					<DropdownMenuItem onClick={() => {}}>
						System
					</DropdownMenuItem> */}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserMenu;
