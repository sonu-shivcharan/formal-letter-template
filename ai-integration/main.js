import test from "./letter-generator";

let formDataObj = {};
const form = document.getElementById('letterForm');
const inputFields = form.querySelectorAll("input");
const textFields = form.querySelectorAll("textarea");

(function checkPrevLetter(){
  const letterFromLocalStore = localStorage.getItem('lastLetter');
  console.log(letterFromLocalStore);
  if(letterFromLocalStore){
    formDataObj=JSON.parse(letterFromLocalStore);
    // insertValues(textFields);
    // insertValues(inputFields);
    insertValues();
  }
  test();
})();

function insertValues(){
  for(const key in formDataObj){
    const field = document.getElementById(key.toString());
    field.value=formDataObj[key];
  }
}
function addEvtBlur(elem){
  elem.forEach((field)=>{
    field.addEventListener("blur", (e)=>{
      formDataObj[e.target.id] = e.target.value;
      console.log(formDataObj);
      localStorage.setItem('lastLetter', JSON.stringify(formDataObj));
    })
  })
}
addEvtBlur(inputFields);
addEvtBlur(textFields);
function generateLetter() {
  const letterContent = document.getElementById('letter-content');
  const formData = new FormData(form);
  // for (const [key, value] of formData) {
  //   formDataObj[key] = value;
  // }
  const subjectLine = formDataObj["subject"];
  let letterHtml = `
  <div id="sender" class="flex-col">
  <div>${formDataObj['your-name']}</div>
  <div>${formDataObj['your-address']}</div>
  <div>${formDataObj['your-city']}, ${formDataObj['your-state']} ${formDataObj['your-zip']}</div>
  <div>${formDataObj['email']}</div>
  <div>${formDataObj['phone']}</div>
  </div>
  <div>${formDataObj['date']}</div>
  <div id="recipient" class="flex-col">
  <div>${formDataObj['recipient-name']}</div>
  <div>${formDataObj['recipient-title']}</div>
  <div>${formDataObj['company']}</div>
  <div>${formDataObj['company-address']}</div>
  <div>${formDataObj['company-city']}, ${formDataObj['company-state']} ${formDataObj['company-zip']}</div>
  </div>
  <div id="subject-line">Subject:<u> ${formDataObj['subject']}</u></div>
  <div style="font-weight:bold">Dear ${formDataObj['recipient-name']},</div>
  <div id="form-body" class="flex-col">
  <div >${formDataObj['introduction']}</div>
  <div >${formDataObj['body1']}</div>
  ${formDataObj['body2']? `<div>${formDataObj['body2']}</div>`: "" }
  ${formDataObj['body3']? `<div>${formDataObj['body3']}</div>`: "" }
  ${formDataObj['conclusion']? `<div>${formDataObj['conclusion']}</div>`: "" }
  </div>
  <div class="flex-col">
  <div>Sincerely,</div>
  <br>
  <div>${formDataObj['your-name']}</div>
  <div>${formDataObj['your-title']? formDataObj['your-title']:""}</div>
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
  target.scrollIntoView({behavior:'smooth'});
}
document.getElementById("letterForm").addEventListener('submit', (e)=>{
  e.preventDefault();
  generateLetter();
  const target = document.getElementById("letter-content");
  scrollTo(target)
})
