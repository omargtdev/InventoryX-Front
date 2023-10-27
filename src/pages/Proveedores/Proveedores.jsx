import React from "react";
import DataTable from "./DataTable";

const Proveedores = () => {
	return (
		<div className="flex flex-col py-10 w-full ">
			<h1 className="text-3xl font-bold">Proveedores</h1>
			<DataTable />
		</div>
	);
};

export default Proveedores;
