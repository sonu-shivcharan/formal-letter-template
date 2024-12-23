# AI-Powered Formal Letter Generator  

**Formal Letter Generator** is a tool designed to help students easily create formal letters for educational purposes, such as leave applications or permission letters. Initially developed as a simple template-based solution, it has now evolved into an AI-integrated application that generates letters based on user prompts, powered by the **Gemini API**.  

## Features  
### Version 1: Template-Based Letter Formatting  
- **Folder:** `vite-project`  
- Allows users to input details and letter content manually to generate a well-formatted letter.  

### Version 2: AI-Integrated Letter Generator  
- **Folder:** `ai-integration`  
- Generates formal letters using AI by processing user prompts.  
- Utilizes the **Gemini 1.5 Flash Model** for enhanced letter generation.  
- Backend protected by CORS policy for security.  

---

## Target Audience  
This tool is designed for **students** who frequently need to write formal letters for educational purposes. By leveraging AI, it simplifies the task of writing repetitive letters, saving time and effort.  

---

## Prerequisites  
Ensure you have **Node.js** and **npm** installed on your system.  

---

## Installation and Usage  

### Version 1: Template-Based Version  
1. Navigate to the folder:  
   ```bash
   cd vite-project
   ```  
2. Install dependencies:  
   ```bash
   npm install
   ```  
3. Start the development server:  
   ```bash
   npm run dev
   ```  
4. Open the application in your browser to create formatted letters.  

### Version 2: AI-Integrated Version  
#### Client (Frontend):  
1. Navigate to the client folder:  
   ```bash
   cd ai-integration/client
   ```  
2. Install dependencies:  
   ```bash
   npm install
   ```  
3. Start the development server:  
   ```bash
   npm run dev
   ```  

#### Server (Backend):  
1. Navigate to the server folder:  
   ```bash
   cd ai-integration/server
   ```  
2. Install dependencies:  
   ```bash
   npm install
   ```  
3. Start the server:  
   ```bash
   nodemon index.js
   ```  

---

## Environment Variables  
### Server (`ai-integration/server`):  
- `GEN_AI_API_KEY`: Your Gemini API key (create one at Gemini AI Studio).  
- `FRONTEND_URL`: The frontend URL (use `http://localhost:5173` during development).  

### Client (`ai-integration/client`):  
- `VITE_APP_BACKEND_URL`: Backend server URL (use `http://localhost:5000` during development).  

---

## Hosting  
### Upgraded Version:  
- **Frontend:** Hosted on Vercel.  
  [Live Demo](https://ai-letter-template.vercel.app)  
- **Backend:** Hosted on Render.  

### Old Version:  
- **Frontend:** Hosted on Netlify.  
  [Live Demo](https://letter-template.netlify.app)  

---

## Future Improvements  
- Upgrade the frontend of version 2 to a modern UI using **React.js** for better user experience.  

---

## Contributors  
- **Sonu Shivcharan** (Main Account): [sonu-shivcharan](https://github.com/sonu-shivcharan)  
- **Sonu Shivcharan (Secondary Account):** [sonu-dpu](https://github.com/sonu-dpu)  

---

## Notes  
This project leverages modern web technologies and AI to make letter generation seamless for students. Contributions and feedback are welcome to further enhance its capabilities.  

