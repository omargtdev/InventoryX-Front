import { Link } from "react-router-dom";

const SidebarItem = ({
	toggle, handleToggle, isUserAdmin,
	expandedItems, selectedItem, handleLogout, data
}) => {
	const isEmployeeButton = data.id === 7;
	if(!isUserAdmin && isEmployeeButton)
		return;

	const isExpanded = expandedItems.includes(data.id);
	const isSelected = selectedItem === data.id;

	const isLogoutButton = data.id === 8;
	const logout = () => {
		handleToggle(data.id); // apply effect too
		const confirmed = confirm("¿Esta seguro que desea cerrar sesión?");
		if (confirmed)
			handleLogout();
	}

	return (
		<Link
			to={data.path || "#"}
			className={`${toggle ? "last:w-[3.6rem] " : "last:w-[17rem] "} ${isSelected ? "bg-white" : "hover:bg-white "
				} flex items-start mt-2 p-4 flex-col rounded-lg cursor-pointer group transition-all duration-500  last:absolute left-4 bottom-4`}
			key={data.id}
			onClick={!isLogoutButton
				? _ => handleToggle(data.id)
				: _ => logout()
			}
		>
			<div className="flex">
				<div className="mr-8 text-[1.7rem] text-brown ">{data.icon}</div>
				<div
					className={`${toggle
						? "opacity-0 group-hover:opacity-100  group-hover:duration-500 group-hover:bg-white group-hover:rounded-md group-hover:px-2 transition-all duration-500"
						: "delay-200 "
						} text-[1rem] text-black font-sans-montserrat  whitespace-pre`}
				>
					{data.text}
				</div>
			</div>
			{data.subItems && isExpanded && (
				<div className="w-full">
					{data.subItems.map((subItem) => ( <Link to={subItem.path} key={subItem.id}>
							<h2
								key={subItem.id}
								className="p-2 text-black hover:bg-gray-200 transition-all duration-500 rounded-md"
							>
								{subItem.text}
							</h2>
						</Link>
					))}
				</div>
			)}
		</Link>
	);
}

export default SidebarItem;
