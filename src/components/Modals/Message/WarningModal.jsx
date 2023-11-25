import BaseModal from "../BaseModal";
import { useGlobalModalContext } from "../GlobalModal";

const WarningModal = () => {
	const { hideModal, store } = useGlobalModalContext();
	const { modalProps } = store || {};
	const { title, content, btnText } = modalProps || {};

	const handleCloseModal = () => hideModal();

	return (
		<BaseModal>
			<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
				<div className="sm:flex sm:items-start">
					<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 sm:mx-0 sm:h-10 sm:w-10">
						W
					</div>
					<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
						<h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{title}</h3>
						<div className="mt-2">
							<p className="text-sm text-gray-500">{content}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
				<button
					type="button"
					classNameName="inline-flex w-full justify-center rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 sm:ml-3 sm:w-auto"
					onClick={handleCloseModal}>
					{btnText ?? "Aceptar"}
				</button>
			</div>
		</BaseModal>
	);
}

export default WarningModal;
