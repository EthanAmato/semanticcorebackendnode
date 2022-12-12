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

const getTranslations = (request, response) => {
    pool.query("SELECT * FROM semcore_output where language='Bulgarian' limit 100;", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows)
    })
}


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


// @GetMapping("/translations/{language}")
// public ResponseEntity<List<TranslationEntry>> getClusterByKeyword(
//         @PathVariable("language") String language, @RequestParam(required = false) String keyword) {
//         List<TranslationEntry> cluster = translationService.getClusterByKeyword(language, keyword);
//         if(cluster.isEmpty()) {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         } else {
//             return new ResponseEntity<List<TranslationEntry>>(cluster, HttpStatus.OK);
//         }
// }
// 	@Query("SELECT t.clusterLabels FROM TranslationEntry t WHERE t.language = :language and t.translated = :translated")
// 	List<String> findClusterByKeyword(@Param("language") String language,
// 								@Param("translated") String keyWord);

const getClusterByKeyword = (request, response) => {
    const language = request.params.language;
    const keyword = request.query.keyword;

    pool.query(`SELECT cluster_labels FROM semcore_output WHERE language = '${language}' AND translated = '${keyword}'`,
        (error, results) => {
            if (error) {
                throw error
            }
            // response.status(200).json(results.rows)
            for (let entry of results.rows) {
                if (entry.cluster_labels !== "-1") {
                    console.log(`SELECT * FROM semcore_output WHERE language = '${language}' AND cluster_labels = ${entry.cluster_labels}`)
                    pool.query(`SELECT * FROM semcore_output WHERE language = '${language}' AND cluster_labels = ${entry.cluster_labels};`), 
                    (error, results) => {
                            console.log(results.rows)
                            console.log("inside")
                            this.response.status(200).json(results.rows)
                            
                    };
                    
                    break;
                }
            }
            console.log("Done with loop")
        })
} 

module.exports = {
    getTranslations,
    getEntriesByLanguageAndCluster,
    getClusterByKeyword
};


