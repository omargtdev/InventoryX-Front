import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import clientService from "../../services/client.service";
import { useUserStore } from "../../store/useUserStore";

const Cliente = () => {
	const [clients, setClients] = useState([]);
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

	return (
		<div className="flex flex-col py-10 w-full ">
			<h1 className="text-3xl font-bold">Clientes</h1>
			<DataTable clients={clients} setClients={setClients} />
		</div>
	);
};


export default Cliente;
