export default async function handler(req, res) {
  const token = process.env.APIFY_TOKEN;
  const taskId = 'UHpFz2Z3vzJHXUc4k'; // <- your actual TASK ID

  if (!token) {
    return res.status(500).json({ error: "Missing APIFY_TOKEN in environment" });
  }

  const url = `https://api.apify.com/v2/actor-tasks/${taskId}/runs/last/dataset/items?token=${token}&clean=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Apify fetch error:", err);
    res.status(500).json({ error: "Failed to load data" });
  }
}
