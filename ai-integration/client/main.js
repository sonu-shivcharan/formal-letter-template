import MarkdownIt from "markdown-it";
const md = new MarkdownIt();
let formDataObj = {};
const form = document.getElementById('letterForm');
const inputFields = form.querySelectorAll("input");
const textFields = form.querySelectorAll("textarea");

async function sendData(prompt) {
  try {
      const response = await fetch(import.meta.env.VITE_APP_BACKEND_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({prompt})
      });
      // if(!response.ok){
      //    throw "Something went wrong";
      // }
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
function generateLetter({subjectLine, body, start, end}) {
  const letterContent = document.getElementById('letter-content');
  const letterStart = letterContent.querySelector("#start");
  const letterBody = letterContent.querySelector("#body");
  const letterEnd = letterContent.querySelector("#end");

  document.head.querySelector("title").text=`Letter - ${subjectLine.match(/[^*]+/g)[0]}| Formal Letter Template`;
  const htmlContent = md.render(`**${subjectLine}**`)
  letterStart.innerHTML= `${md.render(start)} ${htmlContent}`;
  letterBody.innerHTML = md.render(body);
  letterEnd.innerHTML = md.render(end);
  addEditBtn(letterBody);

  console.log(htmlContent)
  // letterContent.innerHTML = md.render(start)+htmlContent;
  if(!document.getElementById("print-btn")){
  const printBtn = document.createElement("button");
  printBtn.id="print-btn";
  printBtn.innerText="Print";
  letterContent.append(printBtn);
  printBtn.addEventListener("click", ()=>{window.print()})
  }
}
function scrollTo(target){
  target.scrollIntoView({behavior:'smooth'});
}
document.getElementById("letterForm").addEventListener('submit', async (e)=>{
  e.preventDefault();
  const letterBody = document.querySelector("#letter-content #body")
  letterBody.innerHTML =`<div id="loader">Generating...</div>` ;
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
  return data.join(" ");
}

function editContent(element, editBtn){
  const text = element.innerText;
  const textArea = document.createElement('textarea')
  textArea.rows='10';
  textArea.value=text;
  textArea.addEventListener('blur', (e)=>{
    element.innerHTML = md.render(e.target.value);
    e.target.replaceWith(element);
    element.appendChild(editBtn)
  })
  element.replaceWith(textArea)
  textArea.focus()
  console.dir(element)
}

function addEditBtn(letterBody){
  const btn =  document.createElement('button');
  btn.id="edit-btn"
  btn.innerText="Edit"
  btn.addEventListener('click', ()=>{
    btn.remove();
    editContent(letterBody, btn)
  })
  letterBody.appendChild(btn)
}



// Function to create and show the loader
function showLoader() {
  const loader = document.createElement('div');
  loader.id = 'loader';
  // Append the loader to the body
  document.body.appendChild(loader);
}
// Function to hide and remove the loader
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.remove();
  }
}