import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewEmpleado = () => {
	const { id } = useParams();

	const [employeeData, setEmployeeData] = useState({
		name: "",
		lastName: "",
		user: "",
		typeDocument: "",
		document: "",
		email: "",
		phone: "",
		address: "",
		estado: "",
		profileImage: "",
	});

	useEffect(() => {
		// Realiza una solicitud GET al servidor para obtener los datos del empleado por su ID
		// Llena el estado `employeeData` con los datos recibidos del servidor
		// Puedes usar el `id` obtenido de los parámetros de la URL para hacer la solicitud al servidor
	}, [id]);

	return (
		<div className="w-full p-10 mt-10">
			<div>
				<h1 className="text-3xl font-bold mb-10">Detalles del Empleado</h1>
			</div>
			<div className="flex gap-3 justify-around w-full">
				<div className="flex flex-col flex-1 gap-4">
					<div>
						<label className="font-semibold text-lg">Nombre:</label>
						<p>{employeeData.name}</p>
					</div>
					<div>
						<label className="font-semibold text-lg">Apellido:</label>
						<p>{employeeData.lastName}</p>
					</div>
					<div>
						<label className="font-semibold text-lg">Usuario:</label>
						<p>{employeeData.user}</p>
					</div>
					<div>
						<label className="font-semibold text-lg">Documento</label>
						<div>
							<p>{employeeData.typeDocument}</p>
							<p>{employeeData.document}</p>
						</div>
					</div>
					<div>
						<label className="font-semibold text-lg">Email:</label>
						<p>{employeeData.email}</p>
					</div>
				</div>
				<div className="flex flex-1 flex-col shrink-0 gap-4 ">
					<div>
						<label className="font-semibold text-lg">Celular:</label>
						<p>{employeeData.phone}</p>
					</div>
					<div>
						<label className="font-semibold text-lg">Dirección:</label>
						<p>{employeeData.address}</p>
					</div>
					<div>
						<label className="font-semibold text-lg">Estado:</label>
						<p>{employeeData.estado}</p>
					</div>
				</div>
				<div className="flex flex-col items-center flex-1 gap-4 bg-[#0000001c] p-3 rounded-xl">
					<label className="font-semibold text-lg">Perfil:</label>
					<img
						src={employeeData.profileImage}
						alt="Imagen de perfil"
						className="rounded-3xl w-[350px] h-[350px] object-cover"
					/>
				</div>
			</div>
		</div>
	);
};

export default ViewEmpleado;
