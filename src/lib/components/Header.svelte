<script lang="ts">
  import { onMount } from 'svelte';

  import { uiState, roomState } from '$lib/stores/roomStore.svelte';

  let searchQuery = $state("");
  let searchInput = $state<HTMLInputElement | null>(null);
  let isSearchFocused = $state(false);
  let now = $state(new Date());
  let showQuickActions = $state(false);

  onMount(() => {
    const interval = setInterval(() => {
      now = new Date();
    }, 1000);
    return () => clearInterval(interval);
  });

  const formattedDateTime = $derived(
    now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) +
    ' | ' +
    now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  );

  const searchResults = $derived(
    searchQuery.trim() === "" 
      ? [] 
      : roomState.rooms.filter(r => 
          r.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
          r.type.toLowerCase().includes(searchQuery.toLowerCase())
        )
  );

  function getStatusColor(status: string) {
    switch (status) {
      case 'available': return 'bg-emerald-100 text-emerald-700';
      case 'occupied': return 'bg-rose-100 text-rose-700';
      case 'dirty': return 'bg-amber-100 text-amber-700';
      case 'maintenance': return 'bg-slate-100 text-slate-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }
</script>

<svelte:window onkeydown={(e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput?.focus();
    }
  }} />

<header
  class="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 mb-6"
>
  <div
    class="flex items-center bg-white rounded-full px-3 py-1.5 shadow-sm space-x-2 w-48 border border-gray-100"
  >
    <div
      class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
    >
      <img
        src="/images/raintech_logo.webp"
        alt="Hotel Logo"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="flex flex-col">
      <span class="text-sm font-semibold leading-tight">Raintech</span>
      <span
        class="text-[10px] text-gray-400 font-medium uppercase tracking-wider leading-tight"
        >Hotel</span
      >
    </div>
  </div>

  <div class="flex-1 max-w-xl mx-8 relative">
    <div
      class="absolute inset-y-0 left-3 flex items-center pointer-events-none"
    >
      <svg
        class="w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path></svg
      >
    </div>
    <input
      type="text"
      bind:this={searchInput}
      bind:value={searchQuery}
      onfocus={() => isSearchFocused = true}
      onblur={() => setTimeout(() => isSearchFocused = false, 200)}
      placeholder="Search guests, rooms, reservations, staff..."
      class="w-full bg-white rounded-full py-2 pl-10 pr-16 text-sm text-gray-700 shadow-sm border-transparent focus:border-primary focus:ring-0"
    />
    <div
      class="absolute inset-y-0 right-3 flex items-center pointer-events-none"
    >
      <span
        class="text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200"
        >Ctrl/Cmd K</span
      >
    </div>

    {#if isSearchFocused && searchQuery.trim() !== ""}
      <div class="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 overflow-hidden">
        {#if searchResults.length === 0}
          <div class="px-4 py-3 text-sm text-gray-500 text-center">No results found for "{searchQuery}"</div>
        {:else}
          <div class="px-3 pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rooms</div>
          {#each searchResults as room}
            <button 
              onclick={() => { 
                uiState.selectedRoomForCheckin = room.code; 
                uiState.checkinModalOpen = true; 
                isSearchFocused = false; 
                searchQuery = ""; 
              }}
              class="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center justify-between transition-colors"
            >
              <div class="flex flex-col">
                <span class="text-sm font-bold text-gray-800">{room.code}</span>
                <span class="text-xs text-gray-500">{room.type}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-semibold text-gray-700">₹{room.price.toLocaleString()}</span>
                <span class={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${getStatusColor(room.status)}`}>
                  {room.status}
                </span>
              </div>
            </button>
          {/each}
        {/if}
      </div>
    {/if}
  </div>

  <div class="flex items-center space-x-4">
    <div
      class="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100 text-sm font-medium text-gray-700"
    >
      <svg
        class="w-4 h-4 mr-2 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        ></path></svg
      >
      {formattedDateTime}
    </div>
    <div class="relative">
      <button
        onclick={() => showQuickActions = !showQuickActions}
        class="bg-[#2c4c7c] hover:bg-[#1f375a] text-white rounded-full px-4 py-2 text-sm font-medium flex items-center transition-colors shadow-sm"
      >
        <span class="mr-2">$</span>
        Quick Actions
      </button>

      {#if showQuickActions}
        <div class="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
          <button 
            onclick={() => { uiState.checkinModalOpen = true; showQuickActions = false; }} 
            class="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <svg class="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
            Guest Check-In
          </button>
          <button 
            onclick={() => { uiState.checkoutModalOpen = true; showQuickActions = false; }} 
            class="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <svg class="w-4 h-4 mr-2 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Guest Check-Out
          </button>
        </div>
      {/if}
    </div>
    <div class="relative">
      <button
        class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center"
      >
        <img
          src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
          alt="User Profile"
          class="w-full h-full object-cover"
        />
      </button>
      <div
        class="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#f4efeb]"
      ></div>
    </div>
  </div>
</header>
