// File: /api/get-latest-dataset.js

export default async function handler(req, res) {
  const taskId = "UHpFz2Z3vzJHXUc4k"; // Your Task ID
  const token = "apify_api_2CYER6z62rMBIwe9DUGsWNDVG2apE64m9oby"; // Your API Token

  try {
    const response = await fetch(`https://api.apify.com/v2/actor-tasks/${taskId}/runs?token=${token}&limit=1&status=SUCCEEDED`);
    const data = await response.json();

    const latestRun = data?.data?.[0];
    if (!latestRun || !latestRun.defaultDatasetId) {
      return res.status(404).json({ error: "No successful run with dataset found." });
    }

    return res.status(200).json({ datasetId: latestRun.defaultDatasetId });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch dataset ID.", details: error.message });
  }
}
