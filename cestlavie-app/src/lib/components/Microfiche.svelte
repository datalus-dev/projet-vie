<!-- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap -->
<script>
  import StubCard from './StubCard.svelte';
  let { items = [], path } = $props();

  const dragstart_handler = (ev) => {
    // TODO: add dragging logic now

    // ev.preventDefault()
    console.log('dragStart');
    // Change the source element's background color to signify drag has started
    ev.currentTarget.style.border = 'dashed';
    // Add the id of the drag source element to the drag data payload so
    // it is available when the drop event is fired
    ev.dataTransfer.setData('text', ev.target.id);
    // Tell the browser both copy and move are possible
    ev.effectAllowed = 'copyMove';
  };

  const dragend_handler = (ev) => {
    console.log('dragEnd');
    // Restore source's border
    ev.target.style.border = 'solid black';
  };
</script>

<article id="stub">
  <ul>
    {#each items as item}
      <li>
        <div
          draggable="true"
          id="src_copy"
          ondragstart={dragstart_handler}
          ondragend={dragend_handler}
        >
          <StubCard {path} {item} />
        </div>
      </li>
    {/each}
  </ul>
</article>
<button class="btn">Add Me</button>

<style>
  ul {
    overflow: auto;
    scroll-snap-type: both mandatory;
    overscroll-behavior-x: contain;
    padding: 75px;
  }

  @layer pageSetup {
    article {
      display: flex;
      gap: 2vw;
    }
    div {
      flex: 1;
    }
    ul {
      display: grid;
      gap: 6.25vw;
      padding: 12.5vw;
      box-sizing: border-box;
      border: 1px solid;
      grid-template-columns: repeat(5, 1fr);
      /* background: conic-gradient(
        at bottom left,
        red 0deg,
        yellow 15deg,
        green 30deg,
        blue 45deg,
        purple 60deg,
        magenta 75deg
        ); */
      background-attachment: local;
      margin: auto;
      width: 20vw;
      height: 20vw;
    }
    li {
      scroll-snap-align: center;
      height: 12.5vw;
      width: 12.5vw;
      outline: 3px inset;
      list-style-type: none;
      background: white;
      font-family: monospace;
      font-size: 3rem;
      line-height: 12vw;
    }
  }
</style>
