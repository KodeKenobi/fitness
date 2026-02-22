import { describe, it, expect } from "vitest";
import { Gym } from "../src/modules/gyms/gym.entity";

describe("Gym entity", () => {
  it("books a slot correctly", () => {
    const gym = new Gym("1", "Test Gym", 2);
    const updated = gym.book("user1");
    expect(updated.bookings.has("user1")).toBe(true);
  });

  it("prevents invalid user IDs", () => {
    const gym = new Gym("1", "Test Gym", 2);
    expect(() => gym.book("")).toThrow("Invalid user ID");
  });

  it("prevents double booking", () => {
    const gym = new Gym("1", "Test Gym", 2, new Set(["user1"]));
    expect(() => gym.book("user1")).toThrow("User already booked");
  });

  it("prevents overbooking", () => {
    const gym = new Gym("1", "Test Gym", 1, new Set(["user1"]));
    expect(() => gym.book("user2")).toThrow("Gym is full");
  });
});