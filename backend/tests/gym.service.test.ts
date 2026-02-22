import { describe, it, expect, beforeEach } from "vitest";
import { GymService } from "../src/modules/gyms/gym.service";
import { InMemoryGymRepository } from "../src/modules/gyms/gym.mock.repository";

let service: GymService;

beforeEach(() => {
  service = new GymService(new InMemoryGymRepository());
});

describe("GymService - full edge cases", () => {
  it("books a single user", async () => {
    await service.bookSlot("1", "user1");
    const percent = await service.getCapacityPercentage("1");
    expect(percent).toBe(10);
  });

  it("books multiple users sequentially", async () => {
    for (let i = 1; i <= 5; i++) await service.bookSlot("1", `user${i}`);
    const percent = await service.getCapacityPercentage("1");
    expect(percent).toBe(50);
  });

  it("throws error for invalid user IDs", async () => {
    await expect(service.bookSlot("1", "")).rejects.toThrow("Invalid user ID");
    await expect(service.bookSlot("1", "   ")).rejects.toThrow("Invalid user ID");
    await expect(service.bookSlot("1", null as any)).rejects.toThrow("Invalid user ID");
  });

  it("throws error for double booking", async () => {
    await service.bookSlot("1", "user1");
    await expect(service.bookSlot("1", "user1")).rejects.toThrow("User already booked");
  });

  it("throws error when gym is full", async () => {
    for (let i = 1; i <= 10; i++) await service.bookSlot("1", `user${i}`);
    await expect(service.bookSlot("1", "extraUser")).rejects.toThrow("Gym is full");
  });

  it("simulates concurrent booking safely", async () => {
    await Promise.all([
      service.bookSlot("1", "userA"),
      service.bookSlot("1", "userB"),
    ]);
    const percent = await service.getCapacityPercentage("1");
    expect(percent).toBe(20);
  });

  it("throws error if gym does not exist", async () => {
    await expect(service.bookSlot("unknown", "user1")).rejects.toThrow("Gym not found");
    await expect(service.getCapacityPercentage("unknown")).rejects.toThrow("Gym not found");
  });
});