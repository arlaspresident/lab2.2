# Lab 2.2  REST webbtjänst

Det här projektet är en REST webbtjänst byggd med hapi och sqlite.  
Webbtjänsten hanterar träningspass och innehåller full CRUD.

## Teknisk beskrivning
Webbtjänsten är skapad med node.js och hapi.js.  
Data lagras i en sqlite databas via better-sqlite3.  
All data returneras i json.

Tabellen innehåller fälten:

- name (text)

- duration (integer)

- completed (boolean)

Servern startas med:
```npm start```

Webbtjänsten körs på: http://localhost:3000

# API endpoints
## Hämta alla träningspass
curl http://localhost:3000/workouts

## Hämta ett specifikt träningspass

curl http://localhost:3000/workouts/1

## Skapa träningspass

curl -X POST http://localhost:3000/workouts
 -H "Content-Type: application/json" -d '{"name":"Leg day","duration":60,"completed":0}'

## Uppdatera träningspass

curl -X PUT http://localhost:3000/workouts/1
 -H "Content-Type: application/json" -d '{"name":"Leg day updated","duration":75,"completed":1}'

## Radera träningspass

curl -X DELETE http://localhost:3000/workouts/1