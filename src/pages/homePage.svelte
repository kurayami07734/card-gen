<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
</script>

<div class="background" />
<section>
    <div class="hero">
        <h1>Make a business card in minutes</h1>
        <h2>No Signup required!</h2>
    </div>
    <div class="cta">
        <button on:click={() => dispatch("go-search")}>Go</button>
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
    h2 {
        font-size: 46px;
        font-weight: 300;
        text-align: center;
    }
    .background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        background-image: url("/bg.webp");
        background-size: cover;
        filter: grayscale(1) brightness(0.4);
    }
    .cta {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .cta > button {
        background-color: #0066ff;
        color: white;
        padding: 1rem;
        font-size: 1.5rem;
        font-weight: 600;
        max-width: 60vw;
    }
</style>
