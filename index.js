function generateLetter() {
  const form = document.getElementById('letterForm');
  const letterContent = document.getElementById('letter-content');
  const formData = new FormData(form);
  //console.log(formData)
  const subjectLine = formData.get("subject");
  let letterHtml = `
  <div id="sender" class="flex-col">
  <div>${formData.get('your-name')}</div>
  <div>${formData.get('your-address')}</div>
  <div>${formData.get('your-city')}, ${formData.get('your-state')} ${formData.get('your-zip')}</div>
  <div>${formData.get('email')}</div>
  <div>${formData.get('phone')}</div>
  </div>
  <div >${formData.get('date')}</div>
  <div id="recipient" class="flex-col">
  <div >${formData.get('recipient-name')}</div>
  <div>${formData.get('recipient-title')}</div>
  <div>${formData.get('company')}</div>
  <div>${formData.get('company-address')}</div>
  <div>${formData.get('company-city')}, ${formData.get('company-state')} ${formData.get('company-zip')}</div>
  </div>
  <div id="subject-line">Subject:<u> ${formData.get('subject')}</u></div>
  <div style="font-weight:bold">Dear ${formData.get('recipient-name')},</div>
  <div id="form-body" class="flex-col">
  <div >${formData.get('introduction')}</div>
  <div >${formData.get('body1')}</div>
  ${formData.get('body2').trim()? `<div>${formData.get('body2')}</div>`: "" }
  ${formData.get('body3').trim()? `<div>${formData.get('body3')}</div>`: "" }
  ${formData.get('conclusion').trim()? `<div>${formData.get('conclusion')}</div>`: "" }
  </div>
  <div class="flex-col">
  <div>Sincerely,</div>
  <br>
  <div>${formData.get('your-name')}</div>
  <div>${formData.get('your-title')}</div>
  </div>
  `;
  document.head.querySelector("title").text=`Letter - ${subjectLine} | Formal Letter Template`;
  letterContent.innerHTML = letterHtml;
  const printBtn = document.createElement("button");
  printBtn.id="print-btn";
  printBtn.innerText="Print";
  letterContent.appendChild(printBtn);
  printBtn.addEventListener("click", ()=>{window.print()})
}
function scrollTo(target){
  target.scrollIntoView();
}
document.getElementById("letterForm").addEventListener('submit', (e)=>{
  e.preventDefault();
  generateLetter();
  const target = document.getElementById("letter-content");
  scrollTo(target)
})