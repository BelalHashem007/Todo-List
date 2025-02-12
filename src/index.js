import { makeTodo, makeProject, addTodoToProject, updateTodo, projects, removeTodo } from "./projects";
import "./main.css";
import "./add-task.css";
import "./projectsStyle.css";
import "./add-project.css"
import { navButtonHandler } from "./nav.js";
import { addTask, ScreenController, addProject } from "./UI.js";

console.log("Hello");

const todo1 = makeTodo("a", "b",new Date(), "3");
const todo2 = makeTodo("Coding", "I have to code 6 hours daily", new Date(), "1");
const project = makeProject("Home");
const project1 = makeProject("1111");


addTodoToProject(project, todo1);
addTodoToProject(project, todo2);


projects.updateProjects(project);
projects.updateProjects(project1);

console.log(project);
navButtonHandler();
addTask();
ScreenController();
addProject();