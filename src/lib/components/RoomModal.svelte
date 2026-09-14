<script lang="ts">
  type Status = 'available' | 'occupied' | 'dirty' | 'maintenance' | 'blocked';

  let {
    roomNumber,
    currentStatus,
    onClose,
    onSave,
  }: {
    roomNumber: string | number;
    currentStatus: Status;
    onClose: () => void;
    onSave: (status: Status) => void;
  } = $props();

  let selected = $state<Status>(currentStatus);

  const statuses: { value: Status; label: string; color: string; bg: string }[] = [
    { value: 'available', label: 'Available', color: 'bg-[#a3d1b6] border-[#8fc4a5]', bg: 'hover:bg-[#e8f5ed]' },
    { value: 'occupied', label: 'Occupied', color: 'bg-[#5c85d6] border-[#4d75c2]', bg: 'hover:bg-[#e8eef8]' },
    { value: 'dirty', label: 'Dirty', color: 'bg-[#e56b6f] border-[#d35b5e]', bg: 'hover:bg-[#fce8e8]' },
    { value: 'maintenance', label: 'Maintenance', color: 'bg-[#f4a261] border-[#e09151]', bg: 'hover:bg-[#fef3e6]' },
    { value: 'blocked', label: 'Blocked', color: 'bg-[#a6a6a6] border-[#959595]', bg: 'hover:bg-[#f0f0f0]' },
  ];

  function handleSave() {
    onSave(selected);
    onClose();
  }

  function handleBackdrop(e: MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') onClose();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
  onclick={handleBackdrop}
  role="dialog"
  aria-modal="true"
>
  <div class="bg-white rounded-xl shadow-2xl w-[360px] overflow-hidden animate-in">
    <div class="px-5 pt-5 pb-4">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-bold text-gray-900">Room {roomNumber}</h3>
          <p class="text-xs text-gray-500 font-medium mt-0.5">Update room status</p>
        </div>
        <button onclick={onClose} class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div class="flex flex-col gap-2">
        {#each statuses as s}
          <button
            onclick={() => selected = s.value}
            class={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all cursor-pointer ${selected === s.value ? 'border-gray-300 bg-gray-50 shadow-sm' : 'border-transparent ' + s.bg}`}
          >
            <div class={`w-4 h-4 rounded-full border-2 ${s.color} shrink-0`}></div>
            <span class="text-sm font-semibold text-gray-800">{s.label}</span>
            {#if selected === s.value}
              <svg class="w-4 h-4 text-emerald-600 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
            {/if}
          </button>
        {/each}
      </div>
    </div>

    <div class="px-5 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
      <button onclick={onClose} class="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-white transition-colors">
        Cancel
      </button>
      <button onclick={handleSave} class="flex-1 py-2.5 rounded-lg bg-[#1e293b] text-white text-sm font-semibold hover:bg-[#334155] transition-colors">
        Save
      </button>
    </div>
  </div>
</div>

<style>
  .animate-in {
    animation: modalIn 0.2s ease-out;
  }
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
</style>
