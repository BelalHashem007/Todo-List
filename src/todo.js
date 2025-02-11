import { makeTodo, makeProject, addTodoToProject, updateTodo, projects } from "./projects";
//ui
const addTask = () => {

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
    updateProjects();
    divContainer.append(dateInput, priSelect, projInput);
    form.append(titleInput, descInput, divContainer, btnContainer,); //appending elements



    closeBtn.addEventListener('click', () => {
        dialog.close()
        form.reset();
    });
    const addTaskBtn = document.querySelector('.add-task');
    addTaskBtn.addEventListener('click', () => { dialog.showModal() });

    let formData;
    const formHandler = (e) => {
        e.preventDefault();
        formData = {
            title: titleInput.value,
            description: descInput.value,
            date: dateInput.value,
            priority: priSelect.value,
            project: projInput.value,
        };
        console.log(formData);
        form.reset();
        dialog.close();
    };
    form.addEventListener('submit', formHandler);

};

const myProjects = () => {
    for (const project of projects.getProjects().projects) {
        const button = document.createElement('button');
        button.textContent = "# " + project.name;
        document.querySelector('.side-bar').appendChild(button);

        button.addEventListener('click',()=> myTodos(project));
    }
}

const myTodos = (theProject) => {
    const content = document.querySelector('.main-body');
            content.replaceChildren();
            for (const todo of theProject.myTodos) {
                const divTitle = document.createElement('div');
                const divDesc = document.createElement('div');
                divTitle.textContent = todo.title;
                divDesc.textContent = todo.description;
                divTitle.classList.add('todo-title');
                divDesc.classList.add('todo-desc');
                content.append(divTitle, divDesc)
    }
}

export { addTask, myProjects };