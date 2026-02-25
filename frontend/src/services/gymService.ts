import axios from "axios";
import { GymCapacityResponse } from "../types/gym";

export class GymService {
  constructor(private baseUrl: string) {}

  async getCapacity(gymId: string, userId?: string): Promise<GymCapacityResponse> {
    const res = await axios.get<GymCapacityResponse>(`${this.baseUrl}/gyms/${gymId}/capacity`, {
      params: { userId }
    });
    return res.data;
  }

  async bookSlot(gymId: string, userId: string): Promise<void> {
    await axios.post(`${this.baseUrl}/gyms/${gymId}/book`, { userId });
  }
}