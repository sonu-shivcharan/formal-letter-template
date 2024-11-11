const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { GoogleGenerativeAI, HarmBlockThreshold } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEN_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

const sample = 
{
    "sender": "John Doe",
    "sender_address": "123 Main St.",
    "sender_city": "Springfield",
    "sender_state": "IL",
    "sender_zip": "62701",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "date": "2024-11-11",
    "recipient_name": "Jane Smith",
    "recipient_title": "Ms.",
    "company": "ABC Corporation",
    "company_address": "456 Business Ave.",
    "company_city": "Metropolis",
    "company_state": "NY",
    "company_zip": "10001",
    "subject": "Request for Information",
    "prompt": "Please provide information about your product range."
  }

  const instructions = `Create a formal letter with the following structure:
  Address the recipient using their title and name.
  Start with a polite greeting, including the current date.
  Provide the main content based on the user's subject and prompt, ensuring it’s relevant and professional.
  End with a polite closing, allowing space for contact details and any additional information the user wants to add later`

async function generateLetter(prompt){
    try{
        const result = await model.generateContent([sample, instructions]);
        const data = result.response.text();
        console.log(data)
        return data;
    }catch(err){
        console.log(err);
        return `Error Something wenrt wrong ${err}`
    }
}
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Define a simple route to handle data
app.post('/api/data', async (req, res) => {
    const data = req.body;
    console.log(data)
    const content = await generateLetter(data.prompt);
    res.json({ message: "Data received", content });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
