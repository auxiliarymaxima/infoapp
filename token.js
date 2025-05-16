export default function handler(req, res) {
  const allowedReferer = "https://auxiliarymaxima.github.io/infoapp"; // your live GitHub Pages site
  const referer = req.headers.referer || "";

  if (!referer.startsWith(allowedReferer)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const token = process.env.APIFY_TOKEN;

  if (!token) {
    return res.status(500).json({ error: "Missing APIFY_TOKEN" });
  }

  res.status(200).json({ token });
}
