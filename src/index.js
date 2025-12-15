import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { isMount, selectMounts } from '@abcnews/mount-utils';
import Block from './components/Block.svelte';
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
  const blocks = selectMounts('personblock');

  for (let i = 0; i < blocks.length; i += 2) {
    const [blockStart] = blocks.slice(i, i + 2);
    const els = getEls(blockStart);
    console.log(els);

    mount(Block, {
      target: blockStart,
      props: {
        id: i,
        HTMLElements: els
      }
    });
  }
});

if (process.env.NODE_ENV === 'development') {
  console.debug(`[interactive-bondi-victim-tribute] public path: ${__webpack_public_path__}`);
}
