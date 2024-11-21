import MarkdownIt from "markdown-it";
import addSkelaton from "./skeleton";
const md = new MarkdownIt();
let formDataObj = {};
const form = document.getElementById("letterForm");
const inputFields = form.querySelectorAll("input");
const textFields = form.querySelectorAll("textarea");
const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

(() => {
  const storedTimestamp = localStorage.getItem('timestamp');
  const currentTimestamp = Date.now();
  if(!storedTimestamp ||  currentTimestamp-storedTimestamp > 300000){
    startServer();
  }
})();
(function checkPrevLetter() {
  const letterFromLocalStore = localStorage.getItem("lastLetterData");
  const lastLetter = localStorage.getItem("lastLetter");
  console.log(lastLetter)
 
  console.log(letterFromLocalStore);
  if (letterFromLocalStore) {
    formDataObj = JSON.parse(letterFromLocalStore);
    insertValues();
  }

  if(lastLetter){
    const letterContent = document.getElementById("letter-content");
    const content = getContent(JSON.parse(lastLetter).content);
    generateLetter(content, letterContent);
  }
})();

// start the server
async function startServer() {
  fetch(BASE_URL + "/start")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse JSON response
    })
    .then((data) => {
      localStorage.setItem('timestamp', Date.now());
      console.log("Response from server:", data);
    })
    .catch((error) => {
      console.error("Error fetching /start:", error);
    })
}
async function sendData(promptObj) {
  try {
    const response = await fetch(BASE_URL+"/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ promptObj }),
    });
    console.log(response);
    if (!response.ok) {
      alert("Something went wrong!");
      throw "Something went wrong";
    }
    const result = await response.json();
    console.log("Server response:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

function insertValues() {
  for (const key in formDataObj) {
    const field = document.getElementById(key.toString());
    field.value = formDataObj[key];
  }
}
function addEvtBlur(elem) {
  elem.forEach((field) => {
    field.addEventListener("blur", (e) => {
      formDataObj[e.target.id] = e.target.value;
      console.log(formDataObj);
      localStorage.setItem("lastLetterData", JSON.stringify(formDataObj));
    });
  });
}
addEvtBlur(inputFields);
addEvtBlur(textFields);
function generateLetter({ subjectLine, body, start, end }, letterContent) {
  console.dir(letterContent.parentElement)
  letterContent.parentElement.style.display="block"
  const letterStart = letterContent.querySelector("#start");
  const letterBody = letterContent.querySelector("#body");
  const letterEnd = letterContent.querySelector("#end");

  document.head.querySelector("title").text = `Letter - ${subjectLine}| Formal Letter Template`;
  const htmlContent = md.render(`**Subject : ${subjectLine.trim()}**`);
  letterStart.innerHTML = `${md.render(start)} ${htmlContent}`;
  letterBody.innerHTML = md.render(body);
  letterEnd.innerHTML = md.render(end);
  addEditBtn(letterBody);
  if (!document.getElementById("print-btn")) {
    const printBtn = document.createElement("button");
    printBtn.id = "print-btn";
    printBtn.innerText = "Print";
    letterContent.append(printBtn);
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}
function scrollTo(target) {
  target.scrollIntoView({ behavior: "smooth" });
}
const letterForm = document.getElementById("letterForm")

letterForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const letterContent = document.getElementById("letter-content");
  letterContent.remove();
  const target = document.getElementById("letter");
  target.style.display = "block";

  const skeleton = addSkelaton(target);
  scrollTo(target);
  const result = await sendData(formDataObj);
  if (!result.success) {
    skeleton.remove();
    target.style.display = "none";
    alert("Somthing went wrong");
    throw `Error : ${result.errorMessage}`;
  }

  saveGeneratedLetter(result)
  //adding removed letter content
  target.appendChild(letterContent);
  //removing skelaton loader
  skeleton.remove();
  const content = getContent(result.content)
  generateLetter(content, letterContent);
  scrollTo(target);
});

function getContent(content) {
  const letter = {};
  console.log("from content, ", content);
  // subject
  const subjectMarker = content.match(/-{1,}subject-{1,}/i);
  letter.subjectLine = getSlice(content, subjectMarker[0], subjectMarker.index);
  letter.start = getSlice(content, subjectMarker[0], subjectMarker.index, true);

  //extracting body of letter
  const bodyMarker = content.match(/-{1,}body-{1,}/i);
  letter.body = getSlice(content, bodyMarker[0], bodyMarker.index);
  letter.end = getSlice(content, bodyMarker[0], bodyMarker.index, false, true);

  return letter;
}

function getSlice(str, marker, start, getStart = false, getEnd = false) {
  if (!getStart && !getEnd) {
    const end = str.lastIndexOf(marker);
    return str.slice(start + marker.length + 1, end - 1);
  } else if (getStart) {
    return str.slice(0, start);
  } else if (getEnd) {
    return str.slice(str.lastIndexOf(marker) + marker.length);
  }
}
function saveGeneratedLetter(result){
  localStorage.setItem("lastLetter", JSON.stringify(result))
}




function editContent(element, editBtn) {
  const text = element.innerText;
  const textArea = document.createElement("textarea");
  textArea.rows = "10";
  textArea.value = text;
  textArea.addEventListener("blur", (e) => {
    element.innerHTML = md.render(e.target.value);
    e.target.replaceWith(element);
    element.appendChild(editBtn);
  });
  element.replaceWith(textArea);
  textArea.focus();
  console.dir(element);
}

function addEditBtn(letterBody) {
  const btn = document.createElement("button");
  btn.id = "edit-btn";
  btn.innerText = "Edit";
  btn.addEventListener("click", () => {
    btn.remove();
    editContent(letterBody, btn);
  });
  letterBody.appendChild(btn);
}


