const Mongoose = require("mongoose"); // Importerar mongoose för databasen

// mongoose-schema med validering
const todoSchema = Mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Du måste ange en titel för din todo."],
            minlength: [3, "Titeln måste vara minst 3 tecken."]
        },
        description: {
            type: String,
            required: false,
            maxlength: [200, "Beskrivningen får vara max 200 tecken."]
        },
        status: {
            type: String,
            enum: ["Ej påbörjad", "Pågående", "Avklarad"],
            default: "Ej påbörjad"
        }
});

// skapar mongoose-modell för todos baserat på det definierade schemat
const Todo = Mongoose.model("Todo", todoSchema);

// Exporterar modellen för användning i andra filer
module.exports = Todo;