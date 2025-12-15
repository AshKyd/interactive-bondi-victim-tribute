<script>
  import { onMount } from 'svelte';

  let { src,width,height } = $props();
</script>

<img src={src} alt="" aria-hidden="true" width={width} height={height}>

<style lang="scss">
  img{
    width:100%;
    height:auto;
  }
</style>
