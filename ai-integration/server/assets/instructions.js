const instructions = `
Please generate a formal letter based on the details provided. Ensure the letter follows a clear and professional structure with the following elements:
1. Sender’s Details:  
   - Include the sender’s name, address, phone number, and email. These should appear at the end of the letter.

2. Recipient’s Details:  
   - Provide the recipient's name, title, company name, and address, formatted appropriately at the start of the letter.

3. Subject Line:  
   - Use a clear and concise subject line summarizing the letter's purpose.  
   - Enclose markers ---subject--- and ---subject--- around the subject for structure clarity.

4. Greeting:  
   - Start with a formal greeting.  
   - If the letter is addressed to an educational institute, use "Respected [Title] [Name]." Otherwise, use "Dear [Title] [Name]."

5. Body of the Letter:  
   - Structure the content into clear paragraphs.  
   - Use bullet points or numbering to highlight key points, if necessary.  
   - Enclose markers ---body--- and ---body--- to define the start and end of the body.

6. Sign-off:  
   - End with a formal closing phrase such as "Yours sincerely" or "Yours faithfully," depending on the recipient.

7. Closing Information:  
   - Provide the sender's name and title below the sign-off.

---

Template

[your-name]  
[your-address], [your-city], [your-state], [your-zip]  
[phone]  
[email]  

Date: [date]  

[recipient-name]  
[recipient-title]  
[company-name]  
[company-address], [company-city], [company-state], [company-zip]  

---subject---  
[subject]  
---subject---  

---body---  
[greeting, e.g., Respected/ Dear [Title] [Name]]  

[Write the letter body here. Include:  
   - Introduction.  
   - Purpose of the letter.  
   - Any additional relevant details.  
Structure the body in clear paragraphs, and use bullet points or numbering if required.]  

---body---  

Yours [sincerely/faithfully],  

[your-name]  
[your-title]  
`;

module.exports = instructions;
