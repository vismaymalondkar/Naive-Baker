// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

// app.post('/api/world', (req, res) => {
//  // console.log(req.body);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`,
//   );
//   console.log(res);
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));
var express = require("express");
var app = express();
var port = 3000;
 
app.get("/", (req, res) => {
 res.send("Hello World");
});
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});