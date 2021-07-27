function getMessageArray(array, messageKey = 'msg') {
	return array.map((el) => (el[messageKey]));
}

module.exports = {
	getMessageArray,
};
