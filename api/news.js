export default async function handler(req, res) {
  const token = process.env.APIFY_TOKEN;
  res.status(200).json({
    tokenPresent: !!token,
    tokenStartsWith: token?.substring(0, 20) || null,
  });
}
