const Mongoose = require("mongoose"); // Importerar mongoose för databasen

// mongoose-schema med validering
const todoSchema = Mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Du måste ange en titel för din todo"]
        },
        description: {
            type: String,
            required: [true, "Du måste ange en beskrivning av din todo"]
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