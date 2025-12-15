<script>
  import Masonry from 'svelte-bricks';
  import Block from './Block.svelte';

  let { blocks } = $props();
  let width = $state(0);
  const gap = 50;
  let columnWidth = $derived.by(() => (width < 620 ? width : width / 2 - gap / 2));
</script>

<div class="blocks" bind:clientWidth={width}>
  {#if width}
    <Masonry items={blocks} minColWidth={columnWidth} {gap}>
      {#snippet children({ item })}
        <Block {...item} />
      {/snippet}
    </Masonry>
  {/if}
</div>

<style lang="scss">
  :global {
    .ibvt-reset-mount {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      width: 100% !important;
    }
  }
</style>
