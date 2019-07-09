const errorHandler = (err, req, res, next) => {
	if(err) {
		console.error(err);
		res.status(500).send({'msg': 'An error has ocurred'});
	}
	else {
		next();
	}
};

module.exports = errorHandler;