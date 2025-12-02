import db from "../database.js";

export default function registerWorkoutRoutes(server) {

  //GET hämta alla pass
  server.route({
    method: "GET",
    path: "/workouts",
    handler: () => {
      const rows = db
        .prepare("SELECT id, name, duration, completed FROM workouts")
        .all();
      return rows;
    },
  });

  //POST skapa ett pass
  server.route({
    method: "POST",
    path: "/workouts",
    handler: (request, h) => {
      const { name, duration, completed } = request.payload;

      //enkel validering
      if (!name || duration === undefined || completed === undefined) {
        return h.response({
          error: "Alla fält krävs: name, duration, completed"
        }).code(400);
      }

      const result = db
        .prepare(
          `INSERT INTO workouts (name, duration, completed)
           VALUES (?, ?, ?)`
        )
        .run(name, duration, completed);

      return h.response({ id: result.lastInsertRowid }).code(201);
    },
  });

    //GET hämta ett specifikt pass via id
  server.route({
    method: "GET",
    path: "/workouts/{id}",
    handler: (request, h) => {
      const id = request.params.id;

      const workout = db
        .prepare("SELECT id, name, duration, completed FROM workouts WHERE id = ?")
        .get(id);

      if (!workout) {
        return h.response({ error: "Passet finns inte" }).code(404);
      }

      return workout;
    },
  });

    //PUT uppdatera ett pass
  server.route({
    method: "PUT",
    path: "/workouts/{id}",
    handler: (request, h) => {
      const id = request.params.id;
      const { name, duration, completed } = request.payload;

      //validering
      if (!name || duration === undefined || completed === undefined) {
        return h.response({
          error: "alla fält krävs: name, duration, completed"
        }).code(400);
      }

      const existing = db
        .prepare("SELECT id FROM workouts WHERE id = ?")
        .get(id);

      if (!existing) {
        return h.response({ error: "Passet finns inte" }).code(404);
      }

      db.prepare(
        `UPDATE workouts 
         SET name = ?, duration = ?, completed = ?
         WHERE id = ?`
      ).run(name, duration, completed, id);

      return h.response({ message: "Uppdaterat" }).code(200);
    },
  });

  //DELETE radera ett pass
server.route({
  method: "DELETE",
  path: "/workouts/{id}",
  handler: (request, h) => {
    const id = request.params.id;

    const existing = db
      .prepare("SELECT id FROM workouts WHERE id = ?")
      .get(id);

    if (!existing) {
      return h.response({ error: "Passet finns inte" }).code(404);
    }

    db.prepare("DELETE FROM workouts WHERE id = ?").run(id);

    return h.response({ message: "Raderat" }).code(200);
  },
});

}
