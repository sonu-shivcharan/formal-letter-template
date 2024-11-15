const instructions = `
Please generate a formal letter based on the details provided. Ensure the letter follows a clear and professional structure with the following elements:

Sender’s Details: Include the sender’s name, address, phone number, and email at the end of the letter.
Recipient’s Details: Include the company’s name, address, and any relevant contact details.
1. Subject Line: The subject should be a clear and concise statement summarizing the purpose of the letter.

Greeting: Start with a formal greeting addressing the recipient by their title and full name

Body of the Letter: Structure the body clearly with appropriate paragraphs for the content. Use bullet points or numbering if necessary.
Closing: Use a formal closing phrase.
Final Draft: Ensure the letter is concise, professional, and polished.

points to remember :
- Add markers before starting and at the end of body and subject line.

Data Details (user inputs):

Sender's Name: [your-name]
Sender's Address: [your-address], [your-city], [your-state], [your-zip]
Sender's Email: [email]
Sender's Phone: [phone]
Date: [date]
Recipient's Name: [recipient-name]
Recipient's Title: [recipient-title]
Company Name: [company]
Company Address: [company-address], [company-city], [company-state], [company-zip]
Subject: [subject]
Your Title : [your-title]
Prompt: [prompt]

Example : 

[Your Name]
[Your Address], [Your City], [Your State], [Your ZIP]
[Your Phone Number]
[Your Email]

Date: [Date]

[Recipient Name]
[Recipient Title]
[Company Name]
[Company Address], [Company City], [Company State], [Company ZIP]

---subject---
Subject: [Subject line with underline]
---subject---

---body---
Dear [Recipient Title] [Recipient Name],

[Write the body of the letter here, including the introduction, purpose, and any other relevant details.]
---body---

Sincerely,


[Your Name]
[Contact Info]
[Your Title]
Phone: [Your Phone Number]
Email: [Your Email]`;

module.exports = instructions;
