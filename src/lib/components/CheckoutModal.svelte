<script lang="ts">
  import { roomState } from "$lib/stores/roomStore.svelte";

  let { isOpen = $bindable(false) } = $props();

  let selectedRoom = $state("");
  let showSuccessModal = $state(false);
  let checkedOutRoom = $state<any>(null);
  let invoiceNumber = $state("");
  let invoiceDate = $state("");

  const occupiedRooms = $derived(
    roomState.rooms.filter((r) => r.status === "occupied"),
  );

  function handleCheckout() {
    if (!selectedRoom) return;

    const idx = roomState.rooms.findIndex((r) => r.code === selectedRoom);
    if (idx !== -1) {
      checkedOutRoom = roomState.rooms[idx];
      roomState.rooms[idx].status = "available";
    }

    invoiceNumber = "INV-" + Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    
    const now = new Date();
    invoiceDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    showSuccessModal = true;
    selectedRoom = "";
  }

  function handleCloseSuccess() {
    showSuccessModal = false;
    isOpen = false;
  }

  function handlePrint() {
    const printContent = document.getElementById('invoice-receipt');
    if (!printContent) return;
    
    const printWindow = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Invoice</title>
            <scr` + `ipt src="https://cdn.tailwindcss.com"></scr` + `ipt>
          </head>
          <body onload="setTimeout(() => { window.print(); window.close(); }, 500)">
            <div class="max-w-xs mx-auto mt-10" style="font-family: monospace;">
              ${printContent.outerHTML}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
    }
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
        class="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl flex flex-col items-center text-center"
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
        <h3 class="text-lg font-bold text-gray-900 mb-1">
          Check-Out Complete!
        </h3>
        <p class="text-sm text-gray-500 font-medium mb-6">
          Room has been successfully vacated.
        </p>

        {#if checkedOutRoom}
          <div id="invoice-receipt" class="w-full bg-[#fdfdfc] border border-gray-200 shadow-sm p-6 mb-6 text-left font-mono relative overflow-hidden flex flex-col rounded-sm mx-auto">
            <div class="text-center mb-4 border-b-2 border-dashed border-gray-300 pb-4">
              <h4 class="font-bold text-lg uppercase tracking-widest text-gray-900">Raintech</h4>
              <p class="text-[10px] text-gray-500 uppercase">Hotel & Resort</p>
            </div>
            
            <div class="flex justify-between items-start mb-4 text-[11px]">
              <div>
                <p class="text-gray-500 uppercase">Inv No.</p>
                <p class="font-bold">{invoiceNumber}</p>
              </div>
              <div class="text-right">
                <p class="text-gray-500 uppercase">Date</p>
                <p class="font-bold">{invoiceDate}</p>
              </div>
            </div>
            
            <div class="border-b-2 border-dashed border-gray-300 pb-4 mb-4 flex flex-col gap-2 text-[11px]">
              <div class="flex justify-between items-start">
                <div class="flex flex-col">
                  <span class="font-bold text-gray-900 text-sm">{checkedOutRoom.code}</span>
                  <span class="text-gray-500 uppercase text-[10px]">{checkedOutRoom.type}</span>
                </div>
                <span class="font-bold text-sm">₹{checkedOutRoom.price.toLocaleString()}</span>
              </div>
              <div class="flex justify-between items-center text-gray-600 mt-2">
                <span>NIGHTS</span>
                <span>1</span>
              </div>
              <div class="flex justify-between items-center text-gray-600">
                <span>GST (18%)</span>
                <span>₹{Math.round(checkedOutRoom.price * 0.18).toLocaleString()}</span>
              </div>
            </div>
            
            <div class="flex justify-between items-center mb-6">
              <span class="text-sm font-bold text-gray-900 uppercase">Total</span>
              <span class="text-lg font-extrabold text-gray-900">₹{Math.round(checkedOutRoom.price * 1.18).toLocaleString()}</span>
            </div>
            
            <div class="flex justify-center opacity-70">
              <p class="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Paid in Full</p>
            </div>
          </div>
        {/if}

        <div class="flex flex-col gap-2 w-full">
          <button
            onclick={handlePrint}
            class="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl shadow-sm transition-colors text-sm flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Print Invoice
          </button>
          
          <button
            onclick={handleCloseSuccess}
            class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-colors text-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  {/if}
{/if}
