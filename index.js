require('dotenv').config()

const { getTranslations, getEntriesByLanguageAndCluster, getClusterByKeyword } = require('./services/translationControllerMethods')

const { response } = require('express');
const express = require('express')
const app = express()
const port = 3000

app.get('/translations', getTranslations)
app.get('/translations/:language/:clusterLabel', getEntriesByLanguageAndCluster)
app.get('/translations/:language/:keyword?', getClusterByKeyword)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




 