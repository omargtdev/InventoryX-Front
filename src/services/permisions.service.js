import env from "../config/env";
import apiService from "./api.service";
import RequestModel from "./models/RequestModel";

const getPermissions = async (token) => {
	const request = new RequestModel(`${env.IDENTITY_API_URL}/admin/permissions`);
	request.bearerToken = token;
	const { isOk, errorMessage, data } = await apiService.GET(request);
	return {
		isOk,
		permissions: data,
		errorMessage,
	};
};

export default {
	getPermissions,
};
