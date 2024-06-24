// let todoList = [
//   {
//     item: "learn Html",
//     duedate: "12/11/2024",
//   },
//   {
//     item: "learn JS",
//     duedate: "12/07/2024",
//   },
// ];
// displayItems();

// function addTodo() {
//   let inputElement = document.querySelector("#todoInput");
//   let dateElement = document.querySelector("#todoDate");
//   let todoItem = inputElement.value;
//   let todoDate = dateElement.value;
//   todoList.push({ item: todoItem, duedate: todoDate });
//   inputElement.value = "";
//   dateElement.value = "";
//   displayItems();
// }

// function displayItems() {
//   let containerElement = document.querySelector(".todoLists");
//   let newHtml = "";
//   for (let i = 0; i < todoList.length; i++) {
//     // let item = todoList[i].item;
//     // let duedate = todoList[i].duedate;
//     let { item, duedate } = todoList[i];
//     newHtml += `
//              <span>${item} </span>
//              <span>${duedate} </span>
//              <button class="btnDelete" onClick="todoList.splice(${i},1); displayItems();">Delete</button>`;
//   }
//   containerElement.innerHTML = newHtml;
// }

let todoList = JSON.parse(localStorage.getItem("todoList")) || [
  {
    item: "learn Html",
    duedate: "12/11/2024",
  },
  {
    item: "learn JS",
    duedate: "07/12/2024",
  },
];

displayItems();

function addTodo() {
  const inputElement = document.querySelector("#todoInput");
  const dateElement = document.querySelector("#todoDate");
  const todoItem = inputElement.value;
  const todoDate = formatDate(dateElement.value);

  if (todoItem && todoDate) {
    todoList.push({ item: todoItem, duedate: todoDate });
    inputElement.value = "";
    dateElement.value = "";
    saveToLocalStorage();
    displayItems();
  }
}

function displayItems() {
  const containerElement = document.querySelector(".todoLists");
  let newHtml = "";

  todoList.forEach((todo, index) => {
    const { item, duedate } = todo;
    newHtml += `
        <span>${item}</span>
        <span>${duedate}</span>
        <button class="btnDelete" onClick="deleteTodoItem(${index})">Delete</button>
  `;
  });

  containerElement.innerHTML = newHtml;
}

function deleteTodoItem(index) {
  todoList.splice(index, 1);
  saveToLocalStorage();
  displayItems();
}

function saveToLocalStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
