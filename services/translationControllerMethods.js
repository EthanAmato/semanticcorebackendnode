const postgres = require('postgres');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

async function getEntriesByLanguageAndCluster(request, response) {
  const language = request.params.language;
  const clusterLabel = request.params.clusterLabel;

  try {
    const results = await sql`
        SELECT * FROM semcore_output
        WHERE language = ${language} AND cluster_labels = ${clusterLabel}
      `;

    if (!results || results.length === 0) {
      response.status(404).json([]);
    } else {
      console.log(results);
      response.status(200).json(results);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
}
async function getClusterByKeyword(request, response) {
  const language = request.params.language;
  const keyword = request.query.keyword;

  try {
    await sql.begin(async (transaction) => {
      const result = await transaction`
        SELECT cluster_labels FROM semcore_output
        WHERE language = ${language} AND translated = ${keyword}
      `;

      for (const entry of result) {  // Adjusted to iterate directly over `result` as it is an array
        if (entry.cluster_labels !== "-1") {
          const finalResults = await transaction`
            SELECT * FROM semcore_output
            WHERE language = ${language} AND cluster_labels = ${entry.cluster_labels}
          `;

          response.status(200).json(finalResults);
          return;  // This return will exit the function after sending the first non "-1" cluster result
        }
      }

      response.status(200).json([]);  // Moved this inside the `sql.begin` block to ensure it only gets called if no clusters are found
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
}


module.exports = {
  getEntriesByLanguageAndCluster,
  getClusterByKeyword,
};
