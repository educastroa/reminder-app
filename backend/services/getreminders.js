const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
});
const util = require("../utils/util");

const dynamobd = new AWS.DynamoDB.DocumentClient();
const remainderTable = "reminderapp";


async function getReminder(username, reminderName) {
  const params = {
    TableName: remainderTable,
    Key: {
      username: username,
      reminders: reminderName,
    },
  };
  return await dynamobd
    .get(params)
    .promise()
    .then(
      (response) => {
        return response.Item;
      },
      (error) => {
        console.error("There is an error getting remainder", error);
      }
    );
}

module.exports.getReminder = getReminder;