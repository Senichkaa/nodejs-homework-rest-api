const handleMongooseError = (error, next) => {
  error.status = 400;
  next(error);
};

module.exports = handleMongooseError;
