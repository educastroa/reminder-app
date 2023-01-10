const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
});

const util = require("../utils/util");

const dynamobd = new AWS.DynamoDB.DocumentClient();
const remainderTable = "reminderapp";

async function addReminder(requestBody) {
  const user = requestBody.username;
  const reminderName = requestBody.reminderName;
  const frequency = requestBody.frequency;
  const type = requestBody.type;
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

  return util.buildResponse(200, { reminder: requestBody });
}

async function getReminder(requestBody) {
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
        console.error("There is an error getting the reminder", error);
      }
    );
}

async function updateReminder(requestBody) {

}


async function deleteReminder(requestBody) {
  const username = requestBody.username;
  const SK = requestBody.SK;

  if (!username || !SK) {
    return util.buildResponse(401, {
      message: "missing data",
    });
  }

  const params = {
    TableName: remainderTable,
    Key: {
      username: username,
      SK: `audit_${SK}`
    },
  };

  let response = await dynamoDb
    .delete(params)
    .promise()
    .then(
      () => {
        return true;
      },
      (error) => {
        return util.buildResponse(500, {
          message: "Error while deleting user. " + error,
        });
      }
    );


  return response;
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
        console.error("There is an error saving the reminder", error);
      }
    );
}

module.exports.addReminder = addReminder;
module.exports.getReminder = getReminder;
module.exports.updateReminder = updateReminder;
module.exports.deleteReminder = deleteReminder;
