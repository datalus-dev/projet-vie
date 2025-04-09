<script>
  let { children } = $props();
</script>

<div class="body">
  <header>
    <nav>
      <a href="/">Home</a>
    </nav>
  </header>

  {@render children()}
</div>

<style>
  .body {
    display: grid;
    place-items: center;
  }
</style>
