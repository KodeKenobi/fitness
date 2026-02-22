import { Gym } from "./gym.entity";

export interface GymRepository {
  findById(id: string): Promise<Gym | null>;
  save(gym: Gym): Promise<void>;
  withLock<T>(id: string, action: (gym: Gym | null) => Promise<T>): Promise<T>;
}