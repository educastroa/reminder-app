const aws = require("aws-sdk");
const ses = new aws.SES({ region: "us-east-2" });
const util = require("../utils/util");

const AUTHORIZED_EMAIL = process.env.AUTHORIZED_EMAIL;

async function sendEmail() {
  const params = {
    Destination: {
      ToAddresses: [AUTHORIZED_EMAIL],
    },
    Message: {
      Body: {
        Text: { Data: "AWS TEST" },
      },

      Subject: { Data: "Test Email" },
    },
    Source: AUTHORIZED_EMAIL,
  };
 
  await ses.sendEmail(params).promise();
  return util.buildResponse(200);
};

module.exports.sendEmail = sendEmail;