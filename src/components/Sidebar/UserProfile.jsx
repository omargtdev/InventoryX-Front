import React from "react";
import user from "../../assets/user.png";
const UserProfile = ({ toggle }) => {
	return (
		<div
			className={`flex gap-5 items-center ${
				toggle
					? " bg-none  transition-all  delay-200 "
					: "bg-white rounded-xl p-2 delay-200"
			}`}
		>
			<div className="min-w-[3.5rem] h-[3.5rem]">
				<img
					src={user}
					alt=""
					className="w-full h-full rounded-full object-cover"
				/>
			</div>
			<div className={toggle ? "opacity-0 delay-200" : "delay-200"}>
				<h3 className="text-xl ">Omar Gutierrez</h3>
			</div>
		</div>
	);
};

export default UserProfile;
