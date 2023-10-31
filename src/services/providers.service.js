import env from "../config/env";
import apiService from "./api.service";
import RequestModel from "./models/RequestModel";

const getProviders = async () => {
	const request = new RequestModel(`${env.TRANSACTIONAL_API_URL}/providers`);
	const { isOk, errorMessage, data } = await apiService.GET(request);
	return {
		isOk,
		providers: data,
		errorMessage,
	};
};

const addProvider = async (providerData) => {
	const request = new RequestModel(`${env.TRANSACTIONAL_API_URL}/providers`);
	//request.bearerToken = token;
	request.body = providerData;
	const { isOk, errorMessage, data } = await apiService.POST(request);
	return {
		isOk,
		provider: data, // Si el servidor devuelve el empleado recién creado
		errorMessage,
	};
};

const getProviderById = async (id) => {
	const url = `${env.TRANSACTIONAL_API_URL}/providers/${id}`;
	const request = new RequestModel(url);
	//request.bearerToken = token;

	try {
		const { isOk, errorMessage, data } = await apiService.GET(request);
		return {
			isOk,
			provider: data,
			errorMessage,
		};
	} catch (error) {
		console.error("Error al visualizar empleado:", error);
		throw error;
	}
};

const updateProviderById = async (id, updatedProviderData) => {
	const url = `${env.TRANSACTIONAL_API_URL}/providers/${id}`;
	const request = new RequestModel(url);
	//request.bearerToken = token;
	request.body = updatedProviderData;

	try {
		const { isOk, errorMessage, data } = await apiService.PUT(request);
		return {
			isOk,
			provider: data, // Datos del empleado actualizado
			errorMessage,
		};
	} catch (error) {
		console.error("Error al actualizar empleado:", error);
		throw error;
	}
};

const deleteProvider = async (id) => {
	const url = `${env.TRANSACTIONAL_API_URL}/providers/${id}`;
	const request = new RequestModel(url);
	//request.bearerToken = token;

	const { isOk, errorMessage } = await apiService.DELETE(request);
	return {
		isOk,
		errorMessage,
	};
};

export default {
	getProviders,
	addProvider,
	getProviderById,
	updateProviderById,
	deleteProvider,
};
