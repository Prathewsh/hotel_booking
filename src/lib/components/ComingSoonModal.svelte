<script lang="ts">
  import type { Snippet } from 'svelte';
  let { 
    isOpen = $bindable(false), 
    featureName = '',
    iconBgColor = 'bg-blue-50',
    iconColor = 'text-blue-500',
    iconSnippet
  }: {
    isOpen?: boolean;
    featureName?: string;
    iconBgColor?: string;
    iconColor?: string;
    iconSnippet?: Snippet;
  } = $props();
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center w-full max-w-sm relative text-center">
      <button onclick={() => (isOpen = false)} class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      
      <div class={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center mb-4 ${iconColor} [&>svg]:w-8 [&>svg]:h-8`}>
        {#if iconSnippet}
          {@render iconSnippet()}
        {:else}
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
        {/if}
      </div>
      
      <h2 class="text-lg font-bold text-[#1e293b] mb-2">{featureName}</h2>
      <p class="text-sm text-gray-500 mb-6">This feature is currently under development and will be available in a future update.</p>
      
      <button onclick={() => (isOpen = false)} class="w-full bg-[#1F375A] hover:bg-[#111e32] text-white font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all text-sm">
        Got it
      </button>
    </div>
  </div>
{/if}
