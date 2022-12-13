// Create a connection pool using the connection information provided on host

const { Pool } = require('pg');

//Establish Connection between Host and Current API
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DB_NAME, // public database 
    password: process.env.API_KEY, // key from bit.io database page connect menu
    port: 5432,
    ssl: true,
});


const getEntriesByLanguageAndCluster = (request, response) => {
    const language = request.params.language;
    const clusterLabel = request.params.clusterLabel

    pool.query(`SELECT * FROM semcore_output WHERE language = '${language}' AND cluster_labels = '${clusterLabel}'`,
        (error, results) => {
            if (!results) {
                response.status(404).json([]);
            } else if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

const getClusterByKeyword = (request, response) => {
    const language = request.params.language;
    const keyword = request.query.keyword;
    pool.query('BEGIN').then(() => {
        return pool.query(`SELECT cluster_labels FROM semcore_output WHERE language = '${language}' AND translated = '${keyword}'`)
        .then((result) => {
            for (let entry of result.rows) {
                if(entry.cluster_labels !== "-1") {
                    return pool.query(`SELECT * FROM semcore_output WHERE language = '${language}' AND cluster_labels = ${entry.cluster_labels};`)
                }
            }
        }).then((finalResults) => {
            response.status(200).json(finalResults.rows)
        })
    })
}

module.exports = {
    getEntriesByLanguageAndCluster,
    getClusterByKeyword
};


