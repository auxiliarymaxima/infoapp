export default async function handler(req, res) {
  const token = process.env.APIFY_TOKEN;
  const taskId = 'ZX1OMMUfGxjf5a6YF';

  const url = `https://api.apify.com/v2/actor-tasks/${taskId}/runs/last/dataset/items?token=${token}&clean=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load YouTube data from Apify" });
  }
}
