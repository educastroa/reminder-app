const reminderController = require("./controllers/reminderController");
const loginController = require("./controllers/loginController");
const verifyController = require("./controllers/verifyController");

const util = require("./utils/util");

const loginPath = "/login";
const verifyPath = "/verify";
const reminderPath = "/reminder";

exports.handler = async (event) => {

  let response;
  let requestMethod = event.httpMethod;
  let requestBody = event.body;

  switch (true) {
    case event.path === reminderPath:
      response = reminderController.reminderRouter(requestMethod, requestBody);
      break;
    case event.path === loginPath:
      response = loginController.loginRouter(requestMethod, requestBody);
      break;
    case event.path === verifyPath:
      response = verifyController.verifyRouter(requestMethod, requestBody);
      break;
    default:
      response = util.buildResponse(404, "404 Path not found");
  }

  return response;
};
