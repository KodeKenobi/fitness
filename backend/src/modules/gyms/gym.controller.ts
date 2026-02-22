import { FastifyRequest, FastifyReply } from "fastify";
import { GymService } from "./gym.service";

export class GymController {
  constructor(private service: GymService) {}

  getCapacity = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { userId } = (request.query as { userId?: string }) || {};
      const percentage = await this.service.getCapacityPercentage(
        request.params.id
      );
      let isBooked = false;
      if (userId) {
        isBooked = await this.service.isUserBooked(request.params.id, userId);
      }
      return reply.send({ percentage, isBooked });
    } catch (e: any) {
      return reply.code(404).send({ error: e.message });
    }
  };

  bookSlot = async (
    request: FastifyRequest<{ Params: { id: string }; Body: { userId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      await this.service.bookSlot(request.params.id, request.body.userId);
      return reply.code(201).send({ message: "Booked successfully" });
    } catch (e: any) {
      return reply.code(409).send({ error: e.message });
    }
  };
}