import { useContext } from "react";
import { LoginUseContext } from "../context/login/LoginUseContext";

const BtnLogin = ({ btnName, bgButton }) => {
	const { toggleForm } = useContext(LoginUseContext);

	const handleClickButton = () => {
		if (!bgButton) {
			toggleForm();
		}
	};
	return (
		<>
			<button
				onClick={handleClickButton}
				className={`rounded-[20px] text-sm text-white font-bold px-11 py-3 leading-tight uppercase transition-transform duration-300 ease-in active:scale-90 focus:outline-none ${
					!bgButton
						? "bg-transparent border border-solid border-[#a8e1fc]"
						: "bg-black"
				}  `}
			>
				{btnName}
			</button>
		</>
	);
};

export default BtnLogin;
