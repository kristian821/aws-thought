const AWS = require("aws-sdk");
const fs = require('fs');

AWS.config.update({
    region: "us-east-2"
});
const dynamodb = new AWS.DynamoDB.DocumentClient({apiVersion: "2012-08-10"});

console.log("Importing thoughts into DynamoDB. Please wait.");
const allUsers = JSON.parse(fs.readFileSync('./server/seed/user.json', 'utf8'));

allUsers.forEach(user => {
    const params = {
        TableName: "Thoughts",
        Item: {
            "username": user.username,
            "createdAt": user.createdAt,
            "thought": user.thought
        }
    };

    dynamodb.put(params, (err, data) => {
        if (err) {
            console.log("Unable to add thought", user.username, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", user.username);
        }
    });
})