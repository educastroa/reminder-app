const reminderService = require("../services/reminderService");
const util = require("../utils/util");

async function reminderRouter(requestMethod, requestBody) {
    let response;

    switch (true) {
        case requestMethod === "GET":
            response = reminderService.getReminder(requestBody);
            break;
        case requestMethod === "POST":
            response = reminderService.addReminder(requestBody);
            break;
        case requestMethod === "PUT":
            response = reminderService.updateReminder(requestBody);
            break;
        case requestMethod === "DELETE":
            response = reminderService.deleteReminder(requestBody);
            break;
        default:
            response = util.buildResponse(404, "404 Request method not Found");
    }

    return response;
}


module.exports.reminderRouter = reminderRouter;
