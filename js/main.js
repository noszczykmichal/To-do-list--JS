//pobieram elementy do zmiennych
const clear=document.querySelector(".clear");
const dateElem=document.getElementById("date");
const list=document.getElementById("list");
const input=document.getElementById("input");

// zmienne class'y

const check="fa-check-circle";
const uncheck="fa-circle";
const lineThrough="lineThrough";

//zmienne
let objList=[];
let id=0;

//wyświetlanie aktualnej daty
const options= {weekday:"short", month:"long", day:"numeric"}
const today= new Date();

dateElem.innerHTML=today.toLocaleDateString("pl-PL", options)

//funkcja addToDo

function addToDo (toDo, id, done, trash){
    //jeśli element znajduje się w koszu pozostała część kodu się nie wykona
    if(trash){return;}

    const isDone=done? check : uncheck;
    const line=done? lineThrough : ""; 

    const item=`
                <li class="item">
                    <i class="far ${isDone} co" job="complete" id="${id}"></i>
                    <p class="text ${line}">${toDo}</p>
                    <i class="far fa-trash-alt de" job="delete" id="${id}"></i>
                </li>
                `;
    const postion="beforeend";

    list.insertAdjacentHTML(postion, item);
}

//dodawanie elementu do listy po wciśnięciu 'Enter'

document.addEventListener('keyup', function(event){
    if(event.keyCode==13){
        const toDo=input.value;
        //sprawdzamy czy z inputa nie jest przekazywana pusty string
        if(toDo){
            addToDo(toDo, id, false, false);
            objList.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,

            });

            id++;
        }
        input.value="";
    }
    
})

addToDo("Kawa", 1, false, true);



