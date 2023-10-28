import React from "react";
import DataTable from "./DataTable";

const Cliente = () => {
	return (
		<div className="flex flex-col py-10 w-full ">
			<h1 className="text-3xl font-bold">Clientes</h1>
			<DataTable />
		</div>
	);
};

export default Cliente;
