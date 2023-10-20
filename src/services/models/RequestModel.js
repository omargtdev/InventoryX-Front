
class RequestModel {
	#url = null;
	#queryParams = {};
	#body = {};
	#bearerToken = null;

	#headers = null;

	constructor(url, body){
		this.#url = url;
		this.#body = body;

		this.#headers = new Headers();
		this.#headers.set("Content-Type", "application/json");
		this.#headers.set("Accept", "application/json");
	}

	#formatQueryParamsToUrl() {
		if(!this.queryParams || typeof this.queryParams !== "object")
			return "";

		if(Object.keys(this.queryParams) === 0)
			return "";

		let queriesResult = "?";
		for(const property in this.queryParams)
			queriesResult += `${property}=${queries[property]}&`;
		queriesResult = queriesResult.slice(0, -1);

		return queriesResult;
	}

	set url(value) { this.#url = value; }
	get url() {
		const extraQueryParams = this.#formatQueryParamsToUrl();
		return `${this.#url}${extraQueryParams}`;
	}

	set queryParams(value) { this.#queryParams = value; }
	get queryParams() { return this.#queryParams; }

	set body(value) { this.#body = value; }
	get body() { return this.#body; }
	get bodyStringified() { return JSON.stringify(this.body); }

	set bearerToken(value) { this.#bearerToken = value; }
	get bearerToken() { return this.#bearerToken; }

	get headers() {
		if(this.bearerToken)
			this.#headers.set("Authorization", `Bearer ${this.#bearerToken}`);
		else
			this.#headers.delete("Authorization");

		return this.#headers;
	}

}

export default RequestModel;

