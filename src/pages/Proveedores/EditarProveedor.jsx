import React, { useState, useEffect } from "react";
import BtnAdd from "../../components/BtnAdd.jsx";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../store/useUserStore.js";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
	optPermisions,
	optDocuments,
	optEstado,
	colorStyles,
} from "./Selects.jsx";
import clientService from "../../services/client.service.js";
import providersService from "../../services/providers.service.js";
import {
	MODAL_TYPES,
	useGlobalModalContext,
} from "../../components/Modals/GlobalModal.jsx";

const EditarProveedor = () => {
	const { showModal } = useGlobalModalContext();
	const animatedComponents = makeAnimated();
	const { id } = useParams(); // Obtén el ID del empleado desde la URL
	const [selectedPermission, setSelectedPermission] = useState([]);

	const {
		register,
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const token = useUserStore((state) => state.token);

	const fetchData = async (id) => {
		try {
			// Obtén los datos actuales del empleado por su ID
			const {
				isOk,
				provider: providerData,
				resultMessage,
			} = await providersService.getProviderById(id);

			if (isOk) {
				setProvider(providerData);
			} else {
				alert(resultMessage);
			}
		} catch (error) {
			console.error("Error al obtener datos del proveedor: ", error);
		}
	};

	const [provider, setProvider] = useState({
		// Define una estructura para almacenar los datos del empleado
		businessName: "",
		ruc: "",
		contactEmail: "",
		contactPhone: "",
		address: "",
	});

	useEffect(() => {
		// Realiza una solicitud para obtener los datos del empleado por su ID
		fetchData(id);
	}, [id]);

	useEffect(() => {
		// Cuando los datos del empleado cambian, asigna esos valores a los campos de entrada
		if (provider) {
			setValue("businessName", provider.businessName);
			setValue("ruc", provider.ruc);
			setValue("contactEmail", provider.contactEmail);
			setValue("contactPhone", provider.contactPhone);
			setValue("address", provider.address);
		}
	}, [provider, setValue]);

	const handleUpdateProvider = async (updatedProviderData) => {
		try {
			// Ensure selectedPermission is not null or undefined
			//if (!selectedPermission) {
			//	setSelectedPermission([]);
			//}

			// Realiza una solicitud para actualizar al empleado
			//updatedProviderData.enabled = client.isLegal;
			//updatedProviderData.permissions = selectedPermission.map(
			//		(option) => option.value
			//);
			const response = await providersService.updateProviderById(
				id,
				updatedProviderData
			);

			if (response.isOk) {
				showModal(MODAL_TYPES.MESSAGE.SUCCESS_MODAL, {
					title: "Actualización exitosa",
					content: "El Proveedor se actualizó correctamente",
				});
			} else {
				showModal(MODAL_TYPES.MESSAGE.DANGER_MODAL, {
					title: "Ocurrio un error",
					content: response.errorMessage,
				});
			}
		} catch (error) {
			console.error("Error al actualizar el proveedor: ", error);
		}
	};

	return (
		<div className="w-full p-10 mt-10">
			<div>
				<h1 className="text-3xl font-bold mb-10">Editar Proveedor</h1>
			</div>
			<form
				onSubmit={handleSubmit(handleUpdateProvider)}
				className="flex flex-col items-center gap-20 "
			>
				<div className="flex gap-3 justify-around w-full">
					<div className="flex flex-col flex-1 gap-4">
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="name"
							>
								Nombre
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg  "
								id="businessName"
								type="text"
								placeholder=""
								name="businessName"
								{...register("businessName", { required: true })}
							/>
							{errors.businessName && (
								<p className="text-red-500">Ingrese sus Nombres</p>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="ruc"
							>
								Numero de documento
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg "
								id="ruc"
								type="text"
								placeholder=""
								name="ruc"
								{...register("ruc", {
									required: true,
									minLength: 11,
									maxLength: 11,
								})}
							/>
							{errors.ruc && (
								<p className="text-red-500">Ingrese su numero de documento</p>
							)}
						</div>
					</div>
					<div className="flex flex-1 flex-col shrink-0 gap-4 ">
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="contactEmail"
							>
								Email
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg  "
								id="contactEmail"
								type="contactEmail"
								placeholder=""
								name="contactEmail"
								{...register("contactEmail", {
									required: true,
									pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
								})}
							/>
							{errors.contactEmail && (
								<p className="text-red-500">Ingrese un email</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="contactPhone"
							>
								phone
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg "
								id="contactPhone"
								type="text"
								placeholder=""
								name="contactPhone"
								{...register("contactPhone", {
									required: true,
									minLength: 9,
									maxLength: 12,
								})}
							/>

							{errors.contactPhone?.type === "required" && (
								<p className="text-red-500">Ingrese un número de celular</p>
							)}
							{errors.contactPhone?.type === "minLength" && (
								<p className="text-red-500">El número debe tener 9 dígitos</p>
							)}
							{errors.contactPhone?.type === "maxLength" && (
								<p className="text-red-500">El número debe tener 9 dígitos</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="address"
							>
								Dirección
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg  "
								id="address"
								type="text"
								placeholder=""
								name="address"
								{...register("address", { required: true })}
							/>
							{errors.address && (
								<p className="text-red-500">Ingrese una Direccion</p>
							)}
						</div>
					</div>
				</div>
				<BtnAdd btnName={"Actualizar Proveedor"} />
			</form>
		</div>
	);
};

export default EditarProveedor;
