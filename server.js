const express = require('express');
const app = express();

//middleware
app.use(express.json());


let todos = [
    {id: 1, task: "learn Express", completed: false},
    {id: 2, task: "Build a TODO app", completed: true}
];//empthy database

//fetching todo, purpose: retrieve the list of todo from server
app.get("/todos", function (req, res) {

    res.json(todos);
}); //result a list of task stored on the server.

//post route to receive data means creating a new todo
app.post('/todos', function (req, res) {
    const { task, completed } = req.body; //extract data from the request
     if (!task) {
        return res.status(400).json({ msg: "Task is required" });
    }

    const newTodo = { id: Date.now(), task, completed: completed || false };
    todos.push(newTodo); //add to the in-memory array
    res.json({
        msg: "Todo added!",
        todo: newTodo
    });
}) //result creating a new todo item and responds with confirmation

//delete or revoming a todo
app.delete("/todos/:id", function (req, res) {
    const todoId = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== todoId); //remove
    res.json({
        msg: `Todo with id ${todoId} deleted.`
    });
});

//put: update a todo , purpose : modify an existing todo item
app.put('/todos/:id', function (req, res) {
    const todoId = parseInt(req.params.id);
    const { task, completed } = req.body;

    let updated = false;
   const updatedTodos = todos.map(todo =>{
    if (todo.id === todoId) {
            updated = true;
            return {
                ...todo,
                task: task !== undefined ? task : todo.task,
                completed: completed !== undefined ? completed : todo.completed
            };
   }
    return todo;
});
if (updated) {
    todos = updatedTodos;
        //writeTodos(updatedTodos);
        res.json({ msg: `Todo ${todoId} updated!` });
    } else {
        res.status(404).json({ msg: `Todo not found.` });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("server is running good on local");
});
