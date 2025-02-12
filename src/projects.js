const makeTodo = (title, description = "none", dueDate, priority) => {
    let isComplete = false;
    return { title, description, dueDate, priority, isComplete };
};


const makeProject = (name) => {
    let myTodos = [];

    return { name, myTodos };
}

const removeTodo = (project, todoToRemove) => {
    project.myTodos = project.myTodos.filter((todo)=> {
        if (todoToRemove === todo)
            return false;
        return true;
    })
}

const projects = (() => {
    let projects = [];

    const updateProjects = (project) => {
        projects.push(project);
    };
    const getProjects = () => {
        return { projects }
    }
    return {updateProjects, getProjects};
})();

const addTodoToProject = (project, todo) => {
    project.myTodos.push(todo);
}

const updateTodo = () => {
    const changeTodoPriority = (todo, newPriority) => {
        todo.priority = newPriority;
    }

    const changeTodoTitle = (todo, newTitle) => {
        todo.title = newTitle;
    }

    const changeTodoDescription = (todo, newDescription) => {
        todo.description = newDescription;
    }

    const changeTodoDueDate = (todo, newDate) => {
        todo.dueDate = newDate;
    }

    const changeIsComplete = (todo) => {
        todo.isComplete = todo.isComplete === false ? true : false;
    }
    return {
        changeTodoTitle,
        changeTodoDescription,
        changeTodoDueDate,
        changeTodoPriority,
        changeIsComplete,
    };
};
export { makeTodo, makeProject, addTodoToProject, updateTodo, removeTodo , projects};