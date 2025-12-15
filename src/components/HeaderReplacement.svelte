<script>
  import SVGLoader from './SVGLoader.svelte';

  let { fullwidth = false, mobileratio, desktopratio, version } = $props();

  function parseAspectRatio(ratio = '16x9') {
    const [width, height] = ratio.split('x');
    return { width, height };
  }

  let width = $state(0);
  const isMobile = $derived.by(() => width < 620);
  const wh = $derived.by(() => parseAspectRatio(isMobile ? mobileratio : desktopratio));
  let svgUrl = $derived.by(
    () =>
      `https://www.abc.net.au/res/sites/news-projects/interactive-bondi-victim-tribute/assets/header-${isMobile ? 'mobile' : 'desktop'}-${fullwidth ? 'full' : 'content'}.svg?v=${version || '0'}`
  );
</script>

<div class="measure" bind:clientWidth={width}></div>

<div class="ibvt-header-replacement">
  {#if width}
    <SVGLoader src={svgUrl} ...wh />
  {/if}
</div>

<style lang="scss">
  .measure {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 0;
  }
  :global {
    #webpack-dev-server-client-overlay {
      display: none;
    }
    .Header {
      margin: 0 !important;
    }
    .Header-content {
      margin: 12px auto 42px;
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
      .Header-meta {
        margin: 0 !important;
        text-align: center;
        & > * {
          margin: 0 !important;
          display: inline-block;
        }
      }
      .Header-byline {
        display: block;
        &,
        & > * {
          margin: 0 !important;
        }
        ul {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
      }
    }
  }
  .ibvt-header-replacement {
    margin: 0 16px;
  }
</style>
