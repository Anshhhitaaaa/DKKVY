
// src/utils/apiResponse.js
const apiResponse = (success, message, data = null, meta = null) => {
  return {
    success,
    message,
    data,
    meta,
  };
};

module.exports = apiResponse;
