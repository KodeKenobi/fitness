export class Gym {
  readonly id: string;
  readonly name: string;
  readonly capacity: number;
  readonly bookings: Set<string>;

  constructor(id: string, name: string, capacity: number, bookings?: Set<string>) {
    if (!id?.trim()) throw new Error("ID is required");
    if (!name?.trim()) throw new Error("Name is required");
    if (capacity === undefined || capacity < 0) throw new Error("Capacity must be non-negative");

    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.bookings = bookings ? new Set(bookings) : new Set();
  }

  get capacityPercentage(): number {
    return Math.round((this.bookings.size / this.capacity) * 100);
  }

  book(userId: string): Gym {
    if (!userId?.trim()) throw new Error("Invalid user ID");
    if (this.bookings.has(userId)) throw new Error("User already booked");
    if (this.bookings.size >= this.capacity) throw new Error("Gym is full");

    const newBookings = new Set(this.bookings);
    newBookings.add(userId);
    return new Gym(this.id, this.name, this.capacity, newBookings);
  }
}