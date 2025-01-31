<!-- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap -->
<script>
    import Stub from "./Stub.svelte";
    let { items = [], path } = $props();

</script>

<article>
    <ul>
        {#each items as item}
            <li><Stub {path} {item} /></li>
        {/each}
    </ul>
    <div>
</article>
  

<style>
    ul {
    overflow: auto;
    scroll-snap-type: both mandatory;
    overscroll-behavior-x: contain;
    padding: 75px;
    }

    @layer pageSetup {
    article {
        display: flex;
        gap: 2vw;
    }
    div {
        flex: 1;
    }
    ul {
        display: grid;
        gap: 6.25vw;
        padding: 12.5vw;
        box-sizing: border-box;
        border: 1px solid;
        grid-template-columns: repeat(5, 1fr);
        background: conic-gradient(
        at bottom left,
        red 0deg,
        yellow 15deg,
        green 30deg,
        blue 45deg,
        purple 60deg,
        magenta 75deg
        );
        background-attachment: local;
        margin: auto;
        width: 20vw;
        height: 20vw;
    }
    li {
        scroll-snap-align: center;
        height: 12.5vw;
        width: 12.5vw;
        outline: 3px inset;
        list-style-type: none;
        background: white;
        font-family: monospace;
        font-size: 3rem;
        line-height: 12vw;
    }
}

</style>