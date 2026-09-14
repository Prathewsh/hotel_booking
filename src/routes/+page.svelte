<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import ActionGrid from '$lib/components/ActionGrid.svelte';
  import OperationalOverview from '$lib/components/OperationalOverview.svelte';
  import RoomInteractiveFloorView from '$lib/components/RoomInteractiveFloorView.svelte';
  import BottomWidgets from '$lib/components/BottomWidgets.svelte';
</script>

<div class="w-full">
  <Header />

  <main class="px-6 pb-10">
    <div class="flex items-center space-x-2 mb-4">
      <h1 class="text-2xl font-bold text-gray-900">Main Dashboard</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 mb-4">
      <ActionGrid />
      <OperationalOverview />
    </div>

    <RoomInteractiveFloorView />
    <BottomWidgets />
  </main>
</div>
