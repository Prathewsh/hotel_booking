<script lang="ts">
  import RoomTile from "./RoomTile.svelte";

  const floor1Wing1 = [
    { n: 101, s: "available" },
    { n: 102, s: "available" },
    { n: 103, s: "available" },
    { n: 104, s: "available" },
    { n: 105, s: "available" },
    { n: 106, s: "available" },
    { n: 107, s: "available" },
    { n: 108, s: "available" },
    { n: 109, s: "available" },
    { n: 109, s: "available" },
    { n: 110, s: "available" },
    { n: 111, s: "available" },
    { n: 112, s: "available" },
    { n: 113, s: "available" },
    { n: 114, s: "available" },
    { n: 115, s: "available" },
    { n: 116, s: "available" },
    { n: 101, s: "available" },
    { n: 102, s: "occupied" },
    { n: 103, s: "occupied" },
    { n: 104, s: "dirty" },
    { n: 105, s: "dirty" },
    { n: 106, s: "maintenance" },
    { n: 107, s: "maintenance" },
    { n: 102, s: "available" },
    { n: 103, s: "available" },
    { n: 104, s: "available" },
    { n: 104, s: "occupied" },
    { n: 105, s: "occupied" },
    { n: 106, s: "available" },
    { n: 107, s: "available" },
    { n: 108, s: "available" },
    { n: 109, s: "occupied" },
    { n: 190, s: "maintenance" },
  ];

  const floor2Wing1 = [
    { n: 201, s: "available" },
    { n: 202, s: "available" },
    { n: 203, s: "available" },
    { n: 204, s: "available" },
    { n: 205, s: "maintenance" },
    { n: 210, s: "blocked" },
    { n: 207, s: "available" },
    { n: 202, s: "available" },
    { n: 203, s: "available" },
    { n: 205, s: "maintenance" },
    { n: 210, s: "blocked" },
    { n: 211, s: "available" },
    { n: 212, s: "available" },
    { n: 213, s: "blocked" },
    { n: 214, s: "available" },
    { n: 215, s: "available" },
    { n: 216, s: "available" },
    { n: 201, s: "available" },
    { n: 102, s: "available" },
    { n: 103, s: "available" },
    { n: 204, s: "available" },
    { n: 105, s: "available" },
    { n: 106, s: "available" },
    { n: 207, s: "available" },
    { n: 202, s: "occupied" },
    { n: 203, s: "available" },
    { n: 204, s: "available" },
    { n: 205, s: "maintenance" },
    { n: 206, s: "available" },
    { n: 206, s: "available" },
    { n: 207, s: "available" },
    { n: 208, s: "available" },
    { n: 209, s: "available" },
    { n: 210, s: "blocked" },
    { n: 201, s: "available" },
    { n: 202, s: "available" },
    { n: 203, s: "available" },
    { n: 204, s: "available" },
    { n: 205, s: "available" },
    { n: 206, s: "available" },
    { n: 207, s: "available" },
    { n: 208, s: "blocked" },
    { n: 209, s: "blocked" },
    { n: 230, s: "available" },
    { n: 201, s: "available" },
    { n: 202, s: "available" },
    { n: 203, s: "available" },
    { n: 203, s: "occupied" },
    { n: 204, s: "blocked" },
    { n: 205, s: "available" },
    { n: 206, s: "dirty" },
  ];

  const floor1Wing2 = [
    { n: 101, s: "available" },
    { n: 102, s: "available" },
    { n: 103, s: "available" },
    { n: 104, s: "available" },
    { n: 105, s: "available" },
    { n: 106, s: "available" },
    { n: 101, s: "available" },
    { n: 102, s: "occupied" },
    { n: 103, s: "occupied" },
    { n: 104, s: "dirty" },
    { n: 105, s: "dirty" },
    { n: 106, s: "maintenance" },
  ];

  const floor2Wing2 = [
    { n: 201, s: "available" },
    { n: 202, s: "available" },
    { n: 203, s: "available" },
    { n: 204, s: "available" },
    { n: 205, s: "maintenance" },
    { n: 210, s: "blocked" },
    { n: 101, s: "available" },
    { n: 102, s: "available" },
    { n: 103, s: "available" },
    { n: 104, s: "available" },
    { n: 105, s: "available" },
    { n: 106, s: "blocked" },
  ];

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
      50 rooms across your property
    </p>
  </div>

  <div class="flex items-start justify-between">
    <div class="flex flex-col gap-4 flex-1 min-w-0">
      <div class="flex items-center">
        <div class="w-6 flex items-center justify-center mr-3 shrink-0">
          <span class="-rotate-90 text-xs font-semibold text-gray-600 tracking-wider whitespace-nowrap">
            Floor 1
          </span>
        </div>
        <div class="grid grid-cols-[repeat(17,min-content)] gap-2.5">
          {#each floor1Wing1 as room}
            <RoomTile number={room.n} status={room.s as any} />
          {/each}
        </div>
      </div>

      <div class="flex items-center">
        <div class="w-6 flex items-center justify-center mr-3 shrink-0">
          <span class="-rotate-90 text-xs font-semibold text-gray-600 tracking-wider whitespace-nowrap">
            Floor 2
          </span>
        </div>
        <div class="grid grid-cols-[repeat(17,min-content)] gap-2.5">
          {#each floor2Wing1 as room}
            <RoomTile number={room.n} status={room.s as any} />
          {/each}
        </div>
      </div>
    </div>

    <div class="flex flex-col shrink-0">
      <div class="flex items-start gap-6">
        <div class="flex flex-col gap-4 shrink-0">
          <div class="flex items-center">
            <div class="w-6 flex items-center justify-center mr-3 shrink-0">
              <span class="-rotate-90 text-xs font-semibold text-gray-600 tracking-wider whitespace-nowrap">
                Floor 1
              </span>
            </div>
            <div class="grid grid-cols-[repeat(6,min-content)] gap-1">
              {#each floor1Wing2 as room}
                <RoomTile number={room.n} status={room.s as any} />
              {/each}
            </div>
          </div>

          <div class="flex items-center">
            <div class="w-6 flex items-center justify-center mr-3 shrink-0">
              <span class="-rotate-90 text-xs font-semibold text-gray-600 tracking-wider whitespace-nowrap">
                Floor 2
              </span>
            </div>
            <div class="grid grid-cols-[repeat(6,min-content)] gap-1">
              {#each floor2Wing2 as room}
                <RoomTile number={room.n} status={room.s as any} />
              {/each}
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center pl-2 shrink-0">
          <div class="relative w-24 h-24 mt-2">
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
                stroke-dasharray="4, 100"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-xl font-extrabold text-gray-900 leading-none">200</span>
              <span class="text-[10px] font-bold text-gray-600 leading-tight">Rooms</span>
              <span class="text-[10px] font-bold text-gray-600 leading-tight">Total</span>
            </div>
          </div>
          <span class="text-xs font-bold text-gray-800 mt-3">4% Occupied</span>
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
  </div>
</div>
