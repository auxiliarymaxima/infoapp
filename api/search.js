// File: /api/news.js

export default async function handler(req, res) {
  const token = process.env.infoapp; // Set this in Vercel environment
  const taskId = "andrewmonize~infoapptask3";

  try {
    const apiUrl = `https://api.apify.com/v2/actor-tasks/${taskId}/runs/last/dataset/items?token=${token}&clean=true`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch Apify data" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
