import React from "react";
import DataTable from "./DataTable";
import Proveedores from "./GetProveedor";
import Productos from "./GetProducts";

const Compras = () => {
	return (
		<div className="flex flex-col py-10 pr-10 w-full ">
			<h1 className="text-3xl font-bold">Entradas</h1>
			<Proveedores />
			<Productos />
			<DataTable />
		</div>
	);
};

export default Compras;
