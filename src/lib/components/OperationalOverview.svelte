<script lang="ts">
  import { roomState } from '$lib/stores/roomStore.svelte';

  const totalRooms = $derived(roomState.rooms.length);
  const occupiedRooms = $derived(roomState.rooms.filter(r => r.status === 'occupied'));
  const occupancyPct = $derived(Math.round((occupiedRooms.length / totalRooms) * 100));
  const pendingCheckins = 0;
  const pendingDepartures = $derived(occupiedRooms.length);
  const revenueToday = $derived(roomState.revenue);
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
