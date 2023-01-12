<script>
    import { createEventDispatcher } from "svelte";
    export let value;
    let dispatch = createEventDispatcher();
</script>

<div class="cta">
    <input type="search" bind:value placeholder="Enter a business name" />
    <button on:click={() => dispatch("go-edit")}>Go</button>
</div>

<style>
    .cta {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .cta > button {
        background-color: #0066ff;
        padding: 0.8rem;
        font-size: 1.2rem;
        font-weight: 600;
        max-width: 60vw;
    }
    .cta > input {
        padding: 0.8rem;
        /* padding-left: 1rem; */
        background-color: white;
        border-radius: 8px;
        font-size: 1.05rem;
        max-width: 60vw;
        color: black;
    }
</style>
