#!/usr/bin/node
const request = require('request');

request(process.argv[2], function (error, response, body) {
  if (error) {
    console.error('Error:', error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error('Error: Unexpected status code:', response.statusCode);
    return;
  }

  try {
    const todos = JSON.parse(body);
    const completed = {};
    todos.forEach((todo) => {
      if (todo.completed) {
        if (completed[todo.userId] === undefined) {
          completed[todo.userId] = 1;
        } else {
          completed[todo.userId] += 1;
        }
      }
    });
    console.log(completed);
  } catch (parseError) {
    console.error('Error: Failed to parse JSON response:', parseError);
  }
});
