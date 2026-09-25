const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google AI using the key from Render
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// The "System Prompt" - This tells the AI who it is and how to behave
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

    // ✅ THE FIX: Using "-latest" ensures we always hit the active model and avoid 404 errors
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    // Combine system prompt and user message
    const result = await chat.sendMessage(SYSTEM_PROMPT + "\n\nUser Question: " + message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ reply: "I'm sorry, I'm having a little trouble connecting right now. Please try again in a moment!" });
  }
});

module.exports = router;