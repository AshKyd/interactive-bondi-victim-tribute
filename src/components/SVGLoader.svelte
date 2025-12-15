<script>
  import { onMount } from 'svelte';

  let { src } = $props();
  let rootNode = $state();
  onMount(() => {
    fetch(src)
      .then(res => res.text())
      .then(text => {
        rootNode.innerHTML = text;
      });
  });
</script>

<div class="svg-wrapper" bind:this={rootNode}></div>

<style lang="scss">
.svg-wrapper :global(svg){
    animation:fadeIn .2s ease-in;
}
@keyframes fadeIn{
    from{
        opacity:0;
    }
    to:{
        opacity:1;
    }
}
</style>
