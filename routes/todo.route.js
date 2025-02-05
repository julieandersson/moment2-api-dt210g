const todoController = require("../controllers/todo.controller");

module.exports = (server) => {
    // Definierar olika routes för CRUD
    server.route([
        {
            // GET-route, hämtar alla todos
            method: "GET",
            path: "/todos",
            handler: todoController.getAllTodos
        },
        {
            // GET-route, hämtar en specifik todo med angivet id
            method: "GET",
            path: "/todo/{id}",
            handler: todoController.getOneTodo
        },
        {
            // POST-route, skapar en ny todo
            method: "POST",
            path: "/todo",
            handler: todoController.postNewTodo
        },
        {
            // PUT-route, uppdaterar en todo med angivet id
            method: "PUT",
            path: "/todo/{id}",
            handler: todoController.updateOneTodo
        },
        {
            // DELETE-route, raderar en todo med angivet id
            method: "DELETE",
            path: "/todo/{id}",
            handler: todoController.deleteOneTodo
        }]
    );
}