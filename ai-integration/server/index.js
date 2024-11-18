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
  console.log(data);
  const prompt = getPrompt(data.promptObj)
  const result = await generateLetter(prompt);
  if (typeof result != "string") {
    return res.status(result.status).json({
      success: false,
      message: "Something went wrong",
      errorMessage: result?.errorDetails[1]?.message,
    });
  }
  const content = getContent(result);
  res.status(200).json({ success: true, content });
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
      return result;
    }
    const data = result.response.text();
    console.log("Success..", data);
    return data;
  } catch (err) {
    console.log("Something went wrong!", err);
    return err;
  }
}

function getContent(content) {
  const letter = {};
  console.log("from content, ", content);
  // subject
  const subjectMarker = content.match(/-{1,}subject-{1,}/i);
  letter.subjectLine = getSlice(content, subjectMarker[0], subjectMarker.index);
  letter.start = getSlice(content, subjectMarker[0], subjectMarker.index, true);

  //extracting body of letter
  const bodyMarker = content.match(/-{1,}body-{1,}/i);
  letter.body = getSlice(content, bodyMarker[0], bodyMarker.index);
  letter.end = getSlice(content, bodyMarker[0], bodyMarker.index, false, true);

  return letter;
}

function getSlice(str, marker, start, getStart = false, getEnd = false) {
  if (!getStart && !getEnd) {
    const end = str.lastIndexOf(marker);
    return str.slice(start + marker.length + 1, end - 1);
  } else if (getStart) {
    return str.slice(0, start);
  } else if (getEnd) {
    return str.slice(str.lastIndexOf(marker) + marker.length);
  }
}
