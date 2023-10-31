import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import employeeService from "../../services/employee.service";
import { useUserStore } from "../../store/useUserStore";

const Empleado = () => {
	const [employees, setEmployees] = useState([]);
	const token = useUserStore(state => state.token);

	const fetchData = async () => {
		const { isOk, employees, resultMessage } = await employeeService.getEmployees(token);
		if(!isOk)
			alert(resultMessage);

		setEmployees(employees);
	}

	useEffect(() => {
		fetchData();
	}, [])

	return (
		<div className="flex flex-col py-10 w-full ">
			<h1 className="text-3xl font-bold">Empleados</h1>
			<DataTable employees={employees} setEmployees={setEmployees} />
		</div>
	);
};

export default Empleado;
