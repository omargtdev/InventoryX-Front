import React, { useState, useEffect } from "react";
import providerService from "../../../services/providers.service";
import { useUserStore } from "../../../store/useUserStore";

const GetProveedor = () => {
	const [providers, setProviders] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
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
			>
				{filteredProviders.map((provider) => (
					<option key={provider.id} value={provider.id}>
						{provider.businessName}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Buscar por nombre"
				className="px-2 py-2 flex-1 text-gray-600 border border-gray-300 rounded outline-[#3a87bb]"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
		</div>
	);
};

export default GetProveedor;
