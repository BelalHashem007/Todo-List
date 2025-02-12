import { makeTodo, makeProject, addTodoToProject, updateTodo, removeTodo, projects } from "./projects";
import { format } from "date-fns";
//ui
const addTask = () => {
    let formCreated;
    const createForm = () => {
        const dialog = document.createElement('dialog');
        const form = document.createElement('form');

        const titleInput = document.createElement('input'); //formControls
        const descInput = document.createElement('textarea');
        const dateInput = document.createElement('input');
        const priSelect = document.createElement('select');
        const projInput = document.createElement('select');
        const divContainer = document.createElement('div');
        const closeBtn = document.createElement('button');
        const addBtn = document.createElement('button');
        const btnContainer = document.createElement('div');
        const priOptGrp = document.createElement('optgroup');
        const priOpt1 = document.createElement('option');
        const priOpt2 = document.createElement('option');
        const priOpt3 = document.createElement('option');
        const priOpt4 = document.createElement('option');


        dialog.classList.add('add-task-dialog'); //classes
        form.classList.add('add-task-form');
        titleInput.classList.add('add-task-input', "title");
        descInput.classList.add('add-task-input', "description");
        dateInput.classList.add('add-task-input', "date");
        priSelect.classList.add('add-task-input', "priority");
        divContainer.classList.add('date-priority-container');
        projInput.classList.add('add-task-input', 'project');
        btnContainer.classList.add('btn-container');



        closeBtn.textContent = "Close"; //text and attributes
        addBtn.textContent = "Add Task";
        priOpt1.textContent = "priority 1";
        priOpt2.textContent = "priority 2";
        priOpt3.textContent = "priority 3";
        priOpt4.textContent = "priority 4";
        priOptGrp.setAttribute('label', '1 is the highest!')
        priOpt1.setAttribute("value", "1");
        priOpt2.setAttribute("value", "2");
        priOpt3.setAttribute("value", "3");
        priOpt4.setAttribute("selected", "selected");
        priOpt4.setAttribute("value", "4");
        titleInput.setAttribute('required', 'required');
        titleInput.setAttribute("placeholder", "title*");
        descInput.setAttribute('placeholder', 'description');
        descInput.setAttribute('maxlength', '170');
        dateInput.setAttribute('type', 'date');
        dateInput.setAttribute('required', 'required');
        addBtn.setAttribute("type", "submit");
        closeBtn.setAttribute("type", "button");


        document.querySelector('body').appendChild(dialog);
        dialog.appendChild(form);
        btnContainer.append(closeBtn, addBtn);
        priSelect.append(priOptGrp, priOpt1, priOpt2, priOpt3, priOpt4);

        const updateProjects = () => {
            for (let project of projects.getProjects().projects) {
                const opt = document.createElement('option');
                opt.textContent = project.name;
                projInput.appendChild(opt);
            }
        };

        divContainer.append(dateInput, priSelect, projInput);
        form.append(titleInput, descInput, divContainer, btnContainer,); //appending elements



        closeBtn.addEventListener('click', () => {
            dialog.close()
            form.reset();
            dialog.remove();
        });
        return { dialog, titleInput, descInput, dateInput, priSelect, form, updateProjects, projInput, addBtn }
    }
    const addTaskBtn = document.querySelector('.add-task');
    addTaskBtn.addEventListener('click', () => {
        formCreated = createForm();
        formCreated.updateProjects();
        formCreated.dialog.showModal();
        formCreated.form.addEventListener('submit', formHandler);
    });


    const formHandler = (e) => {
        e.preventDefault();
        const todo = makeTodo(formCreated.titleInput.value, formCreated.descInput.value, formCreated.dateInput.value, formCreated.priSelect.value);
        console.log(todo);
        for (const project of projects.getProjects().projects) {
            if (project.name === formCreated.projInput.value) {
                addTodoToProject(project, todo);
                ScreenController().showMyTodos(project);
            }
        };
        formCreated.form.reset();
        formCreated.dialog.close();
        formCreated.dialog.remove();
    };
    return { createForm }
};

const addProject = () => {
    const add = document.querySelector('.add-project');
    const dialog = document.createElement('dialog');
    const form = document.createElement('form');
    const nameInput = document.createElement('input');
    const closeBtn = document.createElement('button');
    const addBtn = document.createElement('button');
    const buttonContainer = document.createElement('div');

    dialog.classList.add('add-project-dialog');
    form.classList.add('add-project-form');
    nameInput.classList.add('add-project-input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', 'Project Name');
    nameInput.setAttribute('required', 'required');
    closeBtn.textContent = "Close";
    closeBtn.setAttribute('type', 'button');
    closeBtn.classList.add('add-project-close');
    addBtn.textContent = "Add Project";
    addBtn.classList.add('type', 'submit');
    addBtn.classList.add('add-project-submit');
    buttonContainer.classList.add('add-project-btn-container');

    buttonContainer.append(closeBtn, addBtn)
    form.append(nameInput, buttonContainer);
    document.querySelector('body').appendChild(dialog);
    dialog.appendChild(form);

    closeBtn.addEventListener('click', () => {
        dialog.close();
        form.reset();
    });

    const formHandler = (e) => {
        e.preventDefault();
        projects.updateProjects(makeProject(nameInput.value));
        dialog.close();
        form.reset();
        ScreenController();
    }
    form.addEventListener('submit', formHandler)

    const addHandler = () => {
        dialog.showModal();
    }
    add.addEventListener('click', addHandler);
}
const projectName = (() => {
    const name = document.createElement('div');
    name.classList.add('project-name');
    document.querySelector('.main-body').appendChild(name);

    const getName = () => name.textContent;
    const updateName = (newName) => {
        name.textContent = newName;
    }
    return { getName, updateName };
})();
const ScreenController = () => {

    const myProjects = () => {
        document.querySelector('.projects').textContent = "";
        for (const project of projects.getProjects().projects) {
            const button = document.createElement('button');
            button.classList.add('project-btn')
            button.textContent = "# " + project.name;
            document.querySelector('.projects').appendChild(button);
            button.addEventListener('click', () => { showMyTodos(project) });
        }
    }
    myProjects();

    const showMyTodos = (theProject) => {
        const content = document.querySelector('.content');
        content.replaceChildren();
        projectName.updateName("My Projects/" + theProject.name);

        for (const todo of theProject.myTodos) {
            const complete = document.createElement('input');
            const divTitle = document.createElement('div');
            const divDesc = document.createElement('div');
            const divDate = document.createElement('div');
            const divPriority = document.createElement('div');
            const containerDateAndPri = document.createElement('div');
            const containerAll = document.createElement('div');
            const deleteTodo = document.createElement('div');
            const editTodo = document.createElement('div');
            divTitle.textContent = todo.title;
            divDesc.textContent = todo.description;
            divDate.textContent = format(todo.dueDate, "MMM d y");
            divPriority.textContent = todo.priority;
            deleteTodo.classList.add('delete-todo');
            editTodo.classList.add('edit-todo');
            complete.setAttribute('value', 'complete');
            complete.setAttribute('type', 'checkbox');
            containerDateAndPri.classList.add('todo-container-date-pri');
            divTitle.classList.add('todo-title');
            divPriority.classList.add('todo-priority');
            divDesc.classList.add('todo-desc');
            divDate.classList.add('todo-date');
            containerAll.classList.add('todo-container');
            containerDateAndPri.append(divDate, divPriority)
            containerAll.append(complete, divTitle, divDesc, containerDateAndPri, deleteTodo, editTodo);
            content.append(containerAll);


            const priorityStyle = () => {
                switch (todo.priority) {
                    case "1":
                        divPriority.textContent = "priority 1";
                        divPriority.style.backgroundColor = "#ff5d5d";
                        break;
                    case "2":
                        divPriority.textContent = "priority 2"
                        divPriority.style.backgroundColor = "yellow";
                        break;
                    case "3":
                        divPriority.textContent = "priority 3";
                        divPriority.style.backgroundColor = "green"
                        break;
                    case "4":
                        divPriority.textContent = "priority 4";
                        break;
                }
            }
            const deleteHandler = () => {
                removeTodo(theProject, todo);
                showMyTodos(theProject);
            }
            const editHandler = () => {
                const formCreated = addTask().createForm();
                formCreated.titleInput.value = todo.title;
                formCreated.descInput.value = todo.description;
                formCreated.dateInput.value = todo.dueDate;
                formCreated.priSelect.value = todo.priority;
                formCreated.updateProjects();
                formCreated.projInput.value = theProject.name;
                formCreated.dialog.showModal();
                formCreated.addBtn.textContent = "Edit todo";

                const formHandler = (e) => {
                    e.preventDefault();

                    todo.title = formCreated.titleInput.value;
                    todo.description = formCreated.descInput.value;
                    todo.priority = formCreated.priSelect.value;
                    todo.dueDate = format(formCreated.dateInput.value, "MMM d y");

                    if (theProject.name !== formCreated.projInput.value) {
                        removeTodo(theProject, todo);
                        for (const project of projects.getProjects().projects) {
                            if (formCreated.projInput.value === project.name) {
                                addTodoToProject(project, todo);
                                break;
                            }
                        }
                    }
                    showMyTodos(theProject);
                    formCreated.dialog.close();
                    formCreated.form.reset();
                }
                formCreated.form.removeEventListener('submit', formHandler);
                formCreated.form.addEventListener('submit', formHandler);
            }

            deleteTodo.addEventListener('click', deleteHandler);
            editTodo.addEventListener('click', editHandler);
            priorityStyle();
        }
    }
    return { showMyTodos }
}

export { addTask, addProject, ScreenController };