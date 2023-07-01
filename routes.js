const { getEntriesByLanguageAndCluster, getClusterByKeyword, getPgVersion } = require('./services/translationControllerMethods')

const express = require('express');
const router = express.Router();

router.get('/translations/:language/:clusterLabel', getEntriesByLanguageAndCluster)
router.get('/translations/:language/:keyword?', getClusterByKeyword)
module.exports = router;