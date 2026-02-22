import { describe, it, expect, beforeEach, vi } from "vitest";
import { GymController } from "../src/modules/gyms/gym.controller";
import { GymService } from "../src/modules/gyms/gym.service";

class MockGymService {
  getCapacityPercentage = vi.fn();
  bookSlot = vi.fn();
}

describe("GymController", () => {
  let controller: GymController;
  let service: MockGymService;

  beforeEach(() => {
    service = new MockGymService();
    controller = new GymController(service as unknown as GymService);
  });

  it("getCapacity returns percentage", async () => {
    service.getCapacityPercentage.mockResolvedValue(50);

    const req: any = { params: { id: "1" }, query: {} };
    const reply: any = { send: vi.fn(), code: vi.fn(() => reply) };

    await controller.getCapacity(req, reply);

    expect(service.getCapacityPercentage).toHaveBeenCalledWith("1");
    expect(reply.send).toHaveBeenCalledWith({ percentage: 50, isBooked: false });
  });

  it("getCapacity returns 404 on error", async () => {
    service.getCapacityPercentage.mockRejectedValue(new Error("Gym not found"));

    const req: any = { params: { id: "unknown" }, query: {} };
    const reply: any = { code: vi.fn(() => reply), send: vi.fn() };

    await controller.getCapacity(req, reply);

    expect(reply.code).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith({ error: "Gym not found" });
  });

  it("bookSlot returns 201 on success", async () => {
    service.bookSlot.mockResolvedValue(undefined);

    const req: any = { params: { id: "1" }, body: { userId: "user1" } };
    const reply: any = { code: vi.fn(() => reply), send: vi.fn() };

    await controller.bookSlot(req, reply);

    expect(service.bookSlot).toHaveBeenCalledWith("1", "user1");
    expect(reply.code).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith({ message: "Booked successfully" });
  });

  it("bookSlot returns 409 on error", async () => {
    service.bookSlot.mockRejectedValue(new Error("User already booked"));

    const req: any = { params: { id: "1" }, body: { userId: "user1" } };
    const reply: any = { code: vi.fn(() => reply), send: vi.fn() };

    await controller.bookSlot(req, reply);

    expect(reply.code).toHaveBeenCalledWith(409);
    expect(reply.send).toHaveBeenCalledWith({ error: "User already booked" });
  });
});