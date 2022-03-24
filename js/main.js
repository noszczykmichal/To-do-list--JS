//assigning elements from DOM to variables
const clear = document.querySelector(".clear");
const dateElem = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const btnPlus = document.querySelector("[class*=fa-plus-circle]");
const time = document.getElementById("time");

// utility classes
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "lineThrough";

let objList;

//assigning variable to data retrieved from localStorage
let data = localStorage.getItem("TODO");

function loadObjList() {
  //checking if there are any data that are stored locally
  if (data) {
    objList = JSON.parse(data);
    objList.forEach(item =>
      addToDo(item.name, item.id, item.done, item.trash)
    );
  } else {
    objList = []; //if there is none an empty array is assigned
  }
}

loadObjList();//initial list load

//clearing of localStorage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//display of current date
const options = { weekday: "short", month: "long", day: "numeric" };
const today = new Date();

dateElem.innerHTML = today.toLocaleDateString("pl-PL", options);

//and time
function whatTime() {
  const hour = new Date().toLocaleTimeString("pl-PL");
  return (time.innerHTML = hour);
}

setInterval(whatTime, 1000);

function addToDo(toDo, id, done, trash) {
  //if element is in trash it won't be rendered to the DOM
  if (trash) {
    return;
  }

  const isDone = done ? check : uncheck;
  const line = done ? lineThrough : "";

  const item = `
                <li class="item" id="${id}">
                    <i class="far ${isDone} co" job="complete"></i>
                    <p class="text ${line}">${toDo}</p>
                    <i class="far fa-trash-alt de" job="delete"></i>
                </li>
                `;

  list.insertAdjacentHTML("beforeend", item);
}

//entered input validation -if entered item is valid (is not an empty string) it's added locally to the objList and then to the localStorage
function validate() {
  const toDo = input.value.trim(); // using 'trim' to make sure that user didn't enter just whitespaces
  //and whether now current value of 'toDo' is not equal to an empty string
  if (toDo !== "") {
    const id = Math.random().toString();
    addToDo(toDo, id, false, false);
    objList.push({
      name: toDo,
      id: id,
      done: false,
      trash: false,
    });

    //current value of 'objList' variable is added to localStorage
    localStorage.setItem("TODO", JSON.stringify(objList));
  }
  input.value = "";
}

//entered input will be added to the list after hitting 'Enter' button
document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    validate();
  }
});

//addEventListener for the 'plus' icon
btnPlus.addEventListener("click", function () {
  validate();
});

//function completeToDo-> toggling classes for list elements(done/ not done)
function completeToDo(element, parentElemId) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  objList
    .filter((item) => item.id === parentElemId)
    .map((item) => (item.done = !item.done));
}

//function removeToDo-> for removing list element after clicking on 'trash' icon + updating data in objList
function removeToDo(parentElemId) {
  const listEl = document.getElementById(parentElemId);
  objList.map((item) =>
    item.id === parentElemId ? (item.trash = true) : null
  );
  list.removeChild(listEl);
}

list.addEventListener("click", function (event) {
  const element = event.target; 
  const elementJob = element.attributes.job.value; //getting the value of element's 'job' attribute: complete || delete
  const parentElemId = element.parentNode.getAttribute("id");

  if (elementJob === "complete") {
    completeToDo(element, parentElemId);
  } else if (elementJob === "delete") {
    removeToDo(parentElemId);
  }

  //updating data stored in the localStorage
  localStorage.setItem("TODO", JSON.stringify(objList));
});
