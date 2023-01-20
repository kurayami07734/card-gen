<script>
    import { createEventDispatcher } from "svelte";
    import { getTemplates } from "../firebase";
    // export let value;
    let dispatch = createEventDispatcher();
    let templatePromise = getTemplates();
</script>

{#await templatePromise then templates}
    <div class="preview">
        {#each templates as temp}
            <img
                src="data:image/svg+xml,{temp.svg}"
                alt="preview of design"
                on:click={() =>
                    dispatch("go-edit", { json: temp.json, svg: temp.svg })}
                on:keypress={() =>
                    dispatch("go-edit", { json: temp.json, svg: temp.svg })}
            />
        {/each}
    </div>
{:catch error}
    <p>{error.detail}</p>
{/await}
<div class="cta">
    <button on:click={() => dispatch("go-edit", { json: {}, svg: {} })}
        >Open blank design</button
    >
</div>

<style>
    .cta {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .preview {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin: 0.5rem;
    }
    .preview img {
        height: 25vh;
        width: 43.75vh;
        border: greenyellow solid 2px;
        cursor: pointer;
    }
</style>
