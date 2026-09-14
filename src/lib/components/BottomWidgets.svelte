<script lang="ts">
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
    <h2 class="text-[15px] font-bold text-[#1e293b] mb-4">Quick Room Status Changer & Actions</h2>
    
    <div class="flex items-stretch gap-3 mb-4">
      <div class="flex-1 relative">
        <label for="room-select" class="absolute -top-2 left-3 bg-white px-1 text-[11px] font-semibold text-slate-500 z-10">Room #</label>
        <div class="relative h-full">
          <input type="text" id="room-select" class="w-full h-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-gray-300" value="-">
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>
      
      <button class="bg-[#a3ccaf] text-[#0f3d24] font-semibold text-[11px] py-1.5 px-2 rounded-lg flex items-center relative shadow-sm w-[130px] shrink-0">
        <svg class="w-3.5 h-3.5 absolute left-2 text-[#0f3d24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        <div class="flex-1 text-center leading-[1.2rem]">
          Cleaning done,<br/>ready<br/>to serve
        </div>
      </button>
    </div>
    
    <div class="grid grid-cols-2 gap-3 mt-auto">
      <button class="bg-[#ffe8e8] hover:bg-rose-100 text-[#a31a38] font-bold text-[12px] py-2.5 rounded-lg transition-colors">
        Set all Dirty to Cleaning
      </button>
      <button class="bg-[#f4f6f8] hover:bg-slate-200 text-[#334155] font-bold text-[12px] py-2.5 rounded-lg transition-colors">
        View All Maintenance
      </button>
    </div>
  </div>
</div>
