export class Gym {
    private _id: string;
    private _name: string;
    private _capacity: number;
    private _bookings: Set<string>;

    constructor(id: string, name: string, capacity: number, bookings: Set<string>) {
        this.validateId(id);
        this.validateName(name);
        this.validateCapacity(capacity);
        this.validateBookings(bookings);

        this._id = id;
        this._name = name;
        this._capacity = capacity;
        this._bookings = bookings;
    }

    get id(): string { return this._id; }
    set id(value: string) {
        this.validateId(value);
        this._id = value;
    }

    get name(): string { return this._name; }
    set name(value: string) {
        this.validateName(value);
        this._name = value;
    }

    get capacity(): number { return this._capacity; }
    set capacity(value: number) {
        this.validateCapacity(value);
        this._capacity = value;
    }

    get bookings(): Set<string> { return this._bookings; }
    set bookings(value: Set<string>) {
        this.validateBookings(value);
        this._bookings = value;
    }

    private validateId(id: string) {
        if (!id || id.trim() === '') throw new Error('ID is required');
    }

    private validateName(name: string) {
        if (!name || name.trim() === '') throw new Error('Name is required');
    }

    private validateCapacity(capacity: number) {
        if (capacity === undefined || capacity === null || capacity < 0) {
            throw new Error('Capacity must be a non-negative number');
        }
    }

    private validateBookings(bookings: Set<string>) {
        if (!bookings) throw new Error('Bookings set is required');
    }
}

export interface GymRepository {
    findById(id: string): Promise<Gym | null>;
    save(gym: Gym): Promise<void>;
}