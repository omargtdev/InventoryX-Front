import React, { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import SidebarData from "./SidebarData";
import UserProfile from "./UserProfile";

const Sidebar = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<div
			className={`${
				toggle ? "w-[5.8rem] delay-200 " : ""
			} bg-overlay-side h-[100vh] w-[20rem] rounded-tr-3xl rounded-br-3xl p-4  transition-all duration-500 relative`}
		>
			<UserProfile toggle={toggle} />
			<SidebarData toggle={toggle} />
			<div
				className="absolute top-[2.5rem] flex justify-center items-center -right-5 w-8 h-8 bg-black/50 rounded-full cursor-pointer"
				onClick={() => {
					setToggle(!toggle);
				}}
			>
				<BiChevronLeft
					className={`${
						toggle ? "rotate-180" : ""
					} text-3xl transition-all duration-400`}
				/>
			</div>
		</div>
	);
};

export default Sidebar;
