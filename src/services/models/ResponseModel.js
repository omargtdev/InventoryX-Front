
class ResponseModel {
	#isOk;
	#data;
	#errorMessage;

	constructor() {
		this.isOk = false;
		this.data = null;
		this.errorMessage = null;
	}

	set isOk(value) { this.#isOk = value; }
	get isOk() { return this.#isOk; }

	set data(value) { this.#data = value; }
	get data() { return this.#data; }

	set errorMessage(value) { this.#errorMessage = value; }
	get errorMessage() { return this.#errorMessage; }
}

export default ResponseModel;
