import inquirer from "inquirer";

let todos: string[] = [];
let condition = true;

async function main() {
    while (condition) {
        const choice = await inquirer.prompt([
            {
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: ["Add", "Read", "Update", "Delete", "Empty", "Exit"]
            }
        ]);

        switch (choice.action) {
            case "Add":
                await addTask();
                break;
            case "Read":
                readTodos();
                break;
            case "Update":
                await updateTask();
                break;
            case "Delete":
                await deleteTask();
                break;
            case "Empty":
                emptyTodos();
                break;
            case "Exit":
                condition = false;
                break;
        }
    }
}

async function addTask() {
    const addTaskResponse = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: "What would you like to add to your todos?"
        }
    ]);
    todos.push(addTaskResponse.todo);
    console.log("Added:", addTaskResponse.todo);
}

function readTodos() {
    if (todos.length === 0) {
        console.log("No todos available.");
    } else {
        console.log("Todos:");
        todos.forEach((todo, index) => {
            console.log(`${index + 1}. ${todo}`);
        });
    }
}

async function updateTask() {
    const updateTaskResponse = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the index of the todo you want to update:",
            validate: (input: number) => {
                return input >= 1 && input <= todos.length ? true : "Invalid index";
            }
        },
        {
            name: "newTodo",
            type: "input",
            message: "Enter the new todo:"
        }
    ]);
    todos[updateTaskResponse.index - 1] = updateTaskResponse.newTodo;
    console.log("Updated:", updateTaskResponse.newTodo);
}

async function deleteTask() {
    const deleteTaskResponse = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the index of the todo you want to delete:",
            validate: (input: number) => {
                return input >= 1 && input <= todos.length ? true : "Invalid index";
            }
        }
    ]);
    const deletedTodo = todos.splice(deleteTaskResponse.index - 1, 1)[0];
    console.log("Deleted:", deletedTodo);
}

function emptyTodos() {
    todos = [];
    console.log("Todos list emptied.");
}

main();