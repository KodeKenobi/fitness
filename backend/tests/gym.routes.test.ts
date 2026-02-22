import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../src/app";

let app: ReturnType<typeof buildApp>;

beforeEach(() => {
  app = buildApp();
});

describe("Gym Routes (Integration)", () => {
  it("GET /gyms/1/capacity initially returns 0", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/gyms/1/capacity",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ percentage: 0, isBooked: false });
  });

  it("POST /gyms/1/book books a slot", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/gyms/1/book",
      payload: { userId: "user1" },
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toEqual({ message: "Booked successfully" });

    const cap = await app.inject({
      method: "GET",
      url: "/gyms/1/capacity",
    });
    expect(cap.json()).toEqual({ percentage: 10, isBooked: false });
  });

  it("prevents double booking via route", async () => {
    await app.inject({ method: "POST", url: "/gyms/1/book", payload: { userId: "user1" } });
    const response = await app.inject({ method: "POST", url: "/gyms/1/book", payload: { userId: "user1" } });

    expect(response.statusCode).toBe(409);
    expect(response.json()).toEqual({ error: "User already booked" });
  });

  it("returns 404 for unknown gym", async () => {
    const response = await app.inject({ method: "GET", url: "/gyms/unknown/capacity" });
    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({ error: "Gym not found" });
  });
});