<script lang="ts">
  let {
    number,
    status = "available",
  }: {
    number: string | number;
    status?: "available" | "occupied" | "dirty" | "maintenance" | "blocked";
  } = $props();

  const statusColors = {
    available: "bg-[#a3d1b6] text-emerald-900 border-[#8fc4a5]",
    occupied: "bg-[#5c85d6] text-white border-[#4d75c2]",
    dirty: "bg-[#e56b6f] text-white border-[#d35b5e]",
    maintenance: "bg-[#f4a261] text-white border-[#e09151]",
    blocked: "bg-[#a6a6a6] text-white border-[#959595]",
  };
</script>

<button
  class={`w-[38px] h-[42px] flex items-center justify-center rounded text-xs font-semibold shadow-sm transition-transform hover:-translate-y-0.5 border ${statusColors[status]}`}
>
  {number}
</button>
