export type Status = 'available' | 'occupied' | 'dirty' | 'maintenance' | 'blocked';
export type Room = { code: string; type: string; price: number; maxGuests: number; status: Status };

export const roomState = $state({
  revenue: 0,
  rooms: [
    { code: 'R101', type: 'Deluxe Room', price: 3500, maxGuests: 2, status: 'available' as Status },
    { code: 'R102', type: 'Deluxe Room', price: 3500, maxGuests: 2, status: 'available' as Status },
    { code: 'R201', type: 'Executive Suite', price: 5800, maxGuests: 3, status: 'available' as Status },
    { code: 'R202', type: 'Executive Suite', price: 5800, maxGuests: 3, status: 'available' as Status },
    { code: 'R301', type: 'Family Room', price: 4200, maxGuests: 4, status: 'available' as Status },
  ]
});
