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
    .ibvt-reset-mount:not(.u-full) {
      width: 100% !important;
    }
    .ibvt-reset-mount {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }

    // BUG: how do we turn off drop caps?
    [class*='u-richtext'] > .u-dropcap::first-letter {
      float: none;
      font-size: inherit;
      font-weight: inherit;
      padding: none;
      line-height: inherit;
      font-family: inherit;
      margin: 0;
    }
  }
  .blocks {
    margin-bottom: 50px;
  }
</style>
