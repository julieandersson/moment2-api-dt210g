# Moment 2 - DT210G - Backend API
## Uppgiftsbeskrivning
Denna uppgift ingår i moment 2 av kursen DT210G, Fördjupad frontend-utveckling och gick ut på att skapa ett backend-API för en Todo-applikation. API:et är byggt med Hapi.js och MongoDB och hanterar CRUD-operationer för todo-objekt.

## Funktionalitet
API:et har stöd för följande:
- **Skapad en ny todo** (POST /todo)
- **Hämta alla todos** (GET /todos)
- **Hämta en specifik tod:o** (GET /todo/{id})
- **Uppdatera en todo:** (PUT /todo/{id})
- **Radera en todo:** (DELETE /todo/{id})

Varje todo innehåller:
- **Titel:** obligatorisk, minst 3 tecken
- **Beskrivning:** valfri, max 200 tecken
- **Status:** "Ej påbörjad", "Pågående", "Avklarad" med "Ej påbörjad" som standardvärde.

## Teknologier
APIet använder följande teknologier:
- **Hapi.js**
- **Mongoose**
- **MongoDB Atlas**
- **Dotenv**

## Skapad av:
- Julie Andersson
- Webbutvecklingsprogrammet på Mittuniversitetet i Sundsvall
- Moment 2 - kurs DT210G - Fördjupad frontend-utveckling