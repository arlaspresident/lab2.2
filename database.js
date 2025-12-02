import Database from "better-sqlite3";

const db = new Database("./db/workouts.db");

//skapa tabellen om den inte finns
db.exec(`
  CREATE TABLE IF NOT EXISTS workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    duration INTEGER NOT NULL,
    completed BOOLEAN NOT NULL
  );
`);

export default db;
