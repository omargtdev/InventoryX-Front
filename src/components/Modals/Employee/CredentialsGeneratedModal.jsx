import SuccessCheckSvg from "../../Icons/SuccessCheckSvg";
import { useGlobalModalContext } from "../GlobalModal";

const CredentialsGeneratedModal = () => {
	const { hideModal, store } = useGlobalModalContext();
	const { modalProps } = store || {};
	const { username, password } = modalProps || {};

	const handleCloseModal = () => hideModal();

	return (
		<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
								<SuccessCheckSvg />
							</div>
							<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
								<h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Credenciales generadas para el usuario</h3>
								<div className="mt-3 flex justify-between items-center">
									<label className="font-bold">Usuario: </label>
									<input type="text" name="username" value={username} readOnly className="py-1.5 pl-2 text-gray-900 sm:text-sm sm:leading-6" />
								</div>
								<div className="mt-3 flex justify-between items-center">
									<label className="font-bold">Contraseña: </label>
									<input type="text" name="password" value={password} readOnly className="py-1.5 pl-2 text-gray-900 sm:text-sm sm:leading-6" />
								</div>
							</div>
						</div>
					</div>
					<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
						<button
							type="button"
							className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
							onClick={handleCloseModal}>
							Aceptar
						</button>
					</div>
					</div>
				</div>
			</div>
		</div>
	);

}

export default CredentialsGeneratedModal;
