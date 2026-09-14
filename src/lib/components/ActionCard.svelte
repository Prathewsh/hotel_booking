<script lang="ts">
  import type { Snippet } from 'svelte';

  let { 
    title = '', 
    iconBgColor = 'bg-gray-100', 
    iconColor = 'text-gray-500', 
    badge = null,
    icon 
  }: { 
    title: string; 
    iconBgColor?: string; 
    iconColor?: string; 
    badge?: { text: string; colorClass: string } | null;
    icon: Snippet;
  } = $props();
</script>

<button class="relative bg-white rounded-xl py-5 px-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center justify-center w-full gap-3 overflow-hidden group">
  {#if badge}
    <div class={`absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${badge.colorClass}`}>
      {badge.text}
    </div>
  {/if}
  
  <div class={`w-10 h-10 rounded-full flex items-center justify-center ${iconBgColor} ${iconColor} group-hover:scale-110 transition-transform duration-200`}>
    {@render icon()}
  </div>
  
  <span class="text-xs font-semibold text-gray-800 text-center leading-tight">
    {title}
  </span>
</button>
