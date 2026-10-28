import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();
const port = Number(process.env.PORT || 3000);

if (!process.env.OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY is not set. Add it to your .env file.");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(helmet());
app.use(express.json({ limit: "64kb" }));
app.use(express.static("public"));
app.use("/api/", rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false
}));

app.post("/api/chat", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ error: "Server API key is not configured yet." });
    }

    const messages = req.body?.messages;
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 40) {
      return res.status(400).json({ error: "Send between 1 and 40 messages." });
    }

    const safeMessages = [];
    for (const message of messages) {
      if (!message || !["user", "assistant"].includes(message.role) ||
          typeof message.content !== "string" ||
          message.content.length > 12000) {
        return res.status(400).json({ error: "A message is invalid or too long." });
      }
      safeMessages.push({ role: message.role, content: message.content });
    }

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5",
      instructions: "You are Langur AI, a helpful, clear, respectful assistant. Reply in the language the user uses when practical.",
      input: safeMessages
    });

    return res.json({ reply: response.output_text || "I couldn't generate a response. Please try again." });
  } catch (error) {
    console.error("Chat API error:", error?.message || error);
    return res.status(500).json({ error: "The AI service could not complete the request. Please try again." });
  }
});

app.listen(port, () => {
  console.log(`Langur AI running at http://localhost:${port}`);
});
