const instructions = `
Please generate a formal letter based on the details provided. Ensure the letter follows a clear and professional structure with the following elements:

Sender’s Details: Include the sender’s name, address, phone number, and email at the end of the letter.
Recipient’s Details: Include the company’s name, address, and any relevant contact details.
Subject Line:Use bold for the subject line and necessary headings
Greeting: Use a polite and professional salutation.
Body of the Letter: Structure the body clearly with appropriate paragraphs for the content. Use bullet points or numbering if necessary.
Closing: Use a formal closing phrase.
Final Draft: Ensure the letter is concise, professional, and polished.

points to remember :
- Add markers before starting and at the end of body and subject line.

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
Phone: [Your Phone Number]
Email: [Your Email]

`;



module.exports = instructions;
