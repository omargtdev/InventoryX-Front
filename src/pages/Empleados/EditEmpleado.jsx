import React, { useState, useEffect } from "react";
import BtnAdd from "../../components/BtnAdd";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import employeeService from "../../services/employee.service";
import { useUserStore } from "../../store/useUserStore";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
	optPermisions,
	optDocuments,
	optEstado,
	colorStyles,
} from "./Selects.jsx";

const EditEmpleado = () => {
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
				employee: employeeData,
				resultMessage,
			} = await employeeService.getEmployeeById(token, id);

			if (isOk) {
				// Actualiza el estado con los datos del empleado obtenidos
				setEmployee(employeeData);
				setSelectedPermission(employeeData.permissions);
			} else {
				alert(resultMessage);
			}
		} catch (error) {
			console.error("Error al obtener datos del empleado: ", error);
		}
	};

	const [employee, setEmployee] = useState({
		// Define una estructura para almacenar los datos del empleado
		name: "",
		last_name: "",
		username: "",
		document_type: "",
		document_number: "",
		email: "",
		phone: "",
		address: "",
		is_active: "",
		permissions: [],
	});

	useEffect(() => {
		// Realiza una solicitud para obtener los datos del empleado por su ID
		fetchData(id);
	}, [id]);

	useEffect(() => {
		// Cuando los datos del empleado cambian, asigna esos valores a los campos de entrada
		if (employee) {
			setValue("name", employee.name);
			setValue("last_name", employee.last_name);
			setValue("username", employee.username);
			setValue("document_type", employee.document_type);
			setValue("document_number", employee.document_number);
			setValue("email", employee.email);
			setValue("phone", employee.phone);
			setValue("address", employee.address);
			setValue("is_active", employee.is_active);
			setSelectedPermission(
				employee.permissions.map((permission) => ({
					value: permission,
					label: permission,
					color: "#3a87bb",
				}))
			);
		}
	}, [employee, setValue]);

	const handleUpdateEmployee = async (updatedEmployeeData) => {
		try {
			// Ensure selectedPermission is not null or undefined
			if (!selectedPermission) {
				setSelectedPermission([]);
			}

			// Realiza una solicitud para actualizar al empleado
			updatedEmployeeData.enabled = employee.is_active;
			updatedEmployeeData.permissions = selectedPermission.map(
				(option) => option.value
			);
			const response = await employeeService.updateEmployeeById(
				token,
				id,
				updatedEmployeeData
			);

			if (response.isOk) {
				alert("Empleado actualizado exitosamente");
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
				<h1 className="text-3xl font-bold mb-10">Editar Empleado</h1>
			</div>
			<form
				onSubmit={handleSubmit(handleUpdateEmployee)}
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
								disabled
								{...register("name", { required: true })}
							/>
							{errors.name && (
								<p className="text-red-500">Ingrese sus Nombres</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="last_name"
							>
								Apellido
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg "
								id="last_name"
								type="text"
								placeholder=""
								name="last_name"
								disabled
								{...register("last_name", { required: true })}
							/>
							{errors.last_name && (
								<p className="text-red-500">Ingrese sus Apellidos</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="username"
							>
								Usuario
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg  "
								id="username"
								type="text"
								placeholder=""
								name="username"
								disabled
								{...register("username", { required: true })}
							/>
							{errors.username && (
								<p className="text-red-500">Ingrese un Nombre</p>
							)}
						</div>
						<div className="w-full flex flex-col gap-3">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="document_type"
							>
								Tipo de Documento:
							</label>
							<select
								id="document_type"
								name="document_type"
								className="w-full text-center border  py-1 rounded-lg"
								value={employee.document_type}
								onChange={(e) =>
									setEmployee({ ...employee, document_type: e.target.value })
								}
								disabled
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
								htmlFor="document_number"
							>
								Numero de documento
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg "
								id="document_number"
								type="document_number"
								placeholder=""
								name="document_number"
								{...register("document_number", {
									required: true,
									minLength: 8,
									maxLength: 11,
								})}
								disabled
							/>
							{errors.document_number && (
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
								disabled
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
								disabled
								{...register("phone", {
									required: true,
									minLength: 9,
									maxLength: 9,
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
								disabled
								{...register("address", { required: true })}
							/>
							{errors.address && (
								<p className="text-red-500">Ingrese una Direccion</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="is_active"
							>
								Estado
							</label>
							<select
								id="is_active"
								name="is_active"
								className="w-full text-center border-2  py-1 rounded-lg  border-[#3a87bb]"
								value={employee.is_active ? "Activo" : "Inactivo"}
								onChange={(e) =>
									setEmployee({
										...employee,
										is_active: e.target.value === "Activo",
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
						<div>
							<div className="w-full flex flex-col gap-2">
								<label
									className="font-semibold text-lg font-sans-montserrat"
									htmlFor="permisos"
								>
									Selecciones los permisos del empleado:
								</label>
								<Select
									className="border-2 border-[#3a87bb] rounded-lg"
									styles={colorStyles}
									components={animatedComponents}
									isMulti
									name="permissions"
									id="permissions"
									options={optPermisions}
									value={selectedPermission}
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
				<BtnAdd btnName={"Actualizar Empleado"} />
			</form>
		</div>
	);
};

export default EditEmpleado;
