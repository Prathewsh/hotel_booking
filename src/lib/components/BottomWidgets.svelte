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
    <h2 class="text-base font-bold text-gray-800 mb-4">Quick Room Status Changer & Actions</h2>
    
    <div class="flex gap-3 mb-4 flex-grow">
      <div class="flex-1 relative">
        <label for="room-select" class="absolute -top-2 left-2 bg-white px-1 text-[10px] font-bold text-gray-500">Room #</label>
        <div class="relative">
          <input type="text" id="room-select" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-primary focus:ring-0 outline-none" value="-" placeholder="Enter number">
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>
      
      <button class="bg-[#a3d1b6] text-emerald-900 font-semibold text-xs px-4 py-2 rounded-lg flex items-center shadow-sm w-36">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        Cleaning done, ready<br/>to serve
      </button>
    </div>
    
    <div class="grid grid-cols-2 gap-3 mt-auto">
      <button class="bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs py-2.5 rounded-lg shadow-sm transition-colors">
        Set all Dirty to Cleaning
      </button>
      <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-2.5 rounded-lg shadow-sm transition-colors">
        View All Maintenance
      </button>
    </div>
  </div>
</div>
