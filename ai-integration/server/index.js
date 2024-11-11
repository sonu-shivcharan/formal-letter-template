const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEN_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const instructions = `
  Generate a formal letter based on the details provided. Follow a structured format with the sender’s details, recipient’s details, subject line, greeting, body, and closing. Use bold for the subject line and necessary headings. The letter should be clear, professional, and ready to use as a final draft.

  The recipient’s address should be the company address. Include the sender's contact information at the end.


  [Your Name]
  [Your Address], [Your City], [Your State], [Your ZIP]
  [Your Phone Number]
  [Your Email]
  
  Date: [Date]

  [Recipient Name]
  [Recipient Title]
  [Company Name]
  [Company Address], [Company City], [Company State], [Company ZIP]
  
  Subject: [Subject]
  
  Greeting:
  Dear [Recipient Title] [Recipient Name],
  

  [Write the body of the letter here, including the introduction, purpose, and any other relevant details.]

  Sincerely,
  [Your Name]
  
  Phone: [Your Phone Number]
  Email: [Your Email]
  `;

async function generateLetter(prompt) {
  try {
    const result = await model.generateContent([prompt, instructions]);
    const data = result.response.text();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return `Error Something wenrt wrong ${err}`;
  }
}
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Define a simple route to handle data
app.post("/api/data", async (req, res) => {
  const data = req.body;
  console.log(data);
  const content = await generateLetter(data.prompt);
  res.json({ message: "Data received", content });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
