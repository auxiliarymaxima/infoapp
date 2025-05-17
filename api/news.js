export default async function handler(req, res) {
  const token = process.env.APIFY_TOKEN;
  const taskId = 'UHpFz2Z3vzJHXUc4k'; // your Apify Task ID

  const url = `https://api.apify.com/v2/actor-tasks/${taskId}/runs/last/dataset/items?token=${token}&clean=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    res.status(200).json(data);
  } catch (error) {
    console.error("Fetch failed:", error);
    res.status(500).json({ error: "Failed to fetch Apify data" });
  }
}
