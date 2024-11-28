import exampleData from "./assets/exampleData";


const exampleBtn = document.querySelector('.ex-btn')
const sidebar = document.querySelector('.side-bar')
const exampleContainer = document.querySelector('.example-container')
const overlay = document.querySelector('.overlay');
const example = document.querySelector('.example');
let isDisplayed=false
exampleBtn.addEventListener("click", function () {
  if(!isDisplayed){
    displayExample()
    isDisplayed=true
  }

    console.log('example is ready');
    sidebar.style.translate = "0"
    overlay.style.display = "block"
    overlay.addEventListener("click", function () {
        overlay.style.display = "none"
        sidebar.style.translate = "100%"
    })

});
function closeSideBar(){
sidebar.style.translate="100%"
overlay.style.display="none"
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
    const children=exampleContainer.children
    for (let i= 0; i< children.length; i++) {
       console.log( children[i] );    
       children[i].addEventListener("click",function(e){
        closeSideBar()
        console.log(children[i].dataset.id);
        fetch("./assets/exampleLetterData.json")
        .then(() {
          
        })
       })   
    }
    
}


/*  
  
*/