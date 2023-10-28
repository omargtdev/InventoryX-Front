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

export default {
	getClients
}
