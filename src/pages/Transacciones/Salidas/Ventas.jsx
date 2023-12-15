import React, { useState } from "react";
import Clientes from "./GetClient";
import Productos from "./GetProducts";

const Ventas = () => {
	const [selectedClientId, setSelectedClientId] = useState("");

	const handleSelectClient = (clientId) => {
		setSelectedClientId(clientId);
	};

	return (
		<div className="flex flex-col py-10 pr-10 w-full ">
			<h1 className="text-3xl font-bold">Salidas</h1>
			<Clientes onSelectClient={handleSelectClient} />
			<Productos selectedClientId={selectedClientId} />
		</div>
	);
};

export default Ventas;
