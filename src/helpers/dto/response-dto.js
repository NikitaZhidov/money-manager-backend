class ResponseDto {
	constructor(body, errors = []) {
		this.body = body;
		if (typeof errors === 'string') {
			this.errors = [errors];
		} else if (errors.length > 0) {
			this.errors = errors;
		}
		this.error = !!errors.length;
	}
}

module.exports = ResponseDto;
