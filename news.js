export default async function handler(req, res) {
  const token = "apify_api_2CYER6z62rMBIwe9DUGsWNDVG2apE64m9oby";
  const taskId = "UHpFz2Z3vzJHXUc4k";
  const allowedReferer = "https://auxiliarymaxima.github.io/infoapp"; // Change to your GitHub Pages domain

  if (!req.headers.referer?.startsWith(allowedReferer)) {
    return res.status(403).json({ error: "Unauthorized request" });
  }

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
