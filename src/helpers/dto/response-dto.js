class ResponseDto {
	constructor(body, errors = []) {
		this.body = body;
		this.error = !!errors.length;
		if (errors.length > 0 && errors.length) {
			this.errors = errors;
		}
	}
}

module.exports = ResponseDto;
