require('dotenv').config()
const cors = require('cors');
const express = require('express')
const app = express()
const routes = require('./routes')
const port = 3000

app.use('/api',routes);
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




 