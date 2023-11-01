import React, { useEffect, useState } from "react";
import clientService from "../../services/client.service";
import { useUserStore } from "../../store/useUserStore";
import { useParams } from "react-router-dom";

const ViewCliente = () => {
	const { id } = useParams(); // Get the user ID from the URL

	const [client, setClient] = useState([]);
	const token = useUserStore((state) => state.token);

	const fetchData = async () => {
		try {
			const {
				isOk,
				client: clientData,
				resultMessage,
			} = await clientService.getClientById(id);
			if (!isOk) {
				alert(resultMessage);
			}
			setClient(clientData);
			//console.log("Client Data:", clientData); // Mueve el console.log aquí
		} catch (error) {
			console.error("Error fetching employee data: ", error);
		}
	};

	//console.log(client); // Mueve el console.log aquí

	useEffect(() => {
		fetchData();
	}, [id]);

	return (
		<div className="w-full p-10 mt-10">
			<div>
				<h1 className="text-3xl font-bold mb-10 font-sans-montserrat">
					Detalles del Cliente
				</h1>
			</div>
			<div className="flex gap-3 justify-around w-full">
				<div className="flex flex-col flex-1 gap-4 bg-[#cfcfcf4f] p-5 rounded-3xl">
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Nombre:
						</label>
						<p className="text-center font-sans-montserrat">{client.name}</p>
					</div>

					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Documento
						</label>
						<div className="flex items-center justify-center gap-3 ">
							<p className="text-center font-sans-montserrat">
								{client.documentTypeName}:
							</p>
							<p className="text-center font-sans-montserrat">
								{client.documentNumber}
							</p>
						</div>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Email:
						</label>
						<p className="text-center font-sans-montserrat">{client.email}</p>
					</div>
				</div>
				<div className="flex flex-1 flex-col shrink-0 gap-4 bg-[#cfcfcf4f] p-5 rounded-3xl">
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Celular:
						</label>
						<p className="text-center font-sans-montserrat">{client.phone}</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Dirección:
						</label>
						<p className="text-center font-sans-montserrat">{client.address}</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Estado:
						</label>
						<p className="text-center font-sans-montserrat">
							{client.isLegal ? "Activo" : "Inactivo"}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewCliente;
