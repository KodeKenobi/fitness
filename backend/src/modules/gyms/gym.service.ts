import { Gym } from "./gym.entity";
import { GymRepository } from "./gym.repository";

export class GymService {
  constructor(private repo: GymRepository) {}

  async getCapacityPercentage(gymId: string): Promise<number> {
    const gym = await this.repo.findById(gymId);
    if (!gym) throw new Error("Gym not found");
    return gym.capacityPercentage;
  }

  async isUserBooked(gymId: string, userId: string): Promise<boolean> {
    if (!userId?.trim()) return false;
    const gym = await this.repo.findById(gymId);
    if (!gym) throw new Error("Gym not found");
    return gym.bookings.has(userId);
  }

  async bookSlot(gymId: string, userId: string): Promise<void> {
    if (!userId?.trim()) throw new Error("Invalid user ID");

    await this.repo.withLock(gymId, async (gym) => {
      if (!gym) throw new Error("Gym not found");
      const updatedGym = gym.book(userId);
      await this.repo.save(updatedGym);
    });
  }
}