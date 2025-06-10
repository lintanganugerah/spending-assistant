const config = require("@config/index.config");

const errorHandlers = (error, req, res, next) => {
  console.error(error);
  if (error.code == "EBADCSRFTOKEN") {
    error.message = "Bad Form Request";
  }

  return res.status(error.status || 500).send({
    success: false,
    message: error.message || "Internal Server Error",
    // code: error.code,
  });
};

module.exports = errorHandlers;
