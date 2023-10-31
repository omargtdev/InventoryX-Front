import React, { useState } from "react";
import BtnAdd from "../../components/BtnAdd";
import { useForm } from "react-hook-form";
import makeAnimated from "react-select/animated";
import { useUserStore } from "../../store/useUserStore";
import { optPermisions, optDocuments, colorStyles } from "./Selects.jsx";

import {
	MODAL_TYPES,
	useGlobalModalContext,
} from "../../components/Modals/GlobalModal";
import providersService from "../../services/providers.service";

const NuevoProveedor = () => {
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

	const onSubmit = handleSubmit(async (providerData) => {
		// Agrega los permisos seleccionados al objeto providerData
		//const permissions = selectedPermission.map((option) => option.value);
		//providerData.permissions = permissions;

		//providerData.newClient = 1;

		// Enviar los datos del nuevo empleado al servidor y obtener una respuesta con el nuevo empleado
		const { errorMessage, provider, isOk } = await providersService.addProvider(
			providerData
		);
		if (isOk) {
			showModal(MODAL_TYPES.MESSAGE.SUCCESS_MODAL, {
				title: "Creación exitosa",
				content:
					"El Proveedor se agregó correctamente " + provider.businessName,
			});
			// Redirige a la página deseada
			window.location.href = "/proveedores"; // Reemplaza "/ruta-de-destino" con la URL de la página a la que deseas redirigir.

		}

		showModal(MODAL_TYPES.MESSAGE.DANGER_MODAL, {
			title: "Ocurrio un error",
			content: errorMessage,
		});
	});

	return (
		<div className="w-full p-10 mt-10">
			<div>
				<h1 className="text-3xl font-bold mb-10">Nuevo Proveedor</h1>
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
									name="businessName"
									{...register("businessName", { required: true })}
								/>
								<label id="label-input">Nombre Empresa</label>
							</div>
							{errors.businessName && (
								<p className="text-red-500">Ingrese un Nombre</p>
							)}
						</div>

						<div>
							<div className="w-full flex flex-col gap-3">
								<div className="relative">
									<input
										type="text"
										className="input-cal input-base"
										id="input"
										placeholder=""
										name="ruc"
										{...register("ruc", { required: true })}
									/>
									<label id="label-input">Nro RUC</label>
								</div>
							</div>
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
									name="contactEmail"
									{...register("contactEmail", {
										required: true,
										pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
									})}
								/>
								<label id="label-input">Correo</label>
							</div>
							{errors.contactEmail && (
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
									name="contactPhone"
									{...register("contactPhone", {
										required: true,
										pattern: {
											value: /^\d{9}$/,
										},
										maxLength: 12,
									})}
								/>
							</div>
							{errors.contactPhone?.type === "required" && (
								<p className="text-red-500">Ingrese un número de celular</p>
							)}
							{errors.contactPhone?.type === "pattern" && (
								<p className="text-red-500">{errors.contactPhone.message}</p>
							)}
							{errors.contactPhone?.type === "maxLength" && (
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
				<BtnAdd btnName={"Añadir Proveedor"} />
			</form>
		</div>
	);
};

export default NuevoProveedor;
