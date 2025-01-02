import exampleData from "./assets/exampleData";


const exampleBtn = document.querySelector('.ex-btn')
const sidebar = document.querySelector('.side-bar')
const exampleContainer = document.querySelector('.example-container')
const overlay = document.querySelector('.overlay');
const example = document.querySelector('.example');
let isDisplayed = false
let exampleLetterData = null
exampleBtn.addEventListener("click", function () {
  if (!isDisplayed) {
    displayExample()
    isDisplayed = true
  }

  console.log('example is ready');
  sidebar.style.translate = "0"
  overlay.style.display = "block"
  overlay.addEventListener("click", function () {
    overlay.style.display = "none"
    sidebar.style.translate = "100%"
  })

});
function closeSideBar() {
  sidebar.style.translate = "100%"
  overlay.style.display = "none"
}

function displayExample() {
  exampleContainer.innerHTML = " "
  exampleData.forEach(function (data) {
    console.log(data);
    exampleContainer.innerHTML += `
        <div data-id=${data.id} class="example"> 
        <h4> ${data.name}</h4>
        <div class="dis">
          <p>${data.description}</p>
        </div>
      </div>`

  })
  console.log(exampleContainer.children);
  const children = exampleContainer.children
  for (let i = 0; i < children.length; i++) {
    console.log(children[i]);
    children[i].addEventListener("click", (e) => {
      closeSideBar()
      fetchLetterData(children[i])

    })
  }

}
function fetchLetterData(target) {
  let id;
  let letterPrompt;
  if (exampleLetterData == null) {
    fetch("./exampleLetterData.json")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        exampleLetterData = data
        id=target.dataset.id
        letterPrompt=findData(id)
        insertValues(letterPrompt)
      })
      .catch((error) => console.log(error));
  }
  else {
   id=target.dataset.id
   letterPrompt=findData(id)
    insertValues(letterPrompt)
  }
}
function findData(id){
  console.log("findData");
  let temp;
  exampleLetterData.forEach(element => {
    console.log(element);
    if (element.id==id) {
      temp=element.data;
    }
  });
  return temp
}
function insertValues(letterData) {
  const d=new Date()
  for (const key in letterData) {
    const field = document.getElementById(key.toString());
    if (key==="date") {
      let year=d.getFullYear()
      let month=d.getMonth()+1
      let date=d.getDate()
      month= (month<10)?"0"+month:month
      date=(date<10)?"0"+date:date
      field.value= `${year}-${month}-${date}`
    }else{
      field.value = letterData[key];
    }
    
  }

  console.log(letterData,"letterdata");
  
  localStorage.setItem("lastLetterData", JSON.stringify(letterData))
}

/*  
  
*/