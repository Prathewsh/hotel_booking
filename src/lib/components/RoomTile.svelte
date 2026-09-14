<script lang="ts">
  let {
    number,
    status = "available",
    onclick,
  }: {
    number: string | number;
    status?: "available" | "occupied" | "dirty" | "maintenance" | "blocked";
    onclick?: () => void;
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
  {onclick}
  class={`w-[38px] h-[42px] flex items-center justify-center rounded text-xs font-semibold shadow-sm hover:shadow-md hover:brightness-95 cursor-pointer border transition-shadow ${statusColors[status]}`}
>
  {number}
</button>
