import { makeTodo, makeProject, addTodoToProject, updateTodo } from "./projects";
import "./styles.css"

console.log("Hello");
const todo1 = makeTodo("a","b", "c","d");
const project1 = makeProject("Home");
const changeTodo = updateTodo();
addTodoToProject(project1,todo1);
console.log(todo1)
const todo2 = makeTodo("Feed Dog")
const project2 = makeProject("Dogs");
addTodoToProject(project2,todo2);

const dateInput = document.querySelector('#date');
changeTodo.changeTodoDescription(todo1, "a7eh it works!");
changeTodo.changeTodoTitle(todo1, "newTitle");
changeTodo.changeTodoPriority(todo1, "3");
changeTodo.changeTodoDueDate(todo1,dateInput.value);
changeTodo.changeIsComplete(todo1);
console.log(todo1);
changeTodo.changeIsComplete(todo1);
console.log(todo1)

//console.log(project2)
//console.log(project2.myTodos[0].description);