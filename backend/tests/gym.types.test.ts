import { describe, it, beforeEach, expect } from 'vitest';
import { Gym } from '../src/modules/gyms/gym.types';

let gymType: Gym;

beforeEach(() => {
    gymType = new Gym(
        '1',
        'Gym',
        10,
        new Set<string>()
    );
});

describe('Gym', () => {
    it('should create a gym', () => {
        expect(gymType).toBeDefined();
    });

    it('should not create a gym without an id', () => {
        expect(() => { gymType.id = ''; }).toThrow('ID is required');
    });

    it('should not create a gym without a name', () => {
        expect(() => { gymType.name = ''; }).toThrow('Name is required');
    });

    it('should not create a gym with negative capacity', () => {
        expect(() => { gymType.capacity = -1; }).toThrow('Capacity must be a non-negative number');
    });

    it('should not create a gym with null bookings', () => {
        // @ts-ignore - testing runtime validation
        expect(() => { gymType.bookings = null; }).toThrow('Bookings set is required');
    });
});
