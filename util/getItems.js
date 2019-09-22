const reader = require('jsonfile');

const getSingleItem = (id, location) => {
	return reader
		.readFile(location)
		.then(items => {
			const result = items.filter(item => item.id === id)[0];
			return result;
		})
		.catch(error => console.log(error));
};

const getAllItems = location => {
	return reader
		.readFile(location)
		.then(items => {
			return items;
		})
		.catch(error => console.log(error));
};

module.exports = {
	getSingleItem,
	getAllItems
};
