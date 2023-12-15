import env from "../config/env";
import apiService from "./api.service";
import RequestModel from "./models/RequestModel";

const createIssue = async (issuesData) => {
	const request = new RequestModel(`${env.TRANSACTIONAL_API_URL}/issues`);
	//request.bearerToken = token;
	request.body = issuesData;
	console.log(issuesData);
	const { isOk, errorMessage, data } = await apiService.POST(request);
	return {
		isOk,
		issue: data, // Si el servidor devuelve el producto recién creado
		errorMessage,
	};
};

export default {
	createIssue,
};
