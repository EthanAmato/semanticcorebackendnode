const postgres = require("postgres");
require("dotenv").config();


const sql = postgres(process.env.DATABASE_URL, { ssl: "require" });

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
      const result = await transaction.query`
          SELECT cluster_labels FROM semcore_output
          WHERE language = ${language} AND translated = ${keyword}
        `;

      for (const entry of result.rows) {
        if (entry.cluster_labels !== "-1") {
          const finalResults = await transaction.query`
              SELECT * FROM semcore_output
              WHERE language = ${language} AND cluster_labels = ${entry.cluster_labels}
            `;

          response.status(200).json(finalResults);
          return;
        }
      }
    });

    response.status(200).json([]);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getEntriesByLanguageAndCluster,
  getClusterByKeyword,
};
