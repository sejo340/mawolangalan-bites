const express = require('express');
const router = express.Router();
const axios = require('axios');

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

// Helper function to sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ reply: "API Key is missing." });
    }

    const payload = {
      contents: [{ parts: [{ text: SYSTEM_PROMPT + "\n\nUser Question: " + message }] }]
    };

    // ✅ UPDATED: Use 'lite' model first (it's the fastest and has the highest limits)
    // Fallback to the newer models if needed.
    const models = ["gemini-2.0-flash-lite", "gemini-3.8-flash", "gemini-2.0-flash"];
    let reply = null;

    for (const model of models) {
      let attempts = 0;
      const maxAttempts = 3; // Retry up to 3 times if busy

      while (!reply && attempts < maxAttempts) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
          
          // 10 second timeout to prevent hanging
          const response = await axios.post(url, payload, { timeout: 10000 });
          reply = response.data.candidates[0].content.parts[0].text;
          break; // Success! Stop trying.
          
        } catch (error) {
          const status = error.response?.status;
          const errorMsg = error.response?.data?.error?.message || "";
          
          // ✅ SMART RETRY: If Google says "high demand" (429) or "unavailable" (503), wait and retry
          if ((status === 429 || status === 503) && attempts < maxAttempts - 1) {
            attempts++;
            console.log(`⏳ Model ${model} is busy. Retrying in 1.5s... (Attempt ${attempts})`);
            await sleep(1500); // Wait 1.5 seconds silently
          } else {
            // It's a different error (like model not found), stop trying this model
            console.log(`⚠️ Model ${model} failed: ${errorMsg}`);
            break; 
          }
        }
      }
      
      if (reply) break; // If we got a reply from any model, stop the loop
    }

    if (reply) {
      res.json({ reply });
    } else {
      // Only show this if ALL models and ALL retries failed
      res.status(503).json({ reply: "I'm having a slight connection issue. Please try again in a moment! 🙏" });
    }

  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ reply: "I'm having trouble connecting. Please try again!" });
  }
});

module.exports = router;