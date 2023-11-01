import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import providerService from "../../services/providers.service";
import { useUserStore } from "../../store/useUserStore";

const Proveedores = () => {
	const [providers, setProviders] = useState([]);
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

	return (
		<div className="flex flex-col py-10 w-full ">
			<h1 className="text-3xl font-bold">Proveedores</h1>
			<DataTable providers={providers} setProviders={setProviders} />
		</div>
	);
};

export default Proveedores;
