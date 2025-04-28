// api/search.js

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { content, prompt } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: `You are an assistant helping users find information from this text: "${content}"` },
        { role: 'user', content: prompt }
      ],
      max_tokens: 200,
    });

    const answer = completion.data.choices[0].message.content.trim();
    res.status(200).json({ answer });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: 'Error communicating with OpenAI' });
  }
}
