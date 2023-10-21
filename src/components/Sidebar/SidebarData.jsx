import React, { useState, useEffect } from "react";
import { datas } from "./Data";
import { Link } from "react-router-dom";
const SidebarData = ({ toggle }) => {
	const [expandedItems, setExpandedItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);

	const toggleItem = (itemId) => {
		if (expandedItems.includes(itemId)) {
			setExpandedItems((prevItems) => prevItems.filter((id) => id !== itemId));
			setSelectedItem(null);
		} else {
			setExpandedItems([itemId]);
			setSelectedItem(itemId);
		}
	};

	useEffect(() => {
		if (toggle) {
			setExpandedItems([]);
			setSelectedItem(null);
		}
	}, [toggle]);

	return (
		<div className="">
			{datas.map((data) => {
				const isExpanded = expandedItems.includes(data.id);
				const isSelected = selectedItem === data.id;
				return (
					<Link
						to={data.path || "#"}
						className={`${toggle ? "last:w-[3.6rem] " : "last:w-[17rem] "} ${
							isSelected ? "bg-white" : "hover:bg-white "
						} flex items-start mt-2 p-4 flex-col rounded-lg cursor-pointer group transition-all duration-500  last:absolute left-4 bottom-4`}
						key={data.id}
						onClick={() => toggleItem(data.id)}
					>
						<div className="flex">
							<div
								className={`${
									toggle
										? "text-[1.7rem] text-brown delay-500"
										: "mr-8 text-[1.7rem] text-brown "
								}`}
							>
								{data.icon}
							</div>
							<div
								className={`${
									toggle
										? "opacity-0 group-hover:opacity-100  group-hover:duration-500 group-hover:bg-white group-hover:rounded-md group-hover:px-2 transition-all duration-500"
										: "delay-200"
								} text-base text-black font-sans-montserrat  whitespace-pre`}
							>
								{data.text}
							</div>
						</div>
						{data.subItems && isExpanded && (
							<div className="relative">
								<div className={`w-full  text-black`}>
									{data.subItems.map((subItem) => (
										<Link to={subItem.path} key={subItem.id}>
											<h2
												className={` p-2 text-black md:text-sm hover:bg-gray-200 transition-all duration-500 rounded-md`}
											>
												{subItem.text}
											</h2>
										</Link>
									))}
								</div>
							</div>
						)}
					</Link>
				);
			})}
		</div>
	);
};

export default SidebarData;
