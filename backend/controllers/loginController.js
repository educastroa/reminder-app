const loginService = require("../services/loginService");
const util = require("../utils/util");

async function loginRouter(requestMethod, requestBody) {
    let response;

    switch (true) {
        case requestMethod === "POST":
            response = loginService.login(requestBody);
            break;
        default:
            response = util.buildResponse(404, "404 Request method not Found");
    }

    return response;
}


module.exports.loginRouter = loginRouter;