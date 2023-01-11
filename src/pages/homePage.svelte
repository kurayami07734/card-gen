<script>
    import { createEventDispatcher } from "svelte";
    let value = "";
    const dispatch = createEventDispatcher();
</script>

<div class="background" />
<section>
    <div class="hero">
        <h1>Make a business card in minutes</h1>
    </div>
    <div class="cta">
        <input type="search" bind:value placeholder="Try it out!" />
        <button on:click={() => dispatch("go-search", value)}>Go</button>
    </div>
</section>

<style>
    section {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        /* z-index: 2; */
        height: 91vh;
    }
    h1 {
        font-size: 60px;
        text-align: center;
    }
    .background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        background-image: url("../assets/bg.webp");
        background-size: cover;
        filter: grayscale(1) brightness(0.40);
    }
    .cta {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .cta > button {
        background-color: #0066ff;
        padding: 1rem;
        font-size: 1.5rem;
        font-weight: 600;
        max-width: 60vw;
    }
    .cta > input {
        padding: 0.8rem;
        /* padding-left: 1rem; */
        background-color: white;
        border-radius: 8px;
        font-size: 1.5rem;
        max-width: 60vw;
        color: black;
    }
</style>
