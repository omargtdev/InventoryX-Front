import React, { useState, useEffect } from "react";
import clientService from "../../../services/client.service";
import { useUserStore } from "../../../store/useUserStore";
import { AiOutlineSearch } from "react-icons/ai";
import ClientModal from "./ClientModal";

const GetClient = ({ onSelectClient }) => {
	const [clients, setClients] = useState([]);
	const [selectedClient, setSelectedClient] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const token = useUserStore((state) => state.token);

	const fetchData = async () => {
		const { isOk, clients, resultMessage } = await clientService.getClients(
			token
		);
		if (!isOk) alert(resultMessage);

		setClients(clients);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleClientChange = (client) => {
		setSelectedClient(client);
		onSelectClient(client); // Llamar a onSelectClient con el nombre del cliente cuando cambie
	};

	const handleSelectChange = () => {
		if (selectedClient) {
			onSelectClient(selectedClient.name);
		}
	};

	return (
		<div className="flex gap-5 items-center w-full">
			<h2 className="flex-0 font-sans-montserrat">Seleccionar Cliente</h2>
			<button
				className="bg-teal-600 rounded-lg"
				onClick={() => setIsModalOpen(true)}
			>
				<AiOutlineSearch className="text-white text-2xl p-1" />
			</button>
			{isModalOpen && (
				<ClientModal
					clients={clients}
					onSelectClient={(clientId) => {
						handleClientChange(clientId);
					}}
					onClose={() => setIsModalOpen(false)}
				/>
			)}
			{selectedClient && (
				<input
					type="text"
					value={selectedClient.name}
					onChange={handleSelectChange}
					className="border border-gray-300 px-2 py-1 rounded outline-[#3a87bb]"
				/>
			)}
		</div>
	);
};

export default GetClient;
