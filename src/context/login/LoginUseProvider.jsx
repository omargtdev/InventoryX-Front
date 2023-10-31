import { useState } from "react";
import { LoginUseContext } from "./LoginUseContext";

export const LoginUseProvider = ({ children }) => {
	const [isSignIn, setIsSignIn] = useState(false);

	const toggleForm = () => {
		setIsSignIn(!isSignIn);
	};

	return (
		<LoginUseContext.Provider
			value={{
				isSignIn,
				toggleForm,
			}}
		>
			{children}
		</LoginUseContext.Provider>
	);
};
