import Fastify from "fastify";
import { InMemoryGymRepository } from "./modules/gyms/gym.mock.repository";
import { GymService } from "./modules/gyms/gym.service";
import { GymController } from "./modules/gyms/gym.controller";

export function buildApp() { 
  const app = Fastify();
  const repo = new InMemoryGymRepository();
  const service = new GymService(repo);
  const controller = new GymController(service);

  app.get("/gyms/:id/capacity", controller.getCapacity);
  app.post("/gyms/:id/book", controller.bookSlot);

  return app;
}