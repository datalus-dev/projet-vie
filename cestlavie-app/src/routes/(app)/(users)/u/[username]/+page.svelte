<script>
  let { data } = $props();
</script>

Welcome to my page. Check out my ticket stubs and travel tags.

<ul>
  <li><a href="./{data.username}/stubs">Stubs</a></li>
  <li><a href="./{data.username}/passport">Passport</a></li>
  <li><a href="./{data.username}/scrapbook">Scrapbook</a></li>
  <!-- <li><a href="./{data.username}/vie">Vie (wip)</a></li> -->
</ul>
