<script lang="ts">
  const rooms = [
    { code: 'R101', type: 'Deluxe Room', price: 3500, maxGuests: 2, status: 'available' },
    { code: 'R102', type: 'Deluxe Room', price: 3500, maxGuests: 2, status: 'occupied' },
    { code: 'R201', type: 'Executive Suite', price: 5800, maxGuests: 3, status: 'available' },
    { code: 'R202', type: 'Executive Suite', price: 5800, maxGuests: 3, status: 'maintenance' },
    { code: 'R301', type: 'Family Room', price: 4200, maxGuests: 4, status: 'available' },
  ];

  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === 'occupied');
  const occupancyPct = Math.round((occupiedRooms.length / totalRooms) * 100);
  const pendingCheckins = 1;
  const pendingDepartures = occupiedRooms.length;
  const revenueToday = occupiedRooms.reduce((sum, r) => sum + r.price, 0);
</script>

<div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col w-full h-full">
  <h2 class="text-sm font-bold text-gray-800 mb-3">Operational Overview</h2>
  
  <div class="grid grid-cols-2 gap-2 flex-grow">
    <div class="bg-indigo-50 rounded-lg p-3 flex flex-col items-center justify-center relative overflow-hidden">
      <div class="absolute bottom-0 left-2 w-1.5 rounded-t-sm bg-blue-600" style="height: {Math.max(8, occupancyPct * 0.6)}px"></div>
      <span class="text-xs font-semibold text-gray-700">Occupancy</span>
      <span class="text-2xl font-bold text-gray-900 leading-none mt-1">{occupancyPct}%</span>
    </div>
    
    <div class="bg-gray-100 rounded-lg p-3 flex flex-col items-center justify-center">
      <span class="text-xs font-semibold text-gray-700">Pending Check-ins</span>
      <span class="text-2xl font-bold text-gray-900 leading-none mt-1">{pendingCheckins}</span>
    </div>
    
    <div class="bg-gray-100 rounded-lg p-3 flex flex-col items-center justify-center">
      <span class="text-xs font-semibold text-gray-700">Pending Departures</span>
      <span class="text-2xl font-bold text-gray-900 leading-none mt-1">{pendingDepartures}</span>
    </div>
    
    <div class="bg-emerald-50 rounded-lg p-3 flex flex-col items-center justify-center">
      <span class="text-xs font-semibold text-gray-700">Revenue Today</span>
      <span class="text-2xl font-bold text-gray-900 leading-none mt-1">₹{revenueToday.toLocaleString()}</span>
    </div>
  </div>
</div>
