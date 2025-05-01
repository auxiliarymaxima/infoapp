// File: /api/get-latest-dataset.js

export default async function handler(req, res) { const taskId = "UHpFz2Z3vzJHXUc4k"; // Your Apify Task ID const token = "apify_api_2CYER6z62rMBIwe9DUGsWNDVG2apE64m9oby"; // Your Apify API Token

try { if (!taskId || typeof taskId !== "string") { return res.status(400).json({ error: "Invalid or missing Apify Task ID." }); }

if (!token || typeof token !== "string") {
  return res.status(400).json({ error: "Invalid or missing Apify API Token." });
}
const taskId = "UHpFz2Z3vzJHXUc4k";
const token = "apify_api_2CYER6z62rMBIwe9DUGsWNDVG2apE64m9oby"; // Make sure this is here and defined

const url = `https://api.apify.com/v2/actor-tasks/${taskId}/runs?token=${token}&limit=1&status=SUCCEEDED`;

const response = await fetch(url);

if (!response.ok) {
  const text = await response.text();
  return res.status(500).json({ 
    error: "Apify request failed",
    status: response.status,
    statusText: response.statusText,
    details: text
  });
}

const data = await response.json();

if (!data || !Array.isArray(data.data)) {
  return res.status(500).json({ error: "Invalid data structure received from Apify." });
}

const latestRun = data.data[0];

if (!latestRun) {
  return res.status(404).json({ error: "No successful run found for the provided Task ID." });
}

if (!latestRun.defaultDatasetId) {
  return res.status(404).json({
    error: "Run completed, but no default dataset ID found.",
    runId: latestRun.id || null
  });
}

return res.status(200).json({ datasetId: latestRun.defaultDatasetId });

} catch (err) { return res.status(500).json({ error: "Unexpected server error", message: err.message || err.toString(), }); } }

