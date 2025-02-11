import { makeTodo, makeProject, addTodoToProject, updateTodo, projects } from "./projects";
import "./main.css";
import "./add-task.css"
import { navButtonHandler } from "./nav.js";
import {addTask, myProjects} from "./todo.js"

console.log("Hello");
const todo1 = makeTodo("a", "b", "c", "d");
const project1 = makeProject("Home");
addTodoToProject(project1, todo1);
console.log(todo1)
const changeTodo = updateTodo();
const todo2 = makeTodo("Feed Dog")
const project2 = makeProject("Dogs");
addTodoToProject(project2, todo2);
projects.updateProjects(project1);
projects.updateProjects(project2);

console.log(projects.getProjects())
changeTodo.changeTodoDescription(todo1, "a7eh it works!");
changeTodo.changeTodoTitle(todo1, "newTitle");
changeTodo.changeTodoPriority(todo1, "3");
changeTodo.changeIsComplete(todo1);
console.log(todo1);
changeTodo.changeIsComplete(todo1);
console.log(todo1)

navButtonHandler();
addTask();
myProjects();
//console.log(project2)
//console.log(project2.myTodos[0].description);