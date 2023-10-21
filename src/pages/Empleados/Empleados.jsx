import React from "react";
import DataTable from "./DataTable";

const Empleado = () => {
	return (
		<div className="flex flex-col  py-10 w-full ">
			<h1 className="text-3xl font-bold">Empleados</h1>
			<DataTable />
		</div>
	);
};

export default Empleado;
