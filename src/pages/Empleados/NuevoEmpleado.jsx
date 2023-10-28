import React, { useState } from "react";
import BtnAdd from "../../components/BtnAdd";
import { useForm } from "react-hook-form";
import employeeService from "../../services/employee.service";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useUserStore } from "../../store/useUserStore";

import { optPermisions, optDocuments, colorStyles } from "./Selects.jsx";

const NuevoEmpleado = () => {
	const [selectedDocument, setSelectedDocument] = useState([]);
	const [selectedPermission, setSelectedPermission] = useState([]);
	const token = useUserStore((state) => state.token);
	const animatedComponents = makeAnimated(); //animar el select al quitar ubna selección

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = handleSubmit(async (employeeData) => {
		// Agrega los permisos seleccionados al objeto employeeData

		const permissions = selectedPermission.map((option) => option.value);
		employeeData.permissions = permissions;
		employeeData.document_type = selectedDocument.value;
		console.log(employeeData);

		try {
			// Enviar los datos del nuevo empleado al servidor y obtener una respuesta con el nuevo empleado
			const response = await employeeService.addEmployee(token, employeeData);
			console.log(response);
			if (response.isOk) {
				alert("Empleado agregado exitosamente");
			} else {
				alert(response.errorMessage);
			}
		} catch (error) {
			console.error(error);
		}
	});

	return (
		<div className="w-full p-10 mt-10">
			<div>
				<h1 className="text-3xl font-bold mb-10">Nuevo Empleado</h1>
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
							<div className="relative">
								<input
									type="text"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="last_name"
									{...register("last_name", { required: true })}
								/>

								<label id="label-input">Apellido</label>
							</div>
							{errors.last_name && (
								<p className="text-red-500">Ingrese un Apellido</p>
							)}
						</div>

						<div>
							<div className="w-full flex flex-col gap-3">
								<label className="" htmlFor="document_type">
									Tipo de Documento:
								</label>
								<Select
									className="w-full text-center"
									name="document_type"
									id="document_type"
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
									name="document_number"
									{...register("document_number", {
										required: true,
										minLength: 8,
										maxLength: 11,
									})}
								/>
								<label id="label-input">Nº Documento</label>
							</div>
							{errors.document_number && (
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
									type="text"
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
									placeholder=""
									name="phone"
									{...register("phone", {
										required: true,
										minLength: 9,
										maxLength: 9,
									})}
								/>
								<label id="label-input">Celular</label>
							</div>
							{errors.phone?.type === "required" && (
								<p className="text-red-500">Ingrese un numero de celular</p>
							)}
							{errors.phone?.type === "minLength" && (
								<p className="text-red-500">El número debe tener 9 digitos</p>
							)}
							{errors.phone?.type === "maxLength" && (
								<p className="text-red-500">El número debe tener 9 digitos</p>
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
						<div>
							<div className="w-full flex flex-col gap-2">
								<label htmlFor="permisos">
									Selecciones los permisos del empleado:
								</label>

								<Select
									styles={colorStyles}
									components={animatedComponents}
									isMulti
									name="permissions"
									required
									id="permissions"
									options={optPermisions}
									onChange={(item) => setSelectedPermission(item)}
									isClearable={false} // evita que se pueda borrar la seleccion en grupo
									isSearchable={false} //evita buscar escribiendo
									closeMenuOnSelect={false} //evita que se cierre el menu al seleccione solo una opcion
									placeholder="Selecciona permisos"
								/>
							</div>
						</div>
					</div>
				</div>
				<BtnAdd btnName={"Añadir Empleado"} />
			</form>
		</div>
	);
};

export default NuevoEmpleado;
