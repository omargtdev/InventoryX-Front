import env from "../config/env";
import apiService from "./api.service";
import RequestModel from "./models/RequestModel";

const addEntries = async (token, entrieData) => {
	const request = new RequestModel(`${env.IDENTITY_API_URL}/receipts`);
	request.bearerToken = token;
	request.body = entrieData;
	const { isOk, errorMessage, data } = await apiService.POST(request);
	return {
		isOk,
		entrie: data, // Si el servidor devuelve el empleado recién creado
		errorMessage,
	};
};
