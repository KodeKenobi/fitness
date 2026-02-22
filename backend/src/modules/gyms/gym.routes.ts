import { FastifyInstance } from "fastify";
import { GymController } from "./gym.controller";
import { GymService } from "./gym.service";
import { InMemoryGymRepository } from "./gym.mock.repository";

export default async function gymRoutes(app: FastifyInstance) {
  const repo = new InMemoryGymRepository();
  const service = new GymService(repo);
  const controller = new GymController(service);

  app.get("/:id/capacity", controller.getCapacity);
  app.post(
    "/:id/book",
    {
      schema: {
        body: {
          type: "object",
          required: ["userId"],
          properties: {
            userId: { type: "string" }
          }
        }
      }
    },
    controller.bookSlot
  );
}