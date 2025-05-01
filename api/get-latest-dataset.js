// File: /api/get-latest-dataset.js

export default async function handler(req, res) {
  const taskId = "UHpFz2Z3vzJHXUc4k"; // Your Apify Task ID
  const token = "apify_api_2CYER6z62rMBIwe9DUGsWNDVG2apE64m9oby"; // Your Apify API Token

  try {
    const response = await fetch(
      `https://api.apify.com/v2/actor-tasks/${taskId}/runs?token=${token}&limit=1&status=SUCCEEDED`
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: "Apify request failed", details: text });
    }

    const data = await response.json();
    const latestRun = data?.data?.[0];

    if (!latestRun || !latestRun.defaultDatasetId) {
      return res.status(404).json({ error: "No successful run or dataset found" });
    }

    return res.status(200).json({ datasetId: latestRun.defaultDatasetId });
  } catch (err) {
    return res.status(500).json({
      error: "Unexpected server error",
      message: err.message || err.toString(),
    });
  }
}
