import env from "../config/env";
import apiService from "./api.service";
import RequestModel from "./models/RequestModel";

const getReceipts = async () => {
	const request = new RequestModel(`${env.TRANSACTIONAL_API_URL}/receipts`);
	const { isOk, errorMessage, data } = await apiService.GET(request);
	return {
		isOk,
		receipts: data,
		errorMessage,
	};
};

const addReceipt = async (dataRequest) => {
	const request = new RequestModel(
		`${env.TRANSACTIONAL_API_URL}/receipts`,
		new FormData()
	);
	request.deleteHeader("Content-Type");
	request.body.append("referralGuide", dataRequest.file);
	request.body.append(
		"dataJsonContent",
		JSON.stringify(dataRequest.jsonContent)
	);
	console.log(request.body.get("dataJsonContent"));

	const { isOk, data, errorMessage } = await apiService.POST(request, false);

	return {
		isOk,
		receiptId: data,
		errorMessage,
	};
};

export default {
	addReceipt,
	getReceipts,
};
