<script lang="ts">
  const rooms = [
    { code: 'R101', type: 'Deluxe Room', price: 3500, maxGuests: 2 },
    { code: 'R102', type: 'Deluxe Room', price: 3500, maxGuests: 2 },
    { code: 'R201', type: 'Executive Suite', price: 5800, maxGuests: 3 },
    { code: 'R202', type: 'Executive Suite', price: 5800, maxGuests: 3 },
    { code: 'R301', type: 'Family Room', price: 4200, maxGuests: 4 },
  ];

  let selectedRoom = $state('');
  let checkIn = $state('');
  let checkOut = $state('');
  let error = $state('');

  const today = new Date().toISOString().split('T')[0];

  const room = $derived(rooms.find(r => r.code === selectedRoom));

  const nights = $derived(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  });

  const totalPrice = $derived(() => {
    if (!room) return 0;
    return nights() * room.price;
  });

  function validate() {
    error = '';
    if (!selectedRoom) { error = 'Please select a room.'; return false; }
    if (!checkIn) { error = 'Please select a check-in date.'; return false; }
    if (!checkOut) { error = 'Please select a check-out date.'; return false; }
    if (checkIn < today) { error = 'Check-in date cannot be in the past.'; return false; }
    if (checkOut <= checkIn) { error = 'Check-out must be after check-in.'; return false; }
    return true;
  }

  function handleBook() {
    if (validate()) {
      error = '';
      alert(`Booked ${selectedRoom} for ${nights()} night(s) — Total: ₹${totalPrice().toLocaleString()}`);
    }
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-4 mt-4">

  <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 h-full">
    <div class="flex items-center space-x-2 mb-4">
      <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
      <h2 class="text-base font-bold text-gray-800">Going to Vacate Rooms</h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="flex items-start gap-3 relative">
        <div class="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
          <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=200&auto=format&fit=crop" alt="Room 101" class="w-full h-full object-cover" />
        </div>
        <div class="flex flex-col pt-1">
          <span class="text-sm font-bold text-gray-900">Room 101</span>
          <span class="text-xs font-semibold text-gray-800 mt-1">Departing <span class="font-normal text-gray-500">- Guest</span></span>
          <span class="text-xs text-gray-500 font-medium mt-0.5">Check-Out Scheduled</span>
        </div>
      </div>

      <div class="flex items-start gap-3 relative">
        <div class="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
          <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=200&auto=format&fit=crop" alt="Room 102" class="w-full h-full object-cover" />
        </div>
        <div class="flex flex-col pt-1">
          <span class="text-sm font-bold text-gray-900">Room 102</span>
          <span class="text-xs font-semibold text-gray-800 mt-1">Departing <span class="font-normal text-gray-500">- Guest</span></span>
          <span class="text-xs text-gray-500 font-medium mt-0.5">Checkout: 11:00 AM</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col h-full">
    <h2 class="text-[15px] font-bold text-[#1e293b] mb-4">Quick Room Booking</h2>

    <div class="flex flex-col gap-3 mb-4">
      <div class="relative">
        <label for="room-select" class="absolute -top-2 left-3 bg-white px-1 text-[11px] font-semibold text-slate-500 z-10">Room</label>
        <select id="room-select" bind:value={selectedRoom} class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:border-gray-300 appearance-none bg-white cursor-pointer">
          <option value="">Select a room</option>
          {#each rooms as r}
            <option value={r.code}>{r.code} — {r.type} (₹{r.price.toLocaleString()}/night, max {r.maxGuests})</option>
          {/each}
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="relative">
          <label for="check-in" class="absolute -top-2 left-3 bg-white px-1 text-[11px] font-semibold text-slate-500 z-10">Check-in</label>
          <input type="date" id="check-in" bind:value={checkIn} min={today} class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:border-gray-300" />
        </div>
        <div class="relative">
          <label for="check-out" class="absolute -top-2 left-3 bg-white px-1 text-[11px] font-semibold text-slate-500 z-10">Check-out</label>
          <input type="date" id="check-out" bind:value={checkOut} min={checkIn || today} class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:border-gray-300" />
        </div>
      </div>
    </div>

    {#if error}
      <div class="bg-[#ffe8e8] text-[#a31a38] text-[11px] font-semibold px-3 py-2 rounded-lg mb-3">
        {error}
      </div>
    {/if}

    {#if room && nights() > 0}
      <div class="bg-[#edf5f0] rounded-lg px-4 py-3 mb-3">
        <div class="flex justify-between items-center text-sm">
          <span class="text-slate-600 font-medium">{room.type}</span>
          <span class="text-slate-800 font-bold">₹{room.price.toLocaleString()} × {nights()} night{nights() > 1 ? 's' : ''}</span>
        </div>
        <div class="flex justify-between items-center mt-1.5">
          <span class="text-[13px] font-bold text-[#0f3d24]">Total</span>
          <span class="text-[15px] font-extrabold text-[#0f3d24]">₹{totalPrice().toLocaleString()}</span>
        </div>
      </div>
    {/if}

    <button onclick={handleBook} class="mt-auto bg-[#a3ccaf] hover:bg-[#8fbd9d] text-[#0f3d24] font-bold text-[13px] py-2.5 rounded-lg transition-colors w-full">
      Book Room
    </button>
  </div>
</div>
