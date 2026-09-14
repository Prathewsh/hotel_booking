<script lang="ts">
  import RoomTile from "./RoomTile.svelte";
  import RoomModal from "./RoomModal.svelte";

  type Status = 'available' | 'occupied' | 'dirty' | 'maintenance' | 'blocked';
  type Room = { n: string; s: string; type: string };

  let modalRoom: Room | null = $state(null);

  let rooms = $state<Room[]>([
    { n: 'R101', s: 'available', type: 'Deluxe Room' },
    { n: 'R102', s: 'occupied', type: 'Deluxe Room' },
    { n: 'R201', s: 'available', type: 'Executive Suite' },
    { n: 'R202', s: 'maintenance', type: 'Executive Suite' },
    { n: 'R301', s: 'available', type: 'Family Room' },
  ]);

  const floor1 = $derived(rooms.filter(r => r.n.startsWith('R1')));
  const floor2 = $derived(rooms.filter(r => r.n.startsWith('R2')));
  const floor3 = $derived(rooms.filter(r => r.n.startsWith('R3')));

  const occupiedCount = $derived(rooms.filter(r => r.s === 'occupied').length);
  const occupiedPct = $derived(Math.round((occupiedCount / rooms.length) * 100));
  const occupiedDash = $derived(Math.round((occupiedCount / rooms.length) * 100));

  function handleSave(newStatus: Status) {
    if (modalRoom) {
      const idx = rooms.indexOf(modalRoom);
      if (idx !== -1) rooms[idx].s = newStatus;
      modalRoom = null;
    }
  }

  const legend = [
    { label: "Available", color: "bg-[#a3d1b6]" },
    { label: "Occupied", color: "bg-[#5c85d6]" },
    { label: "Dirty", color: "bg-[#e56b6f]" },
    { label: "Maintenance", color: "bg-[#f4a261]" },
    { label: "Blocked", color: "bg-[#a6a6a6]" },
  ];
</script>

<div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mt-4">
  <div class="mb-4">
    <h2 class="text-base font-bold text-gray-800 leading-tight">
      Room Status - Interactive Floor View
    </h2>
    <p class="text-xs text-gray-500 font-medium">
      {rooms.length} rooms across your property
    </p>
  </div>

  <div class="flex items-start justify-between">
    <div class="flex flex-col gap-6 flex-1 min-w-0">
      {#if floor1.length}
        <div class="flex items-center">
          <div class="w-6 flex items-center justify-center mr-3 shrink-0">
            <span class="-rotate-90 text-xs font-semibold text-gray-600 tracking-wider whitespace-nowrap">
              Floor 1
            </span>
          </div>
          <div class="flex gap-2.5">
            {#each floor1 as room}
              <RoomTile number={room.n} status={room.s as any} onclick={() => modalRoom = room} />
            {/each}
          </div>
        </div>
      {/if}

      {#if floor2.length}
        <div class="flex items-center">
          <div class="w-6 flex items-center justify-center mr-3 shrink-0">
            <span class="-rotate-90 text-xs font-semibold text-gray-600 tracking-wider whitespace-nowrap">
              Floor 2
            </span>
          </div>
          <div class="flex gap-2.5">
            {#each floor2 as room}
              <RoomTile number={room.n} status={room.s as any} onclick={() => modalRoom = room} />
            {/each}
          </div>
        </div>
      {/if}

      {#if floor3.length}
        <div class="flex items-center">
          <div class="w-6 flex items-center justify-center mr-3 shrink-0">
            <span class="-rotate-90 text-xs font-semibold text-gray-600 tracking-wider whitespace-nowrap">
              Floor 3
            </span>
          </div>
          <div class="flex gap-2.5">
            {#each floor3 as room}
              <RoomTile number={room.n} status={room.s as any} onclick={() => modalRoom = room} />
            {/each}
          </div>
        </div>
      {/if}

    </div>

    <div class="flex flex-col items-center justify-center pl-6 shrink-0">
      <div class="relative w-36 h-36">
        <svg viewBox="0 0 36 36" class="w-full h-full transform -rotate-90">
          <path
            class="text-[#a3d1b6]"
            stroke-width="3"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            class="text-emerald-800"
            stroke-width="3.5"
            stroke-dasharray={`${occupiedDash}, 100`}
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-2xl font-extrabold text-gray-900 leading-none">{rooms.length}</span>
          <span class="text-xs font-bold text-gray-600 leading-tight">Rooms</span>
          <span class="text-xs font-bold text-gray-600 leading-tight">Total</span>
        </div>
      </div>
      <span class="text-sm font-bold text-gray-800 mt-3">{occupiedPct}% Occupied</span>
    </div>
  </div>

  <div class="mt-4">
    <div class="flex items-center gap-3">
      {#each legend as item}
        <div class="flex items-center gap-1.5">
          <div class={`w-2.5 h-2.5 rounded-sm ${item.color}`}></div>
          <span class="text-[10px] font-bold text-gray-600">{item.label}</span>
        </div>
      {/each}
    </div>
    <div class="text-[10px] font-medium text-gray-500 mt-1.5">
      Clicking a room tile opens its quick-edit menu
    </div>
  </div>
</div>

{#if modalRoom}
  <RoomModal
    roomNumber={modalRoom.n}
    currentStatus={modalRoom.s as any}
    onClose={() => modalRoom = null}
    onSave={handleSave}
  />
{/if}
