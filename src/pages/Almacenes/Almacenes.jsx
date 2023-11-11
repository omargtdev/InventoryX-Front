import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import warehouseService from "../../services/warehouses.service"
import { useUserStore } from "../../store/useUserStore";

const Almacenes = () => {
	const [warehouses, setWarehouses] = useState([]);
	const token = useUserStore((state) => state.token);

	const fetchData = async () => {
		const { isOk, warehouses, resultMessage } = await warehouseService.getWarehouses(
			token
		);
		if (!isOk) alert(resultMessage);

		setWarehouses(warehouses);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="flex flex-col py-10 w-full ">
			<h1 className="text-3xl font-bold">Almacenes</h1>
			<DataTable warehouses={warehouses} setWarehouses={setWarehouses} />
		</div>
	);
};

export default Almacenes;
