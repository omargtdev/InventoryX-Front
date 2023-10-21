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
		errorMessage
	}
}

export default {
	getEmployees
}
