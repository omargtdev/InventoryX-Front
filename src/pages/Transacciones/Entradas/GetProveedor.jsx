import React, { useState, useEffect } from "react";
import providerService from "../../../services/providers.service";
import { useUserStore } from "../../../store/useUserStore";

const GetProveedor = ({ onSelectProvider, onDateChange }) => {
	const [providers, setProviders] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedProviderId, setSelectedProviderId] = useState("");
	const [selectedDate, setSelectedDate] = useState("");

	const token = useUserStore((state) => state.token);

	const fetchData = async () => {
		const { isOk, providers, resultMessage } =
			await providerService.getProviders(token);
		if (!isOk) alert(resultMessage);

		setProviders(providers);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleProviderChange = (e) => {
		const selectedId = e.target.value;
		setSelectedProviderId(selectedId);
		onSelectProvider(selectedId); // Llama a la función onSelectProvider en el componente padre (Compras)
	};

	const handleDateChange = (e) => {
		const dateValue = e.target.value;
		setSelectedDate(dateValue);
		onDateChange(dateValue); // Pasa la fecha al componente padre o a la función necesaria
	};

	const filteredProviders = providers.filter((provider) =>
		provider.businessName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="flex gap-5 items-center w-full">
			<h2 className="flex-0 font-sans-montserrat">Seleccionar Proveedor</h2>
			<select
				name="proveedor"
				id="proveedor"
				className="px-2 py-2 text-gray-600 flex-1 border border-gray-300 rounded outline-[#3a87bb]"
				onChange={handleProviderChange}
				value={selectedProviderId}
			>
				<option value="">Seleccionar Proveedor</option>
				{filteredProviders.map((provider) => (
					<option key={provider.id} value={provider.id}>
						{provider.businessName}
					</option>
				))}
			</select>
			<div>
				<input
					type="date"
					required
					value={selectedDate}
					onChange={handleDateChange}
				/>
			</div>
		</div>
	);
};

export default GetProveedor;
