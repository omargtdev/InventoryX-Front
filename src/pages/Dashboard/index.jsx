import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

import Sidebar from "../../components/Sidebar/Side";
import { useIsUserLoggedIn } from "../../hooks/useIsUserLoggedIn";

const Dashboard = () => {
	const isUserLoggedIn = useIsUserLoggedIn();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isUserLoggedIn) navigate("/login");
	}, [isUserLoggedIn]);

	return (
		<>
			<div className="flex gap-10">
				<Sidebar />
				<Outlet />
			</div>
		</>
	);
};

export default Dashboard;
