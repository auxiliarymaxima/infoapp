export default async function handler(req, res) {
  const token = process.env.infoapp;
  const taskId = "andrewmonize~infoapptask3";

  if (!token) {
    return res.status(500).json({ error: "Missing APIFY_TOKEN in environment variables." });
  }

  try {
    const apiUrl = `https://api.apify.com/v2/actor-tasks/${taskId}/runs/last/dataset/items?token=${token}&clean=true`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: "Apify error", details: text });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
