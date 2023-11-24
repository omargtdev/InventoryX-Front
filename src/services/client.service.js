import env from "../config/env";
import apiService from "./api.service";
import RequestModel from "./models/RequestModel";

const getClients = async () => {
	const request = new RequestModel(`${env.TRANSACTIONAL_API_URL}/clients`);
	const { isOk, errorMessage, data } = await apiService.GET(request);
	return {
		isOk,
		clients: data,
		errorMessage,
	};
};

const addClient = async (clientData) => {
	const request = new RequestModel(`${env.TRANSACTIONAL_API_URL}/clients`);
	//request.bearerToken = token;
	request.body = clientData;
	const { isOk, errorMessage, data } = await apiService.POST(request);
	return {
		isOk,
		client: data, // Si el servidor devuelve el empleado recién creado
		errorMessage,
	};
};

const getClientById = async (id) => {
	const url = `${env.TRANSACTIONAL_API_URL}/clients/${id}`;
	const request = new RequestModel(url);
	//request.bearerToken = token;

	try {
		const { isOk, errorMessage, data } = await apiService.GET(request);
		return {
			isOk,
			client: data,
			errorMessage,
		};
	} catch (error) {
		console.error("Error al visualizar empleado:", error);
		throw error;
	}
};

const updateClientById = async (id, updatedClientData) => {
	const url = `${env.TRANSACTIONAL_API_URL}/clients/${id}`;
	const request = new RequestModel(url);
	//request.bearerToken = token;
	request.body = updatedClientData;

	try {
		const { isOk, errorMessage, data } = await apiService.PUT(request);
		return {
			isOk,
			client: data, // Datos del empleado actualizado
			errorMessage,
		};
	} catch (error) {
		console.error("Error al actualizar empleado:", error);
		throw error;
	}
};

const deleteClient = async (id) => {
	const url = `${env.TRANSACTIONAL_API_URL}/clients/${id}`;
	const request = new RequestModel(url);
	//request.bearerToken = token;

	const { isOk, errorMessage } = await apiService.DELETE(request);
	return {
		isOk,
		errorMessage,
	};
};

export default {
	getClients,
	addClient,
	getClientById,
	updateClientById,
	deleteClient,
};
