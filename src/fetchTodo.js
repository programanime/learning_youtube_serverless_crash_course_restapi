const { v4 } = require("uuid")
const AWS = require("aws-sdk")

module.exports.fetchTodo = async (event) => {
  const { id } = event.pathParameters

  const dynamodb = new AWS.DynamoDB.DocumentClient()
  let todo = [];
  try{
    const results = await dynamodb.get(
      {
        TableName:"TodoTable",
        Key: { id }
      }
    ).promise();
    todo = results.Item;
  }catch(error){
    console.log(error);
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(todo),
  };
};

