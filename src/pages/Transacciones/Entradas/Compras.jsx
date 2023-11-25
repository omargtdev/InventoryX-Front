import React, { useState } from "react";
import Proveedores from "./GetProveedor";
import Productos from "./GetProducts";

const Compras = () => {
	const [selectedProviderId, setSelectedProviderId] = useState("");
	const [selectedDate, setSelectedDate] = useState("");

	const handleSelectProvider = (providerId) => {
		setSelectedProviderId(providerId);
	};

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	return (
		<div className="flex flex-col py-10 pr-10 w-full ">
			<h1 className="text-3xl font-bold">Entradas</h1>
			<Proveedores
				onSelectProvider={handleSelectProvider}
				onDateChange={handleDateChange}
			/>
			<Productos
				selectedProviderId={selectedProviderId}
				selectedDate={selectedDate}
			/>
		</div>
	);
};

export default Compras;
