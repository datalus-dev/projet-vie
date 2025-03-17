<script>
    let { data } = $props()
    let { colors, contents } = $derived(data)
  </script>
  
  <h1>Welcome to Supabase!</h1>
  <!-- <h2>Colors</h2>
  <ul>
    {#each colors as color}
      <li>{color.name}</li>
    {/each}
  </ul> -->

  <h2>Travel</h2>
  <ul>
    {#each contents as content}
      <li>{content.content['origin']}</li>
    {/each}
  </ul>