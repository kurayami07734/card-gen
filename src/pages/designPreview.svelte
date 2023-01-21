<script>
    import { createEventDispatcher } from "svelte";
    import { saveToTemplates, markDeleted } from "../firebase";
    export let designPromise;
    const dispatch = createEventDispatcher();
</script>

{#await designPromise}
    <p>Loading..</p>
{:then designs}
    <div class="designs">
        {#each designs as des}
            {#if des.deleted === false}
                <div class="preview">
                    <img
                        src="data:image/svg+xml,{des.svg}"
                        alt="preview of design"
                        on:click={() => dispatch("go-edit", des)}
                        on:keypress={() => dispatch("go-edit", des)}
                    />
                    <div class="controls">
                        {#if des.isTemplate === false}
                            <button
                                on:click={() => {
                                    saveToTemplates(des.id, des.json, des.svg);
                                    dispatch("re-render");
                                }}
                            >
                                make template
                            </button>
                        {/if}
                        <button
                            on:click={() => {
                                markDeleted(des.id);
                                dispatch("re-render");
                            }}
                        >
                            delete
                        </button>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
{:catch err}
    <p>{err.detail}</p>
{/await}

<style>
    .designs {
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        gap: 1rem;
        margin: 0.5rem;
    }
    .preview {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 0.5rem;
    }
    .preview img {
        height: 15vh;
        width: 26.25vh;
        border: greenyellow solid 2px;
        cursor: pointer;
    }
</style>
