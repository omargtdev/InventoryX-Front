import { useState, useEffect } from "react";
import { datas } from "./Data";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

const SidebarData = ({ toggle }) => {
	const [expandedItems, setExpandedItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);

	const setUserToken = useUserStore(state => state.setToken);
	const setUserInfo = useUserStore(state => state.setUser);
	const navigate = useNavigate();

	const toggleItem = (itemId) => {
		if (expandedItems.includes(itemId)) {
			setExpandedItems((prevItems) => prevItems.filter((id) => id !== itemId));
			setSelectedItem(null);
		} else {
			setExpandedItems([itemId]);
			setSelectedItem(itemId);
		}
	};

	const logout = () => {
		setUserToken(null);
		setUserInfo(null);
		navigate("/login");
	}

	useEffect(() => {
		if (toggle) {
			setExpandedItems([]);
			setSelectedItem(null);
		}
	}, [toggle]);

	return (
		<div className="">
			{datas.map(data =>
				(
					<SidebarItem
						key={data.id}
						toggle={toggle}
						handleToggle={toggleItem}
						handleLogout={logout}
						expandedItems={expandedItems}
						selectedItem={selectedItem}
						data={data}
					/>
			))}
		</div>
	);
};

export default SidebarData;
