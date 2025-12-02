import db from "../database.js";

export default function registerWorkoutRoutes(server) {
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
}
