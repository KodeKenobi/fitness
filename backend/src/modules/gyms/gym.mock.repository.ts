import { Gym } from "./gym.entity";
import { GymRepository } from "./gym.repository";

export class InMemoryGymRepository implements GymRepository {
  private gyms: Map<string, Gym> = new Map();
  private lock: Map<string, Promise<void>> = new Map();

  constructor() {
    this.gyms.set("1", new Gym("1", "Test Gym", 10));
  }

  async findById(id: string): Promise<Gym | null> {
    return this.gyms.get(id) ?? null;
  }

  async save(gym: Gym): Promise<void> {
    this.gyms.set(gym.id, gym);
  }

  async withLock<T>(id: string, action: (gym: Gym | null) => Promise<T>): Promise<T> {
    const existingLock = this.lock.get(id) ?? Promise.resolve();
    let release: () => void;
    const lockPromise = new Promise<void>((resolve) => (release = resolve));
    this.lock.set(id, existingLock.then(() => lockPromise));

    await existingLock;
    try {
      const result = await action(this.gyms.get(id) ?? null);
      return result;
    } finally {
      release!();
    }
  }
}