import env from "../config/env";
import apiService from "./api.service";
import RequestModel from "./models/RequestModel";

const getProducts = async () => {
	const request = new RequestModel(`${env.TRANSACTIONAL_API_URL}/products`);
	const { isOk, errorMessage, data } = await apiService.GET(request);
	return {
		isOk,
		products: data,
		errorMessage,
	};
};

const addProduct = async (clientData) => {
	const request = new RequestModel(`${env.TRANSACTIONAL_API_URL}/products`);
	//request.bearerToken = token;
	request.body = clientData;
	const { isOk, errorMessage, data } = await apiService.POST(request);
	return {
		isOk,
		product: data, // Si el servidor devuelve el producto recién creado
		errorMessage,
	};
};

const getProductById = async (id) => {
	const url = `${env.TRANSACTIONAL_API_URL}/products/${id}`;
	const request = new RequestModel(url);
	//request.bearerToken = token;

	try {
		const { isOk, errorMessage, data } = await apiService.GET(request);
		return {
			isOk,
			product: data,
			errorMessage,
		};
	} catch (error) {
		console.error("Error al visualizar producto:", error);
		throw error;
	}
};

const updateProductById = async (id, updatedProductData) => {
	const url = `${env.TRANSACTIONAL_API_URL}/products/${id}`;
	const request = new RequestModel(url);
	//request.bearerToken = token;
	request.body = updatedProductData;

	try {
		const { isOk, errorMessage, data } = await apiService.PUT(request);
		return {
			isOk,
			product: data, // Datos del producto actualizado
			errorMessage,
		};
	} catch (error) {
		console.error("Error al actualizar producto:", error);
		throw error;
	}
};

const deleteProduct = async (id) => {
	const url = `${env.TRANSACTIONAL_API_URL}/products/${id}`;
	const request = new RequestModel(url);
	//request.bearerToken = token;

	const { isOk, errorMessage } = await apiService.DELETE(request);
	return {
		isOk,
		errorMessage,
	};
};

export default {
	getProducts,
	addProduct,
	getProductById,
	updateProductById,
	deleteProduct,
};
