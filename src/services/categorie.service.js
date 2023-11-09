import env from "../config/env";
import apiService from "./api.service";
import RequestModel from "./models/RequestModel";

const getCategories = async () => {
	const request = new RequestModel(`${env.TRANSACTIONAL_API_URL}/categories`);
	const { isOk, errorMessage, data } = await apiService.GET(request);
	return {
		isOk,
		categories: data,
		errorMessage,
	};
};

const addCategorie = async (clientData) => {
	const request = new RequestModel(`${env.TRANSACTIONAL_API_URL}/categories`);
	//request.bearerToken = token;
	request.body = clientData;
	const { isOk, errorMessage, data } = await apiService.POST(request);
	return {
		isOk,
		categorie: data, // Si el servidor devuelve el empleado recién creado
		errorMessage,
	};
};

const getCategorieById = async (id) => {
	const url = `${env.TRANSACTIONAL_API_URL}/categories/${id}`;
	const request = new RequestModel(url);
	//request.bearerToken = token;

	try {
		const { isOk, errorMessage, data } = await apiService.GET(request);
		return {
			isOk,
			categorie: data,
			errorMessage,
		};
	} catch (error) {
		console.error("Error al visualizar categoria:", error);
		throw error;
	}
};

const updateCategorieById = async (id, updatedCategorieData) => {
	const url = `${env.TRANSACTIONAL_API_URL}/categories/${id}`;
	const request = new RequestModel(url);
	//request.bearerToken = token;
	request.body = updatedCategorieData;

	try {
		const { isOk, errorMessage, data } = await apiService.PUT(request);
		return {
			isOk,
			categorie: data, // Datos del empleado actualizado
			errorMessage,
		};
	} catch (error) {
		console.error("Error al actualizar categoria:", error);
		throw error;
	}
};

const deleteCategorie = async (id) => {
	const url = `${env.TRANSACTIONAL_API_URL}/categories/${id}`;
	const request = new RequestModel(url);
	//request.bearerToken = token;

	const { isOk, errorMessage } = await apiService.DELETE(request);
	return {
		isOk,
		errorMessage,
	};
};

export default {
	getCategories,
	addCategorie,
	getCategorieById,
	updateCategorieById,
	deleteCategorie,
};
