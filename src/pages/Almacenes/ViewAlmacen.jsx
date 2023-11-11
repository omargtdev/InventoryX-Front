import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { useParams } from "react-router-dom";
import warehousesService from "../../services/warehouses.service";

const ViewAlmacen = () => {
	const { id } = useParams(); // Get the user ID from the URL

	const [warehouse, setWarehouse] = useState([]);
	const token = useUserStore((state) => state.token);

	const fetchData = async () => {
		try {
			const {
				isOk,
				warehouse: warehouseData,
				resultMessage,
			} = await warehousesService.getWarehouseById(id);
			if (!isOk) {
				alert(resultMessage);
			}
			setWarehouse(warehouseData);
			//console.log("warehouse Data:", warehouseData); // Mueve el console.log aquí
		} catch (error) {
			console.error("Error fetching employee data: ", error);
		}
	};

	//console.log(warehouse); // Mueve el console.log aquí

	useEffect(() => {
		fetchData();
	}, [id]);

	return (
		<div className="w-full p-10 mt-10">
			<div>
				<h1 className="text-3xl font-bold mb-10 font-sans-montserrat">
					Detalles del Almacen
				</h1>
			</div>
			<div className="flex gap-3 justify-around w-full">
				<div className="flex flex-col flex-1 gap-4 bg-[#cfcfcf4f] p-5 rounded-3xl">
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Nombre:
						</label>
						<p className="text-center font-sans-montserrat">{warehouse.name}</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Descripcion:
						</label>
						<p className="text-center font-sans-montserrat">
							{warehouse.description}
						</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Stock:
						</label>
						<p className="text-center font-sans-montserrat">
							{warehouse.maxStock}
						</p>
					</div>
				</div>
				<div className="flex flex-1 flex-col shrink-0 gap-4 bg-[#cfcfcf4f] p-5 rounded-3xl">
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Dirección:
						</label>
						<p className="text-center font-sans-montserrat">
							{warehouse.address}
						</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Provincia:
						</label>
						<p className="text-center font-sans-montserrat">
							{warehouse.province}
						</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Ciudad:
						</label>
						<p className="text-center font-sans-montserrat">{warehouse.city}</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Distrito:
						</label>
						<p className="text-center font-sans-montserrat">
							{warehouse.district}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewAlmacen;
