<script>
  import { onMount } from 'svelte';

  let { HTMLElements, id } = $props();
  let rootNode = $state();
  onMount(() => {
    if (rootNode) {
      Array.from(HTMLElements).forEach(el => {
        const className = el.getAttribute('class');
        if (className === 'Quote') {
          const bq = document.createElement('blockquote');
          const [quote, ...attribution] = el.textContent.trim().split(' - ');
          bq.textContent = quote;
          if (attribution.length) {
            const attr = document.createElement('cite');
            attr.textContent = attribution.join(' - ');
            bq.appendChild(attr);
          }
          rootNode.appendChild(bq);
          return;
        }
        return rootNode.appendChild(el);
      });
    }
  });
</script>

<div class="ibvt-block ibvt-block--{id}" bind:this={rootNode}></div>

<style lang="scss">
  .ibvt-block {
    margin: 0 16px;
    @media (max-width: 619px) {
      &--0::before {
        content: '';
        display: block;
        margin: 48px auto;
        width: 172px;
        border-bottom: 1px solid #979797;
      }
    }
    &::after {
      content: '';
      display: block;
      margin: 32px auto 64px;
      width: 172px;
      border-bottom: 1px solid #979797;
    }
    :global {
      & > * {
        margin: 0;
        margin-bottom: 16px;
      }
      .ImageEmbed.u-pull {
        width: 100%;
      }
      img {
        border-radius: 12px;
        width: 100%;
        height: auto;
      }
      h3 {
        color: #000;
        font-family: 'ABCSans Condensed', sans-serif;
        font-size: 48px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin-bottom: 10px;
      }
      blockquote {
        color: #2f6a5f;
        font-family: ABCSerif;
        font-size: 28px;
        font-style: italic;
        font-weight: 450;
        line-height: 125%; /* 40px */
        @media (min-width: 620px) {
          margin-bottom: 34px;
        }
        cite {
          color: #000;
          font-family: ABCSans;
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: 177%;
          display: block;
          margin: 0;
        }
      }

      // Max 7 blockquotes
      h3 + .Quote + .Quote,
      h3 + .Quote + .Quote + .Quote + .Quote,
      h3 + .Quote + .Quote + .Quote + .Quote + .Quote + .Quote {
        text-align: right;
      }
    }
  }
</style>
