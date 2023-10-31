import React, { useState, useEffect } from "react";
import BtnAdd from "../../components/BtnAdd";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../store/useUserStore";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
	optPermisions,
	optDocuments,
	optEstado,
	colorStyles,
} from "./Selects.jsx";
import clientService from "../../services/client.service";

const EditCliente = () => {
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
				client: clientData,
				resultMessage,
			} = await clientService.getClientById(id);

			if (isOk) {
				// Actualiza el estado con los datos del empleado obtenidos
				setClient(clientData);
				//setSelectedPermission(clientData.permissions);
			} else {
				alert(resultMessage);
			}
		} catch (error) {
			console.error("Error al obtener datos del empleado: ", error);
		}
	};

	const [client, setClient] = useState({
		// Define una estructura para almacenar los datos del empleado
		name: "",
		documentType: "",
		documentNumber: "",
		email: "",
		phone: "",
		address: "",
		isLegal: "",
	});

	useEffect(() => {
		// Realiza una solicitud para obtener los datos del empleado por su ID
		fetchData(id);
	}, [id]);

	useEffect(() => {
		// Cuando los datos del empleado cambian, asigna esos valores a los campos de entrada
		if (client) {
			setValue("name", client.name);
			setValue("documentType", client.documentType);
			setValue("documentNumber", client.documentNumber);
			setValue("email", client.email);
			setValue("phone", client.phone);
			setValue("address", client.address);
			setValue("isLegal", client.isLegal);
		}
	}, [client, setValue]);

	const handleUpdateClient = async (updatedClientData) => {
		try {
			// Ensure selectedPermission is not null or undefined
			//if (!selectedPermission) {
			//	setSelectedPermission([]);
			//}

			// Realiza una solicitud para actualizar al empleado
			updatedClientData.enabled = client.isLegal;
			//updatedClientData.permissions = selectedPermission.map(
		//		(option) => option.value
			//);
			const response = await clientService.updateClientById(
				id,
				updatedClientData
			);

			if (response.isOk) {
				alert("Cliente actualizado exitosamente");
			} else {
				alert(response.errorMessage);
			}
		} catch (error) {
			console.error("Error al actualizar el empleado: ", error);
		}
	};

	return (
		<div className="w-full p-10 mt-10">
			<div>
				<h1 className="text-3xl font-bold mb-10">Editar Cliente</h1>
			</div>
			<form
				onSubmit={handleSubmit(handleUpdateClient)}
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
								id="name"
								type="text"
								placeholder=""
								name="name"
								{...register("name", { required: true })}
							/>
							{errors.name && (
								<p className="text-red-500">Ingrese sus Nombres</p>
							)}
						</div>

						<div className="w-full flex flex-col gap-3">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="documentType"
							>
								Tipo de Documento:
							</label>
							<select
								id="documentType"
								name="documentType"
								className="w-full text-center border  py-1 rounded-lg"
								value={client.documentType}
								onChange={(e) =>
									setClient({ ...client, documentType: e.target.value })
								}
								required
							>
								<option value="" disabled hidden>
									Seleccione un documento
								</option>
								{optDocuments.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="documentNumber"
							>
								Numero de documento
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg "
								id="documentNumber"
								type="text"
								placeholder=""
								name="documentNumber"
								{...register("documentNumber", {
									required: true,
									minLength: 8,
									maxLength: 11,
								})}
							/>
							{errors.documentNumber && (
								<p className="text-red-500">Ingrese su numero de documento</p>
							)}
						</div>
					</div>
					<div className="flex flex-1 flex-col shrink-0 gap-4 ">
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="email"
							>
								Email
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg  "
								id="email"
								type="email"
								placeholder=""
								name="email"
								{...register("email", {
									required: true,
									pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
								})}
							/>
							{errors.email && <p className="text-red-500">Ingrese un email</p>}
						</div>
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="phone"
							>
								phone
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg "
								id="phone"
								type="text"
								placeholder=""
								name="phone"
								{...register("phone", {
									required: true,
									minLength: 9,
									maxLength: 12,
								})}
							/>

							{errors.phone?.type === "required" && (
								<p className="text-red-500">Ingrese un número de celular</p>
							)}
							{errors.phone?.type === "minLength" && (
								<p className="text-red-500">El número debe tener 9 dígitos</p>
							)}
							{errors.phone?.type === "maxLength" && (
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
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="isLegal"
							>
								Estado
							</label>
							<select
								id="isLegal"
								name="isLegal"
								className="w-full text-center border-2  py-1 rounded-lg  border-[#3a87bb]"
								value={client.isLegal ? "Activo" : "Inactivo"}
								onChange={(e) =>
									setClient({
										...client,
										isLegal: e.target.value === "Activo",
									})
								}
							>
								{optEstado.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				<BtnAdd btnName={"Actualizar Cliente"} />
			</form>
		</div>
	);
};

export default EditCliente;
