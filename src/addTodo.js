const { v4 } = require("uuid")
const AWS = require("aws-sdk")
const middy = require("@middy/core")
const httpJsonBodyParser = require("@middy/http-json-body-parser")

const addTodo = async (event, context, callback) => {
    console.log("the event is  :");
    console.dir(event);
    
    console.log("thge context is  : ");
    console.dir(context);
    
    console.log("the callback is : ");
    console.log(callback);
    
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const { todo } = event.body;
  const createAt = new Date().toISOString();

  const id = v4();

  console.log(`this is an id ${id}`)

  const newTodo = {
    id,
    todo,
    createAt,
    completed:false
  }
  
  await dynamodb.put({
    TableName: "TodoTable",
    Item:newTodo
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
    addTodo: middy(addTodo).use(httpJsonBodyParser())
}