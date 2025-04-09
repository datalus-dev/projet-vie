<script>
  let { isModalOpen = $bindable(), children } = $props();
</script>

<dialog class="modal">
  <div class="modal" class:modal-open={isModalOpen}>
    <div class="modal-box w-lg">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onclick={() => (isModalOpen = false)}>✕</button
        >
      </form>
      <div class="dialog">
        {@render children()}
      </div>
    </div>
  </div>
</dialog>

<style>
  button {
    color: #0009;
  }

  form {
    padding: 0.5rem;
  }

  .modal {
    display: grid;
  }
</style>
