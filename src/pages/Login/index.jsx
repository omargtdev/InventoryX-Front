import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import authService from "../../services/auth.service";

import BtnLogin from "../../components/BtnLogin";
import { LoginUseContext } from "../../context/login/LoginUseContext";
import { useIsUserLoggedIn } from "../../hooks/useIsUserLoggedIn";
import { useUserStore } from "../../store/useUserStore";

const Login = () => {
	const isUserLoggedIn = useIsUserLoggedIn();
	const setUserToken = useUserStore(state => state.setToken);
	const navigate = useNavigate();

	useEffect(() => {
		if(isUserLoggedIn)
			navigate("/");
	}, [isUserLoggedIn])

	const { isSignIn: isSignInForm } = useContext(LoginUseContext);
	const [resetUsername, setResetUsername] = useState("");
	const [loginUsername, setLoginUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { isOk, data, errorMessage } = await authService.login(
			loginUsername,
			password
		);
		if (isOk) {
			setUserToken(data.token);
			return;
		}

		alert(errorMessage);
	};

	const handleResetPassword = async (e) => {
		e.preventDefault();

		// TODO: Implement the reset logic
		alert(`Se envio un email a tu correo registrado con el nombre de usuario ${resetUsername}`)
	};

	return (
		<section className="bg-[#f6f5f7] flex justify-center items-center flex-col h-screen font-sans-montserrat p-6">
			<div
				className={` bg-[#fff] shadow-3xl rounded-xl relative overflow-hidden w-[768px] max-w-full md:min-h-[480px] min-h-[800px] ${
					isSignInForm ? "right-panel-active" : ""
				}`}
			>
				<div className="absolute top-0 md:h-full h-[50%] transition-all duration-[1s] ease-in-out sign-up-container left-0 w-full md:w-[50%]">
					<form
						className="bg-[#ffffff] flex items-center justify-center flex-col py-0 px-12 h-full gap-4 text-center"
						onSubmit={handleResetPassword}
					>
						<h2 className="text-3xl font-bold ">Restablece tu Contraseña</h2>
						<input
							className="bg-[#eee] border-none px-3 py-4 w-full rounded-3xl outline-none"
							type="text"
							placeholder="Usuario"
							value={resetUsername}
							onChange={(e) => setResetUsername(e.target.value)}
							required
						/>
						<BtnLogin btnName={"Enviar"} bgButton={true} />
					</form>
				</div>
				<div className="absolute top-0 md:h-full h-[50%] transition-all duration-[1s] ease-in-out sign-in-container left-0 w-full md:w-[50%]">
					<form
						className="bg-[#ffffff] flex items-center justify-center flex-col py-0 px-12 gap-4 h-full text-center"
						onSubmit={handleSubmit}
					>
						<div className="leading-nonet">
							<h1 className="text-3xl font-bold ">¡Bienvenido!</h1>
							<p>Por favor ingresa tu cuenta</p>
						</div>
						<input
							className="bg-[#eee] border-none px-3 py-4 w-full rounded-3xl outline-none"
							type="text"
							value={loginUsername}
							placeholder="Usuario"
							onChange={(e) => setLoginUsername(e.target.value)}
							required
						/>
						<input
							className="bg-[#eee] border-none px-3 py-4 w-full rounded-3xl outline-none"
							type="password"
							value={password}
							placeholder="Contraseña"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<BtnLogin btnName={"Continuar"} bgButton={true} />
					</form>
				</div>

				<div className="overlay-container absolute md:top-0 bottom-0 md:left-1/2 left-0 w-full md:w-1/2 md:h-full h-[50%] overflow-hidden transform duration-[1s] ease-in-out z-50 ">
					<div className="bg-overlay overlay text-white relative -top-full md:-top-0 md:-left-full h-[200%] md:h-full w-full md:w-[200%] transform translate-x-0 duration-[1s] ease-in-out ">
						<div className="overlay-left absolute overlay-panel flex items-center justify-center flex-col text-center top-0 h-1/2 md:h-full w-full md:w-1/2 py-0 gap-4 px-10 translate-x-0 duration-[1s] ease-in-out">
							<h2 className="text-3xl">¡Bienvenido de nuevo!</h2>
							<p>
								Para mantenerse conectado con nosotros, inicie sesión con su
								información personal
							</p>
							<BtnLogin btnName={"Iniciar Sesión"} bgButton={false} />
						</div>
						<div className="overlay-right absolute bottom-0 md:right-0 overlay-panel flex items-center justify-center flex-col text-center md:top-0  h-1/2 md:h-full w-full md:w-1/2 py-0 px-10  translate-x-0 duration-[1s] ease-in-out gap-4">
							<h2 className="text-3xl">Hola, Amigo!</h2>
							<BtnLogin btnName={"Olvidaste tu Contraseña"} bgButton={false} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
