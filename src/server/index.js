const express = require('express')
const bodyParser = require('body-parser')
require('dotenv/config')
const router = require('./routes')
const database = require('./db/database')
const app = express()

database.connect()

app.use(bodyParser.json())
app.use(router)

const port = process.env.PORT || 8081;
app.listen(port, 
          () => console.log(`Listening on port ${port}!`));
