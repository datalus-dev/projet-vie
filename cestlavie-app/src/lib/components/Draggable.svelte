<script>
  import StubCard from './StubCard.svelte';

  let { left = 50, top = 50, item, path } = $props();

  let moving = $state(false);

  function start() {
    moving = true;
  }

  function stop() {
    moving = false;
  }

  function move(e) {
    if (moving) {
      left += e.movementX;
      top += e.movementY;
    }
  }

  function finish(e) {
    left -= left % 50;
    top -= top % 50;
  }

  function dragover_handler(ev) {
    console.log('dragOver');
    // Change the target element's border to signify a drag over event
    // has occurred
    ev.currentTarget.style.background = 'lightblue';
    ev.preventDefault();
  }

  function drop_handler(ev) {
    console.log('Drop');
    ev.preventDefault();
    // Get the id of drag source element (that was added to the drag data
    // payload by the dragstart event handler)
    var id = ev.dataTransfer.getData('text');
    console.log(id);
    // Copy the element if the source and destination ids are both "copy"
    if (id == 'src_copy' && ev.target.id == 'dest_copy') {
      var nodeCopy = document.getElementById(id).cloneNode(true);
      nodeCopy.id = 'newId';
      console.log('nodeCopy', nodeCopy);
      ev.target.appendChild(nodeCopy);
    }
  }

  let items = $state([item]);
</script>

<svelte:window on:mouseup={stop} on:mousemove={move} />
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div id="dest_copy" ondrop={drop_handler} ondragover={dragover_handler}>
  <!-- figure out the HTML element I should use for this -->
  {#each items as item, i}
    <div
      class="draggableStub draggable"
      onmousedown={start}
      onmouseup={finish}
      style="left: {left}px; top: {top}px;"
    >
      <div class="stubImageBg">
        <div class="stubImage" style="background-image: url({path}/{item.filename});"></div>
      </div>
    </div>
  {/each}
</div>

<!-- currently there's a problem with relying mouse click 
	 	 when the click occurs on the image, works fine in div -->
<!-- <Stub {path} {item} /> -->
<!-- <img src={`${path}/${item.filename}`} alt='image' onmousedown={start} onmouseup={finish} style="left: {left}px; top: {top}px;" class="draggable">/> -->

<style>
  .draggable {
    user-select: none;
    position: relative;
    cursor: move;
    /* border: solid 1px gray; */
    /* width: 300px;
		height: 300px; */
  }

  .draggableStub {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    --r: 25px; /* cut size */
    height: 200px;
    aspect-ratio: 1.2;
    border-radius: 20px;
    background: #f07818;
    mask: radial-gradient(var(--r) at var(--r), #0000 calc(100% - 1px), #000) calc(-1 * var(--r));
  }

  .stubImage {
    width: 100px;
    height: 100px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .stubImageBg {
    color: white;
    margin: 20px;
  }
</style>
