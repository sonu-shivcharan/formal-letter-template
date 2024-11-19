import MarkdownIt from "markdown-it";
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
// start the server
async function startServer() {
  fetch(BASE_URL + "/start", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse JSON response
    })
    .then((data) => {
      console.log("Response from server:", data);
    })
    .catch((error) => {
      console.error("Error fetching /start:", error);
    }).finally(()=>{
      localStorage.setItem('timestamp', Date.now());
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

(function checkPrevLetter() {
  const letterFromLocalStore = localStorage.getItem("lastLetterData");
  console.log(letterFromLocalStore);
  if (letterFromLocalStore) {
    formDataObj = JSON.parse(letterFromLocalStore);
    insertValues();
  }
})();

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
  const letterStart = letterContent.querySelector("#start");
  const letterBody = letterContent.querySelector("#body");
  const letterEnd = letterContent.querySelector("#end");

  document.head.querySelector("title").text = `Letter - ${
    subjectLine.match(/[^*]+/g)[0]
  }| Formal Letter Template`;
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
document.getElementById("letterForm").addEventListener("submit", async (e) => {
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
  //adding removed letter content
  target.appendChild(letterContent);
  //removing skelaton loader
  skeleton.remove();
  generateLetter(result.content, letterContent);
  scrollTo(target);
});

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

function generateSkeletonLoader(skeletonData) {
  // Iterate through the skeletonData array
  const container = document.createElement("div");
  container.classList.add("skeleton-loader");
  skeletonData.forEach((barGroup) => {
    const barContainer = document.createElement("div");
    barContainer.classList.add("bar-container");

    // For each bar in the group, create a skeleton-bar div
    barGroup.forEach((barType) => {
      const skeletonBar = document.createElement("div");
      skeletonBar.classList.add("skeleton-bar", barType);
      barContainer.appendChild(skeletonBar);
    });
    container.appendChild(barContainer);
  });
  return container;
}

function addSkelaton(target) {
  const skeletonData = [
    ["short", "short", "short"],
    ["medium", "long", "long"],
    ["long", "long", "long"],
    ["long", "long", "long"],
    ["long", "long", "long"],
    ["short", "short", "short"],
  ];
  const prevSkeleton = document.querySelector(".skeleton-loader");
  if (prevSkeleton) return prevSkeleton;
  const skeleton = generateSkeletonLoader(skeletonData);

  target.appendChild(skeleton);
  return skeleton;
}
