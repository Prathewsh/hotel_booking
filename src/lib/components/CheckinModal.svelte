<script lang="ts">
  import { roomState, uiState, type Status } from '$lib/stores/roomStore.svelte';

  let { isOpen = $bindable(false) } = $props();

  const statusLabels: Record<string, string> = {
    available: '✓ Available',
    occupied: '⊘ Occupied',
    dirty: '⊘ Dirty',
    maintenance: '⊘ Maintenance',
    blocked: '⊘ Blocked',
  };

  let selectedRoom = $state('');
  let guestFilter = $state(1);
  let checkIn = $state('');
  let checkOut = $state('');
  let error = $state('');

  const maxHotelCapacity = $derived(Math.max(...roomState.rooms.map(r => r.maxGuests)));

  $effect(() => {
    if (guestFilter > maxHotelCapacity) {
      guestFilter = maxHotelCapacity;
    }
  });

  $effect(() => {
    if (isOpen && uiState.selectedRoomForCheckin) {
      selectedRoom = uiState.selectedRoomForCheckin;
      uiState.selectedRoomForCheckin = '';
    }
  });

  let showSuccessModal = $state(false);
  let lastBookedDetails = $state('');

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const today = now.toISOString().slice(0, 16);

  const room = $derived(roomState.rooms.find(r => r.code === selectedRoom));

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
    if (!room) { error = 'Invalid room selected.'; return false; }
    if (room.status !== 'available') { error = `${room.code} is currently ${room.status}. Only available rooms can be booked.`; return false; }
    if (guestFilter > room.maxGuests) { error = `${room.code} can only accommodate up to ${room.maxGuests} guests.`; return false; }
    if (!checkIn) { error = 'Please select a check-in date.'; return false; }
    if (!checkOut) { error = 'Please select a check-out date.'; return false; }
    if (checkIn < today) { error = 'Check-in date cannot be in the past.'; return false; }
    if (checkOut <= checkIn) { error = 'Check-out must be after check-in.'; return false; }
    return true;
  }

  function handleBook() {
    if (validate()) {
      error = '';
      lastBookedDetails = `Booked ${selectedRoom} for ${nights()} night(s) — Total: ₹${totalPrice().toLocaleString()}`;
      
      const idx = roomState.rooms.findIndex(r => r.code === selectedRoom);
      if (idx !== -1) {
        roomState.rooms[idx].status = 'occupied';
      }
      
      roomState.revenue += totalPrice();
      showSuccessModal = true;
      
      selectedRoom = '';
      guestFilter = 1;
      checkIn = '';
      checkOut = '';
    }
  }

  function handleCloseSuccess() {
    showSuccessModal = false;
    isOpen = false;
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col w-full max-w-md relative">
      <button onclick={() => isOpen = false} class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      
      <h2 class="text-[15px] font-bold text-[#1e293b] mb-4">Guest Check-In</h2>

      <div class="flex flex-col gap-3 mb-4">
        <div class="grid grid-cols-[80px_1fr] gap-3">
          <div class="relative">
            <label for="guests" class="absolute -top-2 left-3 bg-white px-1 text-[11px] font-semibold text-slate-500 z-10">Guests</label>
            <input type="number" id="guests" min="1" max={maxHotelCapacity} bind:value={guestFilter} class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:border-gray-300" />
          </div>
          <div class="relative">
            <label for="modal-room-select" class="absolute -top-2 left-3 bg-white px-1 text-[11px] font-semibold text-slate-500 z-10">Room</label>
            <select id="modal-room-select" bind:value={selectedRoom} class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:border-gray-300 bg-white cursor-pointer">
              <option value="">Select a room</option>
              {#each roomState.rooms.filter(r => r.maxGuests >= guestFilter) as r}
                <option value={r.code}>{r.code} — {r.type} [{statusLabels[r.status]}] (₹{r.price.toLocaleString()}/night)</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="relative">
            <label for="check-in" class="absolute -top-2 left-3 bg-white px-1 text-[11px] font-semibold text-slate-500 z-10">Check-in</label>
            <input type="datetime-local" id="check-in" bind:value={checkIn} min={today} class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:border-gray-300" />
          </div>
          <div class="relative">
            <label for="check-out" class="absolute -top-2 left-3 bg-white px-1 text-[11px] font-semibold text-slate-500 z-10">Check-out</label>
            <input type="datetime-local" id="check-out" bind:value={checkOut} min={checkIn || today} class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:border-gray-300" />
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

      <button onclick={handleBook} class="mt-auto w-full bg-[#2B4C7C] hover:bg-[#1f375a] text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-all text-sm">
        Confirm Check-in
      </button>
    </div>
  </div>

  {#if showSuccessModal}
    <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl flex flex-col items-center text-center">
        <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">Check-in Confirmed!</h3>
        <p class="text-sm text-gray-600 font-medium mb-6">{lastBookedDetails}</p>
        <button onclick={handleCloseSuccess} class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-sm transition-colors text-sm">
          Done
        </button>
      </div>
    </div>
  {/if}
{/if}
