import React, { useState } from "react";
import BtnAdd from "../../components/BtnAdd";
import { useForm } from "react-hook-form";
import clientService from "../../services/client.service";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useUserStore } from "../../store/useUserStore";
import { optPermisions, optDocuments, colorStyles } from "./Selects.jsx";
import {
	MODAL_TYPES,
	useGlobalModalContext,
} from "../../components/Modals/GlobalModal";

const NuevoCliente = () => {
	const { showModal } = useGlobalModalContext();

	const [selectedDocument, setSelectedDocument] = useState([]);
	const token = useUserStore((state) => state.token);
	const animatedComponents = makeAnimated();
	const [isLegal, setIsLegal] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = handleSubmit(async (clientData) => {
		clientData.documentType = selectedDocument.value;

		const { errorMessage, client, isOk } = await clientService.addClient(
			clientData
		);

		if (isOk) {
			showModal(MODAL_TYPES.MESSAGE.SUCCESS_MODAL, {
				title: "Creación exitosa",
				content: "El Cliente se agregó correctamente",
			});
			return;
		}

		showModal(MODAL_TYPES.MESSAGE.DANGER_MODAL, {
			title: "Ocurrió un error",
			content: errorMessage,
		});
	});

	return (
		<div className="container mx-auto p-6 bg-gray-100">
			<div className="bg-white p-8 rounded-md shadow-md">
				<h1 className="text-3xl font-bold mb-6">Nuevo Cliente</h1>
				<form
					onSubmit={onSubmit}
					className="grid grid-cols-1 md:grid-cols-2 gap-6"
				>
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Nombre Completo
						</label>
						<input
							type="text"
							{...register("name", { required: true })}
							className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
						/>
						{errors.name && <p className="text-red-500">Ingrese un Nombre</p>}
					</div>
					<div className="mb-4">
						<label className="flex items-center cursor-pointer">
							<input
								type="checkbox"
								onChange={(e) => {
									setIsLegal(e.target.checked);
								}}
								name="isLegal"
								{...register("isLegal")}
								className="mr-2"
							/>
							<span className="text-sm font-medium text-gray-700">
								Es Persona Jurídica
							</span>
						</label>
					</div>
					<div className="mb-4">
						<label
							htmlFor="documentType"
							className="block text-sm font-medium text-gray-700"
						>
							Tipo de Documento
						</label>
						<Select
							className="w-full"
							name="documentType"
							id="documentType"
							onChange={(item) => setSelectedDocument(item)}
							options={optDocuments}
							isSearchable={false}
							required
							placeholder="Seleccione Tipo de documento"
							styles={colorStyles}
							components={animatedComponents}
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="documentNumber"
							className="block text-sm font-medium text-gray-700"
						>
							Nº Documento
						</label>
						<input
							type="number"
							{...register("documentNumber", {
								required: true,
								minLength: 8,
								maxLength: 11,
							})}
							className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
						/>
						{errors.documentNumber && (
							<p className="text-red-500">
								Documento debe tener como mínimo 8 y máximo 11 dígitos
							</p>
						)}
					</div>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Correo Electrónico
						</label>
						<input
							type="email"
							{...register("email", {
								required: true,
								pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
							})}
							className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
						/>
						{errors.email && (
							<p className="text-red-500">Ingrese un correo electrónico</p>
						)}
					</div>
					<div className="mb-4">
						<label
							htmlFor="phone"
							className="block text-sm font-medium text-gray-700"
						>
							Número de Celular
						</label>
						<input
							type="text"
							{...register("phone", {
								required: true,
								pattern: {
									value: /^\d{3}-\d{3}-\d{4}$/,
									message: "El formato debe ser 000-000-0000",
								},
								maxLength: 12,
							})}
							onChange={(e) => {
								const input = e.target.value.replace(/\D/g, "");
								if (input.length > 0) {
									e.target.value = input
										.match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
										.slice(1, 4)
										.filter((group) => group !== "")
										.join("-");
								} else {
									e.target.value = "";
								}
							}}
							className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
						/>
						{errors.phone?.type === "required" && (
							<p className="text-red-500">Ingrese un número de celular</p>
						)}
						{errors.phone?.type === "pattern" && (
							<p className="text-red-500">{errors.phone.message}</p>
						)}
						{errors.phone?.type === "maxLength" && (
							<p className="text-red-500">
								El número no debe tener más de 12 dígitos
							</p>
						)}
					</div>
					<div className="mb-4">
						<label
							htmlFor="address"
							className="block text-sm font-medium text-gray-700"
						>
							Dirección de Residencia
						</label>
						<input
							type="text"
							{...register("address", { required: true })}
							className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
						/>
						{errors.address && (
							<p className="text-red-500">
								Ingrese una dirección de residencia
							</p>
						)}
					</div>
					<div className="col-span-2">
						<BtnAdd btnName={"Añadir Cliente"} />
					</div>
				</form>
			</div>
		</div>
	);
};

export default NuevoCliente;
