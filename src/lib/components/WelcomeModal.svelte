<script lang="ts">
  import { onMount } from 'svelte';

  let showWelcome = $state(false);

  onMount(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      showWelcome = true;
    }
  });

  function handleDismiss() {
    sessionStorage.setItem('hasSeenWelcome', 'true');
    showWelcome = false;
  }
</script>

{#if showWelcome}
  <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl p-8 shadow-xl flex flex-col items-center text-center max-w-md w-full relative">
      <div class="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center mb-5 border border-gray-100 shadow-sm">
        <img src="/images/raintech_logo.webp" alt="Raintech Logo" class="w-full h-full object-cover" />
      </div>
      <h2 class="text-2xl font-bold text-[#1e293b] mb-3">Welcome to Raintech Hotel</h2>
      <p class="text-sm text-gray-500 mb-8 leading-relaxed">
        Manage your bookings, overview the operational status of your rooms, and ensure your guests have a wonderful stay.
      </p>
      
      <button onclick={handleDismiss} class="w-full bg-[#2B4C7C] hover:bg-[#1f375a] text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all text-[15px]">
        Let's get started
      </button>
    </div>
  </div>
{/if}
