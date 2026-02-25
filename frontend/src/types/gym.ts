export interface Gym {
    id: string;
    name: string;
    capacity: number;
    bookings: string[];
}

export interface GymCapacityResponse {
    percentage: number;
    isBooked?: boolean;
}