export default async function handler(req, res) {
  const token = process.env.APIFY_TOKEN;
  const taskId = 'UHpFz2Z3vzJHXUc4k'; // Replace with your actual Facebook scraping task ID

  if (!token) {
    return res.status(500).json({ error: "APIFY_TOKEN is missing from environment." });
  }

  const url = `https://api.apify.com/v2/actor-tasks/${taskId}/runs/last/dataset/items?token=${token}&clean=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    res.status(200).json(data);
  } catch (err) {
    console.error("Failed to fetch Apify data:", err);
    res.status(500).json({ error: "Failed to load Facebook news" });
  }
}
