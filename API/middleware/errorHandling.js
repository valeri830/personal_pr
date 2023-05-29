const tools = require('../utility')

async function handleError(err, req, res, next) {
    let return_error = {}
    return_error["error_sender"] = err.name;
    return_error["error_message"] = err.message;
  res.status(400).send(return_error);
};
 
module.exports = handleError; 