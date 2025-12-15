<script>
  /**
   * @file
   * Custom masonry module. This is not performant, and confuses reading order.
   * Let's never do this again.
   */
  import Block from './Block.svelte';
  import { onMount, untrack } from 'svelte';

  let { blocks } = $props();
  let blockSizes = $state([]);
  let width = $state(0);
  let rootNode = $state();

  let columns = $state(false);
  let hasRun = $state(false);
  $effect(() => {
    if (hasRun) {
      return;
    }
    hasRun = true;
    if (width < 620) {
      columns = false;
    }
    const col1 = [];
    const col2 = [];
    let col1Height = 0;
    let col2Height = 0;
    let i = 0;
    blocks.forEach((block, i) => {
      const estimatedHeight = block.HTMLElements.reduce((height, element) => {
        if (element.classList.contains('ImageEmbed')) {
          return height + 5;
        }
        if (element.classList.contains('Quote')) {
          return height + 2;
        }
        return height + 1;
      }, 0);
      console.log({ col1Height, col2Height, estimatedHeight, block });
      if (col1Height <= col2Height) {
        col1.push(block);
        col1Height += estimatedHeight;
        console.log('putting in col1');
      } else {
        col2.push(block);
        col2Height += estimatedHeight;
        console.log('putting in col2');
      }
    });
    columns = { col1, col2 };
  });
</script>

<div class="blocks" bind:clientWidth={width} bind:this={rootNode}>
  {#if hasRun && columns && width >= 620}
    <div class="column column1">
      {#if width}
        {#each columns.col1 as item}
          <Block {...item} />
        {/each}
      {/if}
    </div>
    <div class="column col2">
      {#if width}
        {#each columns.col2 as item}
          <Block {...item} />
        {/each}
      {/if}
    </div>
  {:else}
    <div class="column col-mobile">
      {#if width}
        {#each blocks as item}
          <Block {...item} />
        {/each}
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  .blocks {
    display: flex;
    gap: 50px;
  }
  .column {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
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
      line-height: inherit;
      font-family: inherit;
      margin: 0;
      padding: 0;
    }
  }
  .blocks {
    margin-bottom: 50px;
  }
</style>
