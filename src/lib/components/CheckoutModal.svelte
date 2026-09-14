<script lang="ts">
  import { roomState } from "$lib/stores/roomStore.svelte";

  let { isOpen = $bindable(false) } = $props();

  let selectedRoom = $state("");
  let showSuccessModal = $state(false);

  const occupiedRooms = $derived(
    roomState.rooms.filter((r) => r.status === "occupied"),
  );

  function handleCheckout() {
    if (!selectedRoom) return;

    const idx = roomState.rooms.findIndex((r) => r.code === selectedRoom);
    if (idx !== -1) {
      roomState.rooms[idx].status = "available";
    }

    showSuccessModal = true;
    selectedRoom = "";
  }

  function handleCloseSuccess() {
    showSuccessModal = false;
    isOpen = false;
  }
</script>

{#if isOpen}
  <div
    class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 flex items-center justify-center p-4"
  >
    <div
      class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col w-full max-w-md relative"
    >
      <button
        onclick={() => (isOpen = false)}
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path></svg
        >
      </button>

      <h2 class="text-[15px] font-bold text-[#1e293b] mb-4">Guest Check-Out</h2>

      {#if occupiedRooms.length === 0}
        <div class="text-sm text-gray-500 italic mb-4">
          No rooms are currently occupied.
        </div>
      {:else}
        <div class="flex flex-col gap-3 mb-6">
          <div class="relative">
            <label
              for="checkout-room-select"
              class="absolute -top-2 left-3 bg-white px-1 text-[11px] font-semibold text-slate-500 z-10"
              >Select Room to Vacate</label
            >
            <select
              id="checkout-room-select"
              bind:value={selectedRoom}
              class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:border-gray-300 bg-white cursor-pointer"
            >
              <option value="">Select a room</option>
              {#each occupiedRooms as r}
                <option value={r.code}>{r.code} — {r.type}</option>
              {/each}
            </select>
          </div>
        </div>

        <button
          onclick={handleCheckout}
          disabled={!selectedRoom}
          class="w-full bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-all text-sm"
        >
          Confirm Check-Out
        </button>
      {/if}
    </div>
  </div>

  {#if showSuccessModal}
    <div
      class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div
        class="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl flex flex-col items-center text-center"
      >
        <div
          class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path></svg
          >
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">
          Check-Out Complete!
        </h3>
        <p class="text-sm text-gray-600 font-medium mb-6">
          The room has been successfully vacated.
        </p>
        <button
          onclick={handleCloseSuccess}
          class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-sm transition-colors text-sm"
        >
          Done
        </button>
      </div>
    </div>
  {/if}
{/if}
