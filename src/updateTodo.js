const { v4 } = require("uuid")
const AWS = require("aws-sdk")

module.exports.updateTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient()

  const { id } = event.pathParameters
  const { completed } = JSON.parse(event.body);


  await dynamodb.update({
    TableName: "TodoTable",
    Key: {id},
    UpdateExpression: 'set completed = :completed',
    ExpressionAttributeValues:{
      ":completed":completed
    },
    ReturnValues: "ALL_NEW"
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({msg: "todo update"}),
  };
};

