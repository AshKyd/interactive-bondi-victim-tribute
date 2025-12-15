<script>
  import SVGLoader from './SVGLoader.svelte';

  let { mobileratio, desktopratio, version } = $props();

  function parseAspectRatio(ratio = '16x9') {
    const [width, height] = ratio.split('x');
    return `${width} / ${height}`;
  }

  let width = $state(0);
  const isMobile = $derived.by(() => width < 700);
  const ratio = $derived.by(() => parseAspectRatio(isMobile ? mobileratio : desktopratio));
  let svgUrl = $derived.by(
    () =>
      `https://www.abc.net.au/res/sites/news-projects/interactive-bondi-victim-tribute/assets/header-${isMobile ? 'desktop' : 'mobile'}.svg?v=${version || '0'}`
  );
</script>

<div class="ibvt-header-replacement" bind:clientWidth={width} style:aspect-ratio={ratio}>
  {#if width}
    <SVGLoader src={svgUrl} />
  {/if}
</div>

<style lang="scss">
  :global {
    .Header{
      margin:0 !important;
    }
    .Header-content{
      h1 {
        clip: rect(1px, 1px, 1px, 1px);
        clip-path: inset(50%);
        height: 1px;
        width: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
      }
      .Header-meta,
      .Header-byline{
        display:none;
      }
    }
  }
  </style>