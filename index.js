require('dotenv').config()
const cors = require('cors');
const express = require('express')
const app = express()
const routes = require('./routes')
const port = 3000




// Add Access Control Allow Origin headers
const corsOptions = {
  origin: ["https://semantic-core-frontend.vercel.app","http://localhost:3000"],
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

app.use('/api',routes);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




 