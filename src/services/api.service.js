
const defaultHeaders = {
		"Content-Type": "application/json",
		"Accept": "application/json"
}

const GET = async (url) => {
	const response = await fetch(url, {
		headers: defaultHeaders,
		method: "GET",

	});
	return response;
}

const POST = async (url, data) => {
	const response = await fetch(url, {
		headers: defaultHeaders,
		method: "POST",
		body: JSON.stringify(data)
	});
	return response;
}

const PUT = async (url, data) => {
	const response = await fetch(url, {
		headers: defaultHeaders,
		method: "PUT",
		body: JSON.stringify(data)
	});
	return response;
}

const DELETE = async (url) => {
	const response = await fetch(url, {
		headers: defaultHeaders,
		method: "DELETE",
	});
	return response;
}

export default {
	GET,
	POST,
	PUT,
	DELETE
}
