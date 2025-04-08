<script>
    let { data } = $props();
</script>

Checkout our users:

<ul>
    {#each data.usernames as row}
    <li><a href="./u/{row.username}">{row.username}</a></li>
    {/each}
</ul>
