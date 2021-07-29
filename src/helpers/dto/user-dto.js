class UserDto {
	constructor(user) {
		this.email = user.email;
		this.id = user.id;
		this.isActivated = user.isActivated;
		this.name = user.name;
	}
}

module.exports = UserDto;
