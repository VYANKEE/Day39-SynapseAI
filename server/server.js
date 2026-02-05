const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// TERA NAYA CONFIGURATION (NVIDIA)
const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

app.post('/generate-notes', async (req, res) => {
  const { topic, length } = req.body;

  if (!topic) return res.status(400).json({ error: "Topic is required" });

  let promptInstructions = "";
  if (length === "Short") {
    promptInstructions = "Concise bullet points. Max 150 words.";
  } else if (length === "Medium") {
    promptInstructions = "Balanced explanation with examples. Max 300 words.";
  } else {
    promptInstructions = "Detailed deep-dive with history and structure. Max 600 words.";
  }

  try {
    const completion = await openai.chat.completions.create({
      // YEH HAI TERA NAYA MODEL
      model: "meta/llama-3.1-70b-instruct", 
      messages: [
        { role: "system", content: "You are an expert tutor. Create highly structured notes." },
        { role: "user", content: `Topic: ${topic}. Instructions: ${promptInstructions}` }
      ],
      // TERI SETTINGS
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
      stream: false // Isko FALSE rakha hai taaki frontend asaan rahe
    });

    const notes = completion.choices[0].message.content;
    res.json({ notes });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to generate notes." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));