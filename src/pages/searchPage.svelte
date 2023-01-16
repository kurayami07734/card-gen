<script>
    import { createEventDispatcher } from "svelte";
    // export let value;
    let dispatch = createEventDispatcher();
</script>

<div class="cta">
    <button on:click={() => dispatch("go-edit")}>edit</button>
</div>

<style>
    .cta {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
