import React, { useState, useEffect } from "react";
import clientService from "../../../services/client.service";
import { useUserStore } from "../../../store/useUserStore";

const ClientModal = ({ onSelectClient, onClose }) => {
	const [clients, setClients] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedClientId, setSelectedClientId] = useState("");

	const token = useUserStore((state) => state.token);

	const fetchData = async () => {
		const { isOk, clients, resultMessage } = await clientService.getClients(
			token
		);
		if (!isOk) alert(resultMessage);

		setSelectedClientId("");
		setClients(clients);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSelectChange = (e) => {
		const clientId = e.target.value;
		setSelectedClientId(clientId);
	};

	const handleAddClient = () => {
		if (selectedClientId) {
			const selectedClient = clients.find(
				(client) => client.id === selectedClientId
			);
			if (selectedClient) {
				onSelectClient(selectedClient); // Enviar el objeto completo del cliente
				onClose();
			} else {
				console.error("Cliente no encontrado");
			}
		} else {
			console.error("ID del cliente no encontrado");
		}
	};

	const filteredClients = clients.filter((client) =>
		client.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="modal-overlay">
			<div className="modal flex flex-col gap-5">
				<h2 className="flex-0 font-bold font-sans-montserrat">
					Seleccionar Cliente
				</h2>
				<div className="flex gap-4">
					<select
						name="cliente"
						id="cliente"
						className="px-2 py-2 text-gray-600 flex-1 border border-gray-300 rounded outline-[#3a87bb]"
						onChange={handleSelectChange}
						value={selectedClientId}
					>
						<option value="">Seleccionar Cliente</option>
						{filteredClients.map((client) => (
							<option key={client.id} value={client.id}>
								{client.name}
							</option>
						))}
					</select>
				</div>
				<div className="flex justify-center">
					<button
						className="bg-green-600 text-white font-sans-montserrat px-6 py-1 m-auto rounded-xl"
						onClick={handleAddClient}
					>
						Seleccionar
					</button>
				</div>
			</div>
		</div>
	);
};
export default ClientModal;
