<script>
    let { path, item = {'filename': ''}, width, height } = $props();

</script>
<img loading="lazy" src="{path}/{item.filename}"
     alt='ticket stub for {item.filename}'
        width={width}
        height={height}
	 />

<style>
    img {
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
        text-align: center;
        display: block;
        margin: auto;
    }
</style>