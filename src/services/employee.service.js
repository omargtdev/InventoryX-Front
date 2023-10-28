import env from "../config/env";
import apiService from "./api.service";
import RequestModel from "./models/RequestModel";

const getEmployees = async (token) => {
	const request = new RequestModel(`${env.IDENTITY_API_URL}/admin/users`);
	request.bearerToken = token;
	const { isOk, errorMessage, data } = await apiService.GET(request);
	return {
		isOk,
		employees: data,
		errorMessage,
	};
};

const addEmployee = async (token, employeeData) => {
	const request = new RequestModel(`${env.IDENTITY_API_URL}/admin/users`);
	request.bearerToken = token;
	request.body = employeeData;
	console.log(request);
	const { isOk, errorMessage, data } = await apiService.POST(request);
	return {
		isOk,
		employee: data, // Si el servidor devuelve el empleado recién creado
		errorMessage,
	};
};

const getEmployeeById = async (token, id) => {
	const url = `${env.IDENTITY_API_URL}/admin/users/${id}`;
	const request = new RequestModel(url);
	request.bearerToken = token;
	//request.data = id;

	try {
		const { isOk, errorMessage, data } = await apiService.GET(request);
		return {
			isOk,
			employee: data,
			errorMessage,
		};
	} catch (error) {
		console.error("Error al visualizar empleado:", error);
		throw error;
	}
};

const updateEmployeeById = async (token, id, updatedEmployeeData) => {
	const url = `${env.IDENTITY_API_URL}/admin/users/${id}`;
	const request = new RequestModel(url);
	request.bearerToken = token;
	request.body = updatedEmployeeData;

	try {
		const { isOk, errorMessage, data } = await apiService.PUT(request);
		return {
			isOk,
			employee: data, // Datos del empleado actualizado
			errorMessage,
		};
	} catch (error) {
		console.error("Error al actualizar empleado:", error);
		throw error;
	}
};

export default {
	getEmployees,
	addEmployee,
	getEmployeeById,
	updateEmployeeById,
};
