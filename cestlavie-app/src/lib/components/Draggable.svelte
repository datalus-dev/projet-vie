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
	}
	
</style>

<svelte:window on:mouseup={stop} on:mousemove={move}  />
<div onmousedown={start} onmouseup={finish} style="left: {left}px; top: {top}px;" class="draggable">
	<!-- currently there's a problem with relying mouse click 
	 	 when the click occurs on the image, works fine in div -->
	<Stub {path} {item} />
	<!-- <img src={`${path}/${item.filename}`} alt='image' onmousedown={start} onmouseup={finish} style="left: {left}px; top: {top}px;" class="draggable">/> -->
</div>