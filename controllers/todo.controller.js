const Todo = require("../models/todo.model");

// Controller för att hämta alla todos
exports.getAllTodos = async (request, h) => {
    try {
        const todos = await Todo.find(); // Hämtar alla todos

        if (todos.length === 0) { // Om det inte finns några todos
            return h.response({
                statusCode: 404,
                error: "Not Found",
                message: "Inga todos hittades.",
            }).code(404);
        }

        return h.response(todos).code(200); // Om det finns data, returnera listan med alla todos
    } catch (error) {
        console.error("Fel vid hämtning av todos:", error);
        return h.response({
            message: "Kunde inte hämta todos, försök igen senare.",
            error: error.message,
        }).code(500); // Felmeddelande 500
    }
};

// Controller för att hämta en todo
exports.getOneTodo = async (request, h) => {
    try {
        const todo = await Todo.findById(request.params.id);
        return todo || h.response("Todo:n med det angivna ID:et hittades inte").code(404);
    } catch (err) {
        // Oväntade fel
        return h.response({
            statusCode: 500,
            error: "Internal Server Error",
            message: "Ett oväntat fel inträffade."
        }).code(500);
    }
};

// Controller för att lägga till en ny todo
exports.postNewTodo = async (request, h) => {
    try {
        // Skapar en ny todo
        const todo = new Todo(request.payload);
        const savedTodo = await todo.save(); // Sparar todo

        // Bekräftelsemeddelande
        return h.response({
            statusCode: 201,
            message: "En ny todo har lagts till.",
            addedTodo: savedTodo // Returnerar den nya todo:n
        }).code(201);
    } catch (err) {
        if (err.name === "ValidationError") {
            // Om felet är en valideringsmiss, returnera 400 och felmeddelanden från schemat
            return h.response({
                statusCode: 400,
                error: "Bad Request",
                message: Object.values(err.errors).map(e => e.message) // extraherar alla valideringsfelmeddelanden
            }).code(400);
        }

        // Oväntade fel
        return h.response({
            statusCode: 500,
            error: "Internal Server Error",
            message: "Ett oväntat fel inträffade."
        }).code(500);
    }
};

// Controller för att uppdatera en todo
exports.updateOneTodo = async (request, h) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            request.params.id, 
            request.payload, 
            { 
                new: true, // returnerar den uppdaterade todo:n
                runValidators: true // kör Mongoose validering
            }
        );

        if (!updatedTodo) {
            return h.response({
                statusCode: 404,
                error: "Not Found",
                message: "Todo:n med det angivna ID:et hittades inte." // Om todo:n ej hittas
            }).code(404);
        }

        return h.response({
            statusCode: 200,
            message: "Todo:n har uppdaterats.", // Bekräftelsemeddelande om uppdateringen lyckas
            updatedTodo
        }).code(200);
    } catch (err) {
        return h.response({
            statusCode: 400,
            error: "Bad Request",
            message: err.message // Returnerar valideringsfel
        }).code(400);
    }
};

// Controller för att radera en todo
exports.deleteOneTodo = async (request, h) => {
    try {
        // Tar bort todo baserat på ID
        const todo = await Todo.findByIdAndDelete(request.params.id);

        // Om todo inte hittas
        if (!todo) {
            return h.response({
                statusCode: 404,
                error: "Not Found",
                // Skickar anpassat felmeddelande
                message: "Todo:n med det angivna ID:et hittades inte."
            }).code(404);
        }

        // Om raderingen lyckades
        return h.response({
            statusCode: 200,
            // Skickar bekräftelsemeddelande
            message: "Todo:n har raderats.",
            deletedTodo: todo
        }).code(200);

    } catch (err) {
        // Kontrollerar om felet beror på ett ogiltigt ID
        if (err.name === 'CastError' || err.kind === 'ObjectId') {
            return h.response({
                statusCode: 400,
                error: "Bad Request",
                message: "ID:et är ogiltigt och kunde inte hittas."
            }).code(400);
        }

        // Oväntade fel
        return h.response({
            statusCode: 500,
            error: "Internal Server Error",
            message: "Ett oväntat fel inträffade vid radering."
        }).code(500);
    }
};