require('dotenv').config()
const cors = require('cors');
const express = require('express')
const app = express()
const routes = require('./routes')
const port = 3000

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://semantic-core-frontend-dsta5s6jc-ethanamato.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
app.use('/api',routes);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




 