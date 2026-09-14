<script lang="ts">
  import { onMount } from 'svelte';

  let searchQuery = $state("");
  let now = $state(new Date());

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
</script>

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
      bind:value={searchQuery}
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
    <button
      class="bg-[#2c4c7c] hover:bg-[#1f375a] text-white rounded-full px-4 py-2 text-sm font-medium flex items-center transition-colors shadow-sm"
    >
      <span class="mr-2">$</span>
      Quick Actions
    </button>
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
