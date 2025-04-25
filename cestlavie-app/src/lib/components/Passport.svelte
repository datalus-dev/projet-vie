<script>
  let { title, emoji, spiralCount = 28, spiralColor = '#222' } = $props();
</script>


  <div class="passport">
    <div class="spiral-binding">
      {#each Array(spiralCount) as _, i}
        <div
          class="spiral"
          style="--spiral-color: {spiralColor}; --spiral-top: {i * (100 / spiralCount)}%;"
        ></div>
      {/each}
    </div>
    <div class="content">
      <h1 class="title">{title}</h1>
      <!-- <sup>&reg;</sup> -->
      <p class="emoji">{emoji}</p>
    </div>
  </div>


<style>
  .passport {
    width: 18rem; /* Adjust size as needed */
    height: 24rem; /* Adjust size maintaining aspect ratio */

    border-radius: 10px;
    position: relative; /* For positioning pseudo-elements and children */
    /* box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3); */
    overflow: hidden; /* Keep content clipped */
    padding-left: 30px; /* Make space for the binding */
    box-sizing: border-box; /* Include padding in width/height */
  }

  .content {
    background-color: #003366;
    padding: 25px 20px 20px 15px; /* Padding inside the binding */
    color: #daa520; /* Base gold color */
    font-family: 'Times New Roman', Times, serif; /* Serif font like the original */
    display: grid;
    justify-items: center;
    /* flex-direction: column; */
    height: 100%;
    box-sizing: border-box;
  }

  .title {
    font-size: 2rem; /* Adjust size */
    font-weight: bold;
    text-align: center;
    margin: 0 0 5px 0;
    /* Subtle metallic gradient */
    background: linear-gradient(135deg, #f0e68c, #daa520, #b8860b);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent; /* Make original text transparent */
  }

  .spiral-binding {
    position: absolute;
    top: 0;
    left: 1.75rem;
    height: 100%;
    width: 1rem;
    /* z-index: 10; */
  }

  .spiral {
    position: absolute;
    left: 0;
    top: var(--spiral-top);
    width: 2rem;
    height: 12px;
    background-color: transparent;
    border: 3px solid var(--spiral-color);
    border-radius: 50%;
    border-left: none;
    transform: translateX(-15px);
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  }

  .spiral::before {
    content: '';
    position: absolute;
    top: -3px;
    right: -3px;
    width: 6px;
    height: 12px;
    background-color: var(--notebook-color);
    border-radius: 0 3px 3px 0;
  }
  .emoji {
    font-size: 6rem;
  }
</style>
