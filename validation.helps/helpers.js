const { EMAIL_IN_USE } = require("../constants/errorConstants");

const tryCatch = (callback) => {
  return (req, res, next) => {
    callback(req, res, next).catch((error) => {
      const myCustomError = new Error(
        // "Incorrect input or such a mail already exists"
        EMAIL_IN_USE
      );
      myCustomError.status = 409;
      myCustomError.cause = error; // сохранение оригинальной ошибки в свойстве "cause"
      next(myCustomError);
    });
  };
};

module.exports = {
  tryCatch,
};

// class AppError extends Error {
//   constructor(status, message) {
//     super(message);
//     this.status = status;
//   }
// }

// module.exports = AppError;
