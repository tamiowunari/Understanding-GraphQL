const reader = require('jsonfile');
const addItem = async (payload, location) => {
	return reader
		.readFile(location)
		.then(data => {
			payload.id = data.length + 1;
			const update = [...data, payload];
			reader.writeFile(location, update, function(err, data) {
				if (err) console.error(err);
			});
			return payload;
		})
		.catch(err => console.log(error));
};

module.exports = { addItem };
