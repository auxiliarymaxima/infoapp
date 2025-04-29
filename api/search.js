export default async function handler(req, res) {
  const apiKey = process.env.openaikey;

  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured in environment.' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed.' });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is missing or invalid.' });
  }

  try {
    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 100,
      }),
    });

    if (!openAiResponse.ok) {
      const errorDetails = await openAiResponse.text();
      return res.status(500).json({ error: `OpenAI error response: ${errorDetails}` });
    }

    const data = await openAiResponse.json();

    if (data.error) {
      return res.status(500).json({ error: `OpenAI API error: ${data.error.message}` });
    }

    const reply = data.choices && data.choices.length > 0 ? data.choices[0].message.content.trim() : '';
    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({ error: `Exception: ${error.message}` });
  }
}
