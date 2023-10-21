import env from "../config/env";
import apiService from "./api.service";
import RequestModel from "./models/RequestModel";

const login = async (username, password) => {
	const request = new RequestModel(`${env.IDENTITY_API_URL}/auth/login`, { username, password });
	const { isOk, errorMessage, data } = await apiService.POST(request);
	return {
		isOk,
		token: data?.token,
		errorMessage
	};
}

const me = async (token) => {
	const request = new RequestModel(`${env.IDENTITY_API_URL}/auth/profile`);
	request.bearerToken = token;
	const { isOk, errorMessage, data } = await apiService.GET(request);
	return {
		isOk,
		userInfo: data,
		errorMessage
	};
}

export default {
	login,
	me
}
