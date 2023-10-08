import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Welcome from "../pages/Welcome";

import { LoginUseProvider } from "../context/login/LoginUseProvider";

export const router = createBrowserRouter([
	{
		path: "/login",
		element: (
				<LoginUseProvider>
						<Login />
				</LoginUseProvider>
		),
	},
	{
		path: "/",
		element: <Dashboard />,
		children: [
			{
				index: true,
				element: <Welcome />,
			},
		],
	},
]);
