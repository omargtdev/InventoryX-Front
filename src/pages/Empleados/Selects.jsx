const optPermisions = [
	{ value: "view_client", label: "view_client", color: "#3a87bb" },
	{ value: "view_entry", label: "view_entry", color: "#3a87bb" },
	{ value: "create_entry", label: "create_entry", color: "#3a87bb" },
	{ value: "cancel_issue", label: "Cancelar salida", color: "#3a87bb" },
	{ value: "create_client", label: "cancel_issue", color: "#3a87bb" },
	{ value: "view_issue", label: "view_issue", color: "#3a87bb" },
	{ value: "update_client", label: "update_client", color: "#3a87bb" },
	{ value: "activate_client", label: "activate_client", color: "#3a87bb" },
	{ value: "create_issue", label: "create_issue", color: "#3a87bb" },
	{
		value: "deactivate_client",
		label: "deactivate_client",
		color: "#3a87bb",
	},
	{ value: "cancel_entry", label: "cancel_entry", color: "#3a87bb" },
];

const colorStyles = {
	control: (styles) => ({
		...styles,
		backgroundColor: "white",
	}),
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		return { ...styles, color: "black", cursor: "pointer" };
	},
	multiValue: (styles, { data }) => {
		return {
			...styles,
			backgroundColor: data.color,
			color: "white",
		};
	},
	multiValueLabel: (styles, { data }) => {
		return { ...styles, color: "white" };
	},
	multiValueRemove: (styles, { data }) => {
		return {
			...styles,
			color: "white",
			cursor: "pointer",
			":hover": { backgroundColor: "white", color: "#3a87bb" },
		};
	},
};

const optDocuments = [
	{ value: "DNI", label: "DNI" },
	{ value: "RUC", label: "RUC" },
];

const optEstado = [
	{ value: "Activo", label: "Activo" },
	{ value: "Inactivo", label: "Inactivo" },
];

export { optPermisions, optDocuments, optEstado, colorStyles };
