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

let objList, id;

//assigning variable to data retrieved from localStorage
let data = localStorage.getItem("TODO");

// function loadObjList -loads list of items that is retrived from localStorage
function loadObjList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}
//checking if there are any data that are stored locally
if (data) {
  objList = JSON.parse(data);
  id = objList.length; //określamy jakie id będzie mieć kolejny dodany element sprawdzając długość tablicy
  loadObjList(objList); //załadowanie listy po odświeżeniu strony na podstawie danych pobranych ze schowka
} else {
  //jeśli schowek jest pusty- ustawiamy zmienną objList jako tablicę, a wartość id na równą 0
  objList = [];
  id = 0;
}


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
  //jeśli element znajduje się w koszu pozostała część kodu się nie wykona
  if (trash) {
    return;
  }

  const isDone = done ? check : uncheck;
  const line = done ? lineThrough : "";

  const item = `
                <li class="item">
                    <i class="far ${isDone} co" job="complete" id="${id}"></i>
                    <p class="text ${line}">${toDo}</p>
                    <i class="far fa-trash-alt de" job="delete" id="${id}"></i>
                </li>
                `;
  const postion = "beforeend";

  list.insertAdjacentHTML(postion, item);
}

// entered input validation -if entered item is valid eg. is not an empty string its added locally to objList and then to localStorage

function validate() {
  const toDo = input.value.trim(); // using 'trim' to make sure that user didn't enter just whitespaces
  //and whether now current value of 'toDo' is not equal to an empty string
  if (toDo !== "") {
    addToDo(toDo, id, false, false);
    objList.push({
      name: toDo,
      id: id,
      done: false,
      trash: false,
    });

    //current value of 'objList' variable is added to localStorage
    localStorage.setItem("TODO", JSON.stringify(objList));

    id++;
  }
  input.value = "";
}

//dodawanie elementu do listy po wciśnięciu 'Enter'

document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    validate();
  }
});

//dodanie obsługi eventa dla ikony plusa

btnPlus.addEventListener("click", function () {
  validate();
});

//funkcja completeToDo->zmiana klas po zaznaczeniu "tick'a" przy pozycji na liście

function completeToDo(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);

  if (objList[element.id].done == true) {
    return objList[element.id].done == false;
  } else {
    return objList[element.id].done == true;
  }
}

//funkcja removeToDo-> usunięcie elemntu z listy użytkownika

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  objList[element.id].trash = true;
}

//dodanie addEventListener'a do dynamicznie tworzonych elementów listy

list.addEventListener("click", function (event) {
  const element = event.target; //zwraca kliknięty element wewnatrz listy
  const elementJob = element.attributes.job.value; //pobranie atrybutu job elementu: complete || delete

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  //dodawanie elementów do schowka (kod dodawany w każdym miejscu gdzie dopisywane są dane do tablicy z elementami listy)
  localStorage.setItem("TODO", JSON.stringify(objList));
});
