import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { getMountValue, isMount, selectMounts } from '@abcnews/mount-utils';
import Blocks from './components/Blocks.svelte';
import HeaderReplacement from './components/HeaderReplacement.svelte';
import { parse } from '@abcnews/alternating-case-to-object';
import { mount } from 'svelte';
function getEls(firstEl) {
  const els = [];
  let el = firstEl.nextElementSibling;
  let hasMoreContent = true;

  while (hasMoreContent && el) {
    if (isMount(el, `personblockend`, true)) {
      hasMoreContent = false;
    } else {
      els.push(el);
      el = el.nextElementSibling;
    }
  }
  return els;
}

whenOdysseyLoaded.then(() => {
  // PERSON BLOCKS
  const blocks = selectMounts('personblock');
  const parsedBlocks = [];
  for (let i = 0; i < blocks.length; i += 2) {
    const [blockStart,blockEnd] = blocks.slice(i, i + 2);
    blockStart.classList.add('ibvt-reset-mount')
    blockEnd.classList.add('ibvt-reset-mount')
    const els = getEls(blockStart);

    parsedBlocks.push({
        id: i,
        HTMLElements: els,
    });
  }
  if(parsedBlocks.length){
    mount(Blocks,{
      target: blocks[0],
      props:{blocks: parsedBlocks}
    })
  }

  // HEADER REPLACEMENT
  const headerTargets = selectMounts('graphicheader');

  if (headerTargets) {
    headerTargets.forEach(headerTarget => {
      const props = parse(getMountValue(headerTarget));
      if(props.fullwidth){
        headerTarget.classList.add('u-full');
      }
      headerTarget.classList.add('ibvt-reset-mount')
      mount(HeaderReplacement, {
        target: headerTarget,
        props: props
      });
    })
  }
});

if (process.env.NODE_ENV === 'development') {
  console.debug(`[interactive-bondi-victim-tribute] public path: ${__webpack_public_path__}`);
}
