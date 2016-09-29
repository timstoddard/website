const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// serve static assets normally
app.use(express.static(__dirname + '/'));

// pass every other route with index.html, and it will be handled with react-router
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './', 'index.html'));
});

app.listen(port);
console.log("server started on port " + port);
