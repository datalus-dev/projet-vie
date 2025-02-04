<script>
    let { path, item = {'filename': ''}, width="200px", height="200px" } = $props();

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