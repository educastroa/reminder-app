const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
});
const util = require("../utils/util");

const dynamobd = new AWS.DynamoDB.DocumentClient();
const remainderTable = "reminderapp";

async function addReminders(reminderInfo) {
  const user = reminderInfo.username;
  const reminderName = reminderInfo.reminderName;
  const frequency = reminderInfo.frequency;
  const type = reminderInfo.type;
  if (!user || !frequency || !type || !reminderName) {
    return util.buildResponse(401, {
      message: "Missing data",
    });
  }

  const reminder = {
    username: user,
    SK: reminderName,
    frequency: frequency,
    type: type,
  };

  const saveReminderResponse = await saveReminder(reminder);
  if (!saveReminderResponse) {
    return util.buildResponse(503, {
      message: "Server error. Please try again",
    });
  }

  return util.buildResponse(200, { reminder: reminderInfo });
}

async function getReminder(username, reminderName) {
  const params = {
    TableName: remainderTable,
    key: {
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

async function saveReminder(reminder) {
  const params = {
    TableName: remainderTable,
    Item: reminder
  };
  return await dynamobd
    .put(params)
    .promise()
    .then(
      () => {
        return true;
      },
      (error) => {
        console.error("There is an error saving reminder", error);
      }
    );
}

module.exports.addReminders = addReminders;