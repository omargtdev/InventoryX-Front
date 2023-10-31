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
	const [selectedPermission, setSelectedPermission] = useState([]);
	const token = useUserStore((state) => state.token);
	const animatedComponents = makeAnimated(); //animar el select al quitar ubna selección

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = handleSubmit(async (clientData) => {
		// Agrega los permisos seleccionados al objeto clientData
		//const permissions = selectedPermission.map((option) => option.value);
		//clientData.permissions = permissions;
		clientData.documentType = selectedDocument.value;
		clientData.isLegal = true;

		//clientData.newClient = 1;

		// Enviar los datos del nuevo empleado al servidor y obtener una respuesta con el nuevo empleado
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
			title: "Ocurrio un error",
			content: errorMessage,
		});
	});

	return (
		<div className="w-full p-10 mt-10">
			<div>
				<h1 className="text-3xl font-bold mb-10">Nuevo Cliente</h1>
			</div>
			<form onSubmit={onSubmit} className="flex flex-col items-center gap-20 ">
				<div className="flex gap-3 justify-around w-full">
					<div className="flex flex-col flex-1 gap-4">
						<div>
							<div className="relative">
								<input
									type="text"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="name"
									{...register("name", { required: true })}
								/>
								<label id="label-input">Nombre</label>
							</div>
							{errors.name && <p className="text-red-500">Ingrese un Nombre</p>}
						</div>

						<div>
							<div className="w-full flex flex-col gap-3">
								<label className="" htmlFor="documentType">
									Tipo de Documento:
								</label>
								<Select
									className="w-full text-center"
									name="documentType"
									id="documentType"
									onChange={(item) => setSelectedDocument(item)}
									options={optDocuments}
									isSearchable={false}
									required
									placeholder="Seleccione un documento"
								/>
							</div>
						</div>
						<div>
							<div className="relative">
								<input
									type="number"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="documentNumber"
									{...register("documentNumber", {
										required: true,
										minLength: 8,
										maxLength: 11,
									})}
								/>
								<label id="label-input">Nº Documento</label>
							</div>
							{errors.documentNumber && (
								<p className="text-red-500">
									Documento debe tener como minimo 8 y maximo 11 digitos
								</p>
							)}
						</div>
					</div>
					<div className="flex flex-1 flex-col shrink-0 gap-4 ">
						<div>
							<div className="relative">
								<input
									type="email"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="email"
									{...register("email", {
										required: true,
										pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
									})}
								/>
								<label id="label-input">Correo</label>
							</div>
							{errors.email && (
								<p className="text-red-500">Ingrese un correo electronico</p>
							)}
						</div>
						<div>
							<div className="relative">
								<input
									type="text"
									className="input-cal input-base"
									id="input"
									placeholder="Celular"
									name="phone"
									{...register("phone", {
										required: true,
										pattern: {
											value: /^\d{3}-\d{3}-\d{4}$/,
											message: "El formato debe ser 000-000-0000",
										},
										maxLength: 12,
									})}
									onChange={(e) => {
										const input = e.target.value.replace(/\D/g, ""); // Eliminar no números
										if (input.length > 0) {
											// Agregar guiones
											e.target.value = input
												.match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
												.slice(1, 4)
												.filter((group) => group !== "")
												.join("-");
										} else {
											e.target.value = ""; // Si no hay números, el campo queda vacío
										}
									}}
								/>
							</div>
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

						<div>
							<div className="relative">
								<input
									type="text"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="address"
									{...register("address", { required: true })}
								/>
								<label id="label-input">Dirección</label>
							</div>
							{errors.address && (
								<p className="text-red-500">
									Ingrese una dirección de residencia
								</p>
							)}
						</div>
					</div>
				</div>
				<BtnAdd btnName={"Añadir Cliente"} />
			</form>
		</div>
	);
};

export default NuevoCliente;
