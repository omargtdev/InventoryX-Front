import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Sidebar from "../../components/Sidebar";
import { useIsUserLoggedIn } from "../../hooks/useIsUserLoggedIn";

const Dashboard = () => {
	const isUserLoggedIn = useIsUserLoggedIn();
	const navigate = useNavigate();

	useEffect(() => {
		if(!isUserLoggedIn)
			navigate("/login");
	}, [isUserLoggedIn])

	return (
		<>
			<Sidebar />

			<Outlet />
		</>
	);
};

export default Dashboard;
