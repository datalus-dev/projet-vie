<script>
  import markdownit from 'markdown-it';
  import StubImage from './StubImage.svelte';
  import Modal from './Modal.svelte';

  let { path, item, width = '200px', height = '200px' } = $props();

  const md = markdownit();
  let isModalOpen = $state(false);
</script>

<div class="stub card">
  <button onclick={() => (isModalOpen = true)}>
    <div>
      {#if item.filename}
        <div class="image">
          <StubImage {path} {item} {width} {height} />
        </div>
      {/if}
    </div>
  </button>
</div>
<Modal bind:isModalOpen>
  <div class="content">
    {#if item.filename}
      <StubImage {path} {item} width={''} height={''} />
    {/if}
    {#if item.description}
      <h2>Text from Image</h2>
      <p>{@html md.render(item.description)}</p>
    {/if}
  </div>
</Modal>

<style>
  .image {
    display: grid;
    place-items: center;
  }

  button:hover {
    cursor: pointer;
  }

  .stub {
    box-shadow:
      0 4px 8px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .content {
    color: #0009;
  }
</style>
