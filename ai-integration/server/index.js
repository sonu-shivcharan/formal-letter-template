const express = require("express");
const cors = require("cors");
require("dotenv").config();
const instructions = require("./assets/instructions")
const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEN_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL  // Replace with your frontend URL
}));

app.use(express.json());

// Define a simple route to handle data
app.post("/api/data", async (req, res) => {
  const data = req.body;
  console.log(data);
  const result = await generateLetter(data.prompt);
  const content = getContent(result)
  res.json({ message: "Data received", content });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


async function generateLetter(prompt) {
  try {
    const result = await model.generateContent([prompt, instructions]);
    const data = result.response.text();
    console.log('Success..');
    return data;
  } catch (err) {
    console.log(err);
    return `Error Something wenrt wrong ${err}`;
  }
}

function getContent(content){
  const letter={}
  console.log("from content, ", content)
  // subject 
  const subjectMarker = content.match(/-{1,}subject-{1,}/i)
  letter.subjectLine = getSlice(content, subjectMarker[0], subjectMarker.index);
  letter.start = getSlice(content,subjectMarker[0], subjectMarker.index, true)

  //extracting body of letter 
  const bodyMarker = content.match(/-{1,}body-{1,}/i);
  letter.body = getSlice(content, bodyMarker[0], bodyMarker.index)
  letter.end = getSlice(content,bodyMarker[0], bodyMarker.index, false, true);

  return letter;
}

function getSlice(str, marker, start, getStart=false, getEnd=false){

  if(!getStart && !getEnd){
  const end = str.lastIndexOf(marker);
    return str.slice(start+marker.length+1, end-1);
  }else if(getStart){
    return str.slice(0, start);
  }else if(getEnd){
    return str.slice(str.lastIndexOf(marker)+marker.length);
  }
}