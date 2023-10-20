
class ResponseModel {
	#isOk = false;
	#data = null;
	#errorMessage = null;

	constructor(isOk, data, errorMessage) {
		this.isOk = isOk;
		this.data = data;
		this.errorMessage = errorMessage;
	}

	set isOk(value) { this.#isOk = value; }
	get isOk() { return this.#isOk; }

	set data(value) { this.#data = value; }
	get data() { return this.#data; }

	set errorMessage(value) { this.#errorMessage = value; }
	get errorMessage() { return this.#errorMessage; }
}

export default ResponseModel;
