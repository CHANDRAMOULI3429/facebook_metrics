// app.js

const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./authroutes');
require('dotenv').config();

app.use(cors()); // To allow cross-origin requests if you're accessing from a different domain

// Use routes
app.use('/', routes);

// Set the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
