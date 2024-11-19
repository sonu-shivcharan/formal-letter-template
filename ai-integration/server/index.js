const express = require("express");
const cors = require("cors");
require("dotenv").config();
const instructions = require("./assets/instructions");
const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEN_AI_API_KEY);
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: instructions,
  safetySettings: safetySettings
});

const app = express();
const PORT = 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL  // Replace with your frontend URL
  })
);

app.use(express.json());

// Define a simple route to handle data
app.post("/api/data", async (req, res) => {
  const data = req.body;

  console.log("Received data:", data);
  try {
    const prompt = getPrompt(data.promptObj);
    const result = await generateLetter(prompt);

    if (typeof result !== "string") {
      return res.status(result?.status || 500).json({
        success: false,
        message: "Something went wrong during letter generation.",
        errorMessage: result?.errorDetails?.[1]?.message || "Unknown error",
      });
    }
    res.status(200).json({ success: true, content: result});
  } catch (error) {
    console.error("Unexpected error:", error.message, error.stack);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      errorMessage: error.message,
    });
  }
});

app.get("/start", async (req, res) => {
  try {
    console.log("Starting...");
    res.json({ success: true, message: "Server started" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Server failed to start" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

function getPrompt(obj){
  let prompt= "";
  for(let key in obj){
    if(key!=="prompt") prompt+= `${key} : ${obj[key]}\n`
  }
  prompt+=`\n ${obj["prompt"]}\n`
  return prompt;
}

async function generateLetter(prompt) {
  try {
    const result = await model.generateContent(prompt);

    if (!result?.response) {
      console.error("Invalid response format:", result);
      return result;
    }

    const data = result.response.text(); 
    console.log("Letter generation successful:", data);
    return data;
  } catch (err) {
    console.error("Error during letter generation:", err.message, err.stack);
    return { status: 500, errorDetails: [{ message: err.message }] };
  }
}


