import { createContext, useState, useContext } from "react";
import DangerModal from "./Message/DangerModal";
import InfoModal from "./Message/InfoModal";
import SuccessModal from "./Message/SuccessModal";
import WarningModal from "./Message/WarningModal";
import DeleteModal from "./Generic/DeleteModal";
import CredentialsGeneratedModal from "./Employee/CredentialsGeneratedModal";

export const MODAL_TYPES = {
	GENERIC: {
		DELETE_MODAL: "DELETE_MODAL",
	},
	MESSAGE: {
		SUCCESS_MODAL: "SUCCESS_MODAL",
		WARNING_MODAL: "WARNING_MODAL",
		DANGER_MODAL: "DANGER_MODAL",
		INFO_MODAL: "INFO_MODAL",
	},
	EMPLOYEE: {
		CREDENTIALS_GENERATED: "CREDENTIALS_GENERATED",
	},
	CLIENT: {
		CREDENTIALS_GENERATED: "CREDENTIALS_GENERATED",
	},
	PROVIDER: {
		CREDENTIALS_GENERATED: "CREDENTIALS_GENERATED",
	},
};

const MODAL_COMPONENTS = {
	[MODAL_TYPES.MESSAGE.SUCCESS_MODAL]: SuccessModal,
	[MODAL_TYPES.MESSAGE.WARNING_MODAL]: WarningModal,
	[MODAL_TYPES.MESSAGE.DANGER_MODAL]: DangerModal,
	[MODAL_TYPES.MESSAGE.INFO_MODAL]: InfoModal,

	[MODAL_TYPES.GENERIC.DELETE_MODAL]: DeleteModal,

	[MODAL_TYPES.EMPLOYEE.CREDENTIALS_GENERATED]: CredentialsGeneratedModal,
};

const initialState = {
	showModal: () => {},
	hideModal: () => {},
	store: {},
};

const GlobalModalContext = createContext(initialState);
export const useGlobalModalContext = () => useContext(GlobalModalContext);

export const GlobalModal = ({ children }) => {
	const [store, setStore] = useState();
	const { modalType, modalProps } = store || {};

	const showModal = (modalType, modalProps = {}) => {
		setStore({
			...store,
			modalType,
			modalProps,
		});
	};

	const hideModal = () => {
		setStore({
			...store,
			modalType: null,
			modalProps: {},
		});
	};

	const renderComponent = () => {
		const ModalComponent = MODAL_COMPONENTS[modalType];
		if (!modalType || !ModalComponent) {
			return null;
		}

		return <ModalComponent id="global-modal" {...modalProps} />;
	};

	return (
		<GlobalModalContext.Provider value={{ store, showModal, hideModal }}>
			{renderComponent()}
			{children}
		</GlobalModalContext.Provider>
	);
};
