import ResponseModel from "./models/ResponseModel";

const GET = async (request) => {
	const { url, headers } = request;
	const result = new ResponseModel();
	try {
		const response = await fetch(url, {
			headers,
			method: "GET",
		});
		const data = await response.json();

		result.isOk = response.ok;

		if (result.isOk) result.data = data;
		else result.errorMessage = data.message;

		return result;
	} catch (error) {
		result.errorMessage = error.message;
	}

	return result;
};

const POST = async (request) => {
	const { url, headers, bodyStringified: body } = request;
	const result = new ResponseModel();
	console.log(body);

	try {
		const response = await fetch(url, {
			headers,
			method: "POST",
			body,
		});
		const data = await response.json();

		result.isOk = response.ok;

		if (result.isOk) result.data = data;
		else result.errorMessage = data.message;

		return result;
	} catch (error) {
		result.errorMessage = error.message;
	}

	return result;
};

const PUT = async (request) => {
	const { url, headers, bodyStringified: body } = request;
	const result = new ResponseModel();
	try {
		const response = await fetch(url, {
			headers,
			method: "PUT",
			body,
		});
		const data = await response.json();

		result.isOk = response.ok;

		if (result.isOk) result.data = data;
		else result.errorMessage = data.message;

		return result;
	} catch (error) {
		result.errorMessage = error.message;
	}

	return result;
};

const DELETE = async (request) => {
	const { url, headers } = request;
	const result = new ResponseModel();
	try {
		const response = await fetch(url, {
			headers,
			method: "DELETE",
		});
		const data = await response.json();

		result.isOk = response.ok;

		if (result.isOk) result.data = data;
		else result.errorMessage = data.message;

		return result;
	} catch (error) {
		result.errorMessage = error.message;
	}

	return result;
};

export default {
	GET,
	POST,
	PUT,
	DELETE,
};
