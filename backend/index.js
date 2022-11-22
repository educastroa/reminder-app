const loginService = require("./services/login");
const verifyService = require("./services/verify");
const addReminderService = require("./services/addreminders");
const getRemindersService = require("./services/getreminders");
const util = require("./utils/util");

const loginPath = "/login";
const verifyPath = "/verify";
const addReminderPath = "/addreminder";
const getRemindersPath = "/getreminders";

exports.handler = async (event) => {
  console.log("Request Event: ", event);
  let response;
  switch (true) {
    case event.httpMethod === "GET" && event.path === getRemindersPath:
      const getRemindersBody = JSON.parse(event.body);
      response = getRemindersService.getReminders(getRemindersBody);
      break;
    case event.httpMethod === "POST" && event.path === addReminderPath:
      const addReminderBody = JSON.parse(event.body);
      response = addReminderService.addReminders(addReminderBody);
      break;
    case event.httpMethod === "POST" && event.path === loginPath:
      const loginBody = JSON.parse(event.body);
      response = loginService.login(loginBody);
      break;
    case event.httpMethod === "POST" && event.path === verifyPath:
      const verifyBody = JSON.parse(event.body);
      response = verifyService.verify(verifyBody);
      break;
    default:
      response = util.buildResponse(404, "404 Not Found");
  }
  return response;
};
