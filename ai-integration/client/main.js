

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
  } catch (error) {
      console.error('Error:', error);
  }
  return result;
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
sendData();
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
  letterContent.innerHTML = result;
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
document.getElementById("letterForm").addEventListener('submit', async (e)=>{
  e.preventDefault();
 const  result = await sendData();
  generateLetter(result);
  const target = document.getElementById("letter-content");
  scrollTo(target)
})
