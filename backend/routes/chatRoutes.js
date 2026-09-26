const express = require('express');
const router = express.Router();
const axios = require('axios'); // We use axios to talk directly to Google

const SYSTEM_PROMPT = `
You are the friendly and helpful AI customer support assistant for "Mawolangalan Bites", an artisan bakery located in Kitui, Kenya.

RULES:
1. LANGUAGE: You can speak and understand ANY language. ALWAYS reply in the exact same language the user used to ask their question.
2. TONE: Be polite, warm, and professional. Use emojis occasionally to be friendly.
3. DIRECTING USERS:
   - If they ask about Custom Cakes, tell them they can order via the "Custom Cakes" page and give them this exact link: https://mawolangalan-bites.vercel.app/custom-cakes
   - If they ask to see products or prices, direct them to the Products page: https://mawolangalan-bites.vercel.app/products
   - If they ask about delivery, tell them delivery is calculated based on distance within Kitui, with a maximum cap of 300 KES.
   - If they ask about payment, mention they can use M-Pesa (STK Push or Till Number) or Cash on Delivery.
4. KNOWLEDGE: Answer general baking questions helpfully, but always try to steer the conversation back to Mawolangalan Bites products.

If you don't know the answer to a specific question, politely suggest they contact the business directly via WhatsApp at +254 784 437 428.
`;

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ reply: "DEBUG: API Key is missing in Render." });
    }

    // ✅ BULLETPROOF FIX: We call the API directly using the exact correct model name
    const model = "gemini-1.5-flash-latest";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          parts: [{ text: SYSTEM_PROMPT + "\n\nUser Question: " + message }]
        }
      ]
    };

    console.log("🤖 Sending request to Google AI...");
    const response = await axios.post(url, payload);
    
    // Extract the text from Google's response
    const text = response.data.candidates[0].content.parts[0].text;

    res.json({ reply: text });
  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    res.status(500).json({ reply: "DEBUG: " + (error.response?.data?.error?.message || error.message) });
  }
});

module.exports = router;