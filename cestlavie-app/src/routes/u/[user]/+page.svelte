<script>
    let { data } = $props();

</script>

Welcome to my page.

Check out my ticket stubs and travel tags.

<ul>
    <li><a href="./{data.user}/tags">Tags</a></li>
    <li><a href="./{data.user}/stubs">Stubs</a></li>
    <li><a href="./{data.user}/carousel">Carousel</a></li>
    <li><a href="./{data.user}/vie">Vie</a></li>
</ul>
