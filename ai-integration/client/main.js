import MarkdownIt from "markdown-it";
const md = new MarkdownIt();
let formDataObj = {};
const form = document.getElementById('letterForm');
const inputFields = form.querySelectorAll("input");
const textFields = form.querySelectorAll("textarea");

async function sendData(prompt) {
  try {
      const response = await fetch('http://localhost:5000/api/data', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({prompt})
      });
      const result = await response.json();
      console.log('Server response:', result);
      return result;
  } catch (error) {
      console.error('Error:', error);
  }
  
}





(function checkPrevLetter(){
  const letterFromLocalStore = localStorage.getItem('lastLetter');
  console.log(letterFromLocalStore);
  if(letterFromLocalStore){
    formDataObj=JSON.parse(letterFromLocalStore);
    // insertValues(textFields);
    // insertValues(inputFields);
    insertValues();
  }

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
function generateLetter(result) {
  const letterContent = document.getElementById('letter-content');
 
  document.head.querySelector("title").text=`Letter | Formal Letter Template`;
  const htmlContent = md.render(result);
  console.log(htmlContent)
  letterContent.innerHTML = htmlContent;
  const printBtn = document.createElement("button");
  printBtn.id="print-btn";
  printBtn.innerText="Print";
  letterContent.append(printBtn);
  printBtn.addEventListener("click", ()=>{window.print()})
}
function scrollTo(target){
  target.scrollIntoView({behavior:'smooth'});
}
document.getElementById("letterForm").addEventListener('submit', async (e)=>{
  e.preventDefault();
  const detailsWithPrompt = getPrompt();
 const  result = await sendData(detailsWithPrompt);
  generateLetter(result.content);
  const target = document.getElementById("letter-content");
  scrollTo(target)
})


function getPrompt(){
  const data= [];
  for(const key in formDataObj){
    data.push([`${key} : ${formDataObj[key]}`])
  }
  console.log("prompt data",data)
  return data.join(" ");
}
