<script>
	import Stub from "./Stub.svelte";

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

</script>

<style>
	.draggable {
		user-select: none;
		position: relative;
		border: solid 1px gray;
		cursor: move;
		width: 300px;
		height: 300px;
	}

	#draggableStub {
        --r: 25px; /* cut size */
        height: 200px;
        aspect-ratio: 1.2;
        border-radius: 20px;
        background: #F07818;
        mask: radial-gradient(var(--r) at var(--r),#0000 calc(100% - 1px),#000) calc(-1*var(--r));
    }

</style>

<svelte:window on:mouseup={stop} on:mousemove={move}  />
<!-- figure out the HTML element I should use for this -->
<div id="draggableStub" onmousedown={start} onmouseup={finish} style="left: {left}px; top: {top}px;" class="draggable">
	<div style="background: url({path}/{item.filename}); width: 100px; height: 100px; background-size: 100px auto; background-repeat: no-repeat; background-position: center center;"></div>
	<!-- currently there's a problem with relying mouse click 
	 	 when the click occurs on the image, works fine in div -->
	<!-- <Stub {path} {item} /> -->
	<!-- <img src={`${path}/${item.filename}`} alt='image' onmousedown={start} onmouseup={finish} style="left: {left}px; top: {top}px;" class="draggable">/> -->
</div>
