const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const crypto = require('crypto');
const routes = require('./routes/index');
const Client = require('./database/database');
const jwtAuthMiddleware = require('./middlewares/jwtAuthMiddleware');

const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Generated Secret Key:', secretKey);
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', routes);

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
