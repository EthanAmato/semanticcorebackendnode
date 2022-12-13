require('dotenv').config()
const cors = require('cors');
const express = require('express')
const app = express()
const routes = require('./routes')
const port = 3000

app.use('/api',routes);
app.use(cors())

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




 