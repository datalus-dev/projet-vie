<script>
    let { path, item = {'filename': ''}, width, height } = $props();

</script>
<img loading="lazy" src="{path}/{item.filename}"
     alt='ticket stub for {item.filename}'
        width={width}
        height={height}
	 />