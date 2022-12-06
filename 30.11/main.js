// // JSON

const obj = {
    name: "Nicat", 
    surname: "Rzayev",
    age: 19
}

// let stringObj = JSON.stringify(obj)

// console.log(obj)
// console.log(stringObj)

// let objFromString = JSON.parse(stringObj)

// console.log("parse", objFromString)


// //session storage

// let btn = document.querySelector("button")

// let objTwo = {
//     name: "Ilkin",
//     surname: 'Qurbanov',
//     age: 20
// }

// btn.addEventListener("click", function(){
//     window.sessionStorage.setItem("obj2", JSON.stringify(objTwo))
//     console.log(window.sessionStorage.getItem("obj"))
// })

// window.sessionStorage.removeItem("obj")

// // local storage

// let removeBtn = document.querySelector("#remove")

// removeBtn.addEventListener("click", function(){
//     window.localStorage.removeItem("id")
// })

// window.localStorage.setItem("id", "fromLocal")

// console.log(window.localStorage.getItem("id"))


// form yarat. Name, Surname, Age, Username, Email, Gender(woman/man/other)
// bu data ile user object yarat ve localStorage set ele.
// Data-ni goturun object-e chevirib, console.log ele

// //task1
// const name = document.querySelector(".name")
// const surname = document.querySelector(".surname")
// const age = document.querySelector(".age")
// const username = document.querySelector(".username")
// const email = document.querySelector(".email")
// const genders = document.querySelectorAll("input[type=radio]")
// const form = document.querySelector("form")

// form.addEventListener("submit",function(e){
//     e.preventDefault();
//     let gender;
//     genders.forEach(element=>{
//         if (element.checked) {
//             gender=element.value
//         }
//     })
//     const user ={
//         name : name.value,
//         surname:surname.value,
//         email: email.value,
//         username : username.value,
//         age : age.value,
//         gender : gender
//     }
//     localStorage.setItem("user",JSON.stringify(user))
//     let getLocal = JSON.parse(localStorage.getItem("user"))
//     console.log(getLocal);
// })


// console.log(localStorage.getItem(localStorage.key(0)))

// for(let i = 0; i<localStorage.length; i++){
//     console.log(localStorage.key(i))
// }

// localStorage.clear()

// setCookie("user", JSON.stringify(obj), 2)

// eraseCookie("")

// console.log(document.cookie)

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}




// todo list 
// 1. deadline elave et
// 2. todo is done elave et
// 3. localStorage de saxla ve ordan getir (refersh olunanda ve tab baglananda itmesin)


// const todo = {
//     text: 
//     deadline: Date
//     isDone: true/false
// }


//todoTask

let textInput = document.querySelector("#text")
let dateInput = document.querySelector("#date")
let addBtn = document.querySelector("#add")
let deleteAllBtn = document.querySelector("#deleteAll")
let ul = document.querySelector("ul")
let col2 = document.querySelector(".col-2")


let todos = []

window.addEventListener("load", function(){
    if(localStorage.getItem("todos")){
        todos = JSON.parse(localStorage.getItem("todos"))
        todos.forEach(todo => createLi(todo))
    }
})

addBtn.addEventListener("click", function(){
    if(textInput == ""){
        return;
    }
    if(todos.some(x=> x.text == textInput.value)){
        alert("Todo already exists")
        textInput.innerText = ""
    }else{
        let todo = {
            text: textInput.value,
            deadline: dateInput.value,
            isDone: false,
        }
        todos.push(todo)
        localStorage.setItem("todos", JSON.stringify(todos))
        createLi(todo)
        textInput.value = ""
    }
})

deleteAllBtn.addEventListener("click", function(){
    localStorage.removeItem("todos")
    ul.innerHTML = ""
})







function createLi(todo){
    let li = document.createElement("li")
    li.classList.add("list-group-item")
    li.style.display = "flex"
    li.style.justifyContent ="space-between"

    let span = document.createElement("span")
    span.innerText = todo.text
    if(todo.isDone){
        span.classList.add("done")
    }
    li.appendChild(span)

    let dateSpan = document.createElement("span")
    dateSpan.innerText = todo.deadline
    li.appendChild(dateSpan)

    let btnDiv = document.createElement("div")


    let deleteBtn = document.createElement("button")
    deleteBtn.innerText = "Delete"
    deleteBtn.classList.add("btn")
    deleteBtn.classList.add("btn-danger")
    deleteBtn.classList.add("delete")
    deleteBtn.classList.add("me-3")
    btnDiv.appendChild(deleteBtn);


    let editBtn = document.createElement("button")
    editBtn.innerText = "Edit"
    editBtn.classList.add("btn")
    editBtn.classList.add("btn-warning")
    editBtn.classList.add("me-3")
    btnDiv.appendChild(editBtn)

    let doneBtn = document.createElement("button")
    doneBtn.classList.add("btn")
    doneBtn.classList.add("btn-secondary")
    doneBtn.innerText = "done"
    btnDiv.appendChild(doneBtn)


    li.appendChild(btnDiv)
    ul.appendChild(li)

    //delete one todo
    deleteBtn.addEventListener("click", function(e){
        let todoToDelete = e.target.parentElement.parentElement.firstElementChild.innerText
        todos = todos.filter(x=> x.text != todoToDelete)
        localStorage.setItem("todos", JSON.stringify(todos))

        e.target.parentElement.parentElement.remove()
    })

    //edit todo
    editBtn.addEventListener("click", function(e){
        textInput.value = e.target.parentElement.parentElement.firstElementChild.innerText

        let saveBtn = document.createElement("button")
        saveBtn.classList.add("btn")
        saveBtn.classList.add("btn-primary")
        saveBtn.innerText = "Save changes"
        col2.appendChild(saveBtn)

        saveBtn.addEventListener("click", function(){
            for(let i = 0; i< todos.length; i++){
                if(todos[i].text.trim() == e.target.parentElement.parentElement.firstElementChild.innerText.trim()){
                    todos[i].text = textInput.value
                }
            }
            console.log(todos)
            localStorage.setItem("todos", JSON.stringify(todos))
            e.target.parentElement.parentElement.firstElementChild.innerText = textInput.value
            saveBtn.remove()
            textInput.value=""
        })
    })

    doneBtn.addEventListener("click", function(e){
        e.target.parentElement.parentElement.firstElementChild.classList.toggle("done")
        for(let i = 0; i< todos.length; i++){
            if(todos[i].text.trim() == e.target.parentElement.parentElement.firstElementChild.innerText.trim()){
                todos[i].isDone = !todos[i].isDone
            }
        }
        console.log(todos)
        localStorage.setItem("todos", JSON.stringify(todos))
    })

}