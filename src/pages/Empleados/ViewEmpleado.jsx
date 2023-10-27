import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import employeeService from "../../services/employee.service";
import { useUserStore } from "../../store/useUserStore";

const ViewEmpleado = () => {
	const { id } = useParams(); // Get the user ID from the URL

	const [employee, setEmployee] = useState([]);
	const token = useUserStore((state) => state.token);

	const fetchData = async () => {
		try {
			const {
				isOk,
				employee: employeeData,
				resultMessage,
			} = await employeeService.getEmployeeById(token, id);
			if (!isOk) {
				alert(resultMessage);
			}
			setEmployee(employeeData);
			//console.log("Employee Data:", employeeData); // Mueve el console.log aquí
		} catch (error) {
			console.error("Error fetching employee data: ", error);
		}
	};

	//console.log(employee); // Mueve el console.log aquí

	useEffect(() => {
		fetchData();
	}, [id]);

	return (
		<div className="w-full p-10 mt-10">
			<div>
				<h1 className="text-3xl font-bold mb-10 font-sans-montserrat">
					Detalles del Empleado
				</h1>
			</div>
			<div className="flex gap-3 justify-around w-full">
				<div className="flex flex-col flex-1 gap-4 bg-[#cfcfcf4f] p-5 rounded-3xl">
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Nombre:
						</label>
						<p className="text-center font-sans-montserrat">{employee.name}</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Apellido:
						</label>
						<p className="text-center font-sans-montserrat">
							{employee.last_name}
						</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Usuario:
						</label>
						<p className="text-center font-sans-montserrat">
							{employee.username}
						</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Documento
						</label>
						<div className="flex items-center justify-center gap-3 ">
							<p className="text-center font-sans-montserrat">
								{employee.document_type}:
							</p>
							<p className="text-center font-sans-montserrat">
								{employee.document_number}
							</p>
						</div>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Email:
						</label>
						<p className="text-center font-sans-montserrat">{employee.email}</p>
					</div>
				</div>
				<div className="flex flex-1 flex-col shrink-0 gap-4 bg-[#cfcfcf4f] p-5 rounded-3xl">
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Celular:
						</label>
						<p className="text-center font-sans-montserrat">{employee.phone}</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Dirección:
						</label>
						<p className="text-center font-sans-montserrat">
							{employee.address}
						</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Estado:
						</label>
						<p className="text-center font-sans-montserrat">
							{employee.is_active ? "Activo" : "Inactivo"}
						</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Permisos:
						</label>
						{employee.permissions ? (
							employee.permissions.map((permission, index) => (
								<p className="text-center font-sans-montserrat" key={index}>
									{permission}
								</p>
							))
						) : (
							<p className="text-center font-sans-montserrat">
								No se encontraron permisos
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewEmpleado;
