import env from "../config/env";
import apiService from "./api.service";
import RequestModel from "./models/RequestModel";

const getWarehouses = async () => {
	const request = new RequestModel(`${env.TRANSACTIONAL_API_URL}/warehouses`);
	const { isOk, errorMessage, data } = await apiService.GET(request);
	return {
		isOk,
		warehouses: data,
		errorMessage,
	};
};

const addWarehouse = async (warehouseData) => {
	const request = new RequestModel(`${env.TRANSACTIONAL_API_URL}/warehouses`);
	//request.bearerToken = token;
	request.body = warehouseData;
	const { isOk, errorMessage, data } = await apiService.POST(request);
	return {
		isOk,
		warehouse: data, // Si el servidor devuelve el almacen recién creado
		errorMessage,
	};
};

const getWarehouseById = async (id) => {
	const url = `${env.TRANSACTIONAL_API_URL}/warehouses/${id}`;
	const request = new RequestModel(url);
	//request.bearerToken = token;

	try {
		const { isOk, errorMessage, data } = await apiService.GET(request);
		return {
			isOk,
			warehouse: data,
			errorMessage,
		};
	} catch (error) {
		console.error("Error al visualizar almacen:", error);
		throw error;
	}
};

const updateWarehouseById = async (id, updatedwarehouseData) => {
	const url = `${env.TRANSACTIONAL_API_URL}/warehouses/${id}`;
	const request = new RequestModel(url);
	//request.bearerToken = token;
	request.body = updatedwarehouseData;

	try {
		const { isOk, errorMessage, data } = await apiService.PUT(request);
		return {
			isOk,
			warehouse: data, // Datos del almacen actualizado
			errorMessage,
		};
	} catch (error) {
		console.error("Error al actualizar almacen:", error);
		throw error;
	}
};

const deleteWarehouse = async (id) => {
	const url = `${env.TRANSACTIONAL_API_URL}/warehouses/${id}`;
	const request = new RequestModel(url);
	//request.bearerToken = token;

	const { isOk, errorMessage } = await apiService.DELETE(request);
	return {
		isOk,
		errorMessage,
	};
};

export default {
	getWarehouses,
	addWarehouse,
	getWarehouseById,
	updateWarehouseById,
	deleteWarehouse,
};
