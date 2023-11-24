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

export default {
	getCategories,
};
