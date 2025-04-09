<script>
  let { data } = $props();
</script>

Welcome to my page. Check out my ticket stubs and travel tags.

<ul>
  <li><a href="./{data.username}/tags">Tags</a></li>
  <li><a href="./{data.username}/stubs">Stubs</a></li>
  <li><a href="./{data.username}/carousel">Carousel</a></li>
  <li><a href="./{data.username}/vie">Vie</a></li>
</ul>
