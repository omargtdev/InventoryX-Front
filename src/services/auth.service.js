import env from "../config/env";
import apiService from "./api.service";
import ResponseModel from "./models/ResponseModel";

const login = async (username, password) => {
	const result = new ResponseModel();
	try {
		const response = await apiService.POST(`${env.IDENTITY_API_URL}/auth/login`, { username, password });
		const data = await response.json();
		if(!response.ok) {
			result.errorMessage = data.message;
			return result;
		}

		result.isOk = response.ok;
		result.data = data;
		return result;
	} catch (error) {
		result.errorMessage = "Ups! Ocurrió un error al tratar de autenticarse";
		throw result;
	}
}

export default {
	login
}
