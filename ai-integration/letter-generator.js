import { GoogleGenerativeAI, HarmBlockThreshold } from "@google/generative-ai";
import MarkdownIt from "markdown-it";

async function test(){
    const genAI = new GoogleGenerativeAI(process.env.VITE_API_KEY);
    const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"});
    const prompt = "Write a letter to principle, for leave of 10days, only write body, dont write other content like salutation and yours, and when i send ";
    try{
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    }catch(err){
        console.log(err);
    }

}
export default test;