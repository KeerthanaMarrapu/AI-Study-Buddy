const express = require("express");
const router = express.Router();
require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function callLLM(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });
    return completion.choices[0].message.content.trim();
  } catch (err) {
    console.error("OpenAI error:", err.response?.data || err.message);
    throw new Error("Failed to get response from OpenAI");
  }
}

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const prompt = `You are an AI study assistant. Respond helpfully to: ${message}`;
    const result = await callLLM(prompt);
    res.json({ reply: result });
  } catch (err) {
    console.error("Chat route error:", err.message);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

router.post("/explain", async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ error: "Topic is required" });

    const prompt = `Explain the topic "${topic}" in simple, easy-to-understand terms.`;
    const result = await callLLM(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({
      error: "LLM request failed",
      details: err.response?.data || err.message,
    });
  }
});

router.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    const prompt = `Summarize the following text in 4–5 key bullet points:\n\n${text}`;
    const result = await callLLM(prompt);
    res.json({ result });
  } catch (err) {
    console.error("Summarize route error:", err.response?.data || err.message);
    res.status(500).json({
      error: "LLM request failed",
      details: err.response?.data || err.message,
    });
  }
});

router.post("/quiz", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    const prompt = `Create 5 multiple-choice or short-answer quiz questions with answers from the following text:\n\n${text}`;
    const result = await callLLM(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({
      error: "LLM request failed",
      details: err.response?.data || err.message,
    });
  }
});

module.exports = router;
