const verifyService = require("../services/verifyService");

async function verifyRouter(requestMethod, requestBody) {
    let response;

    switch (true) {
        case requestMethod === "POST":
            response = verifyService.verifyUser(requestBody);
            break;
        default:
            response = util.buildResponse(404, "404 Request method not Found");
    }

    return response;
}


module.exports.verifyRouter = verifyRouter;