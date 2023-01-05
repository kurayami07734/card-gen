<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
</script>

<nav>
    <div class="point" on:click={() => dispatch("go-home")}>
        <h2>CardGen</h2>
    </div>
    <div class="point" on:click={() => dispatch("go-edit")}>
        <h4>Edit page</h4>
    </div>
    <div class="point" on:click={() => dispatch("go-about")}>
        <h4>About us</h4>
    </div>
    <div class="point" on:click={() => dispatch("go-login")}>
        <h3>My Account</h3>
    </div>
</nav>

<style>
    nav {
        display: flex;
        justify-content: space-around;
        padding: 1rem;
    }
    .point {
        cursor: pointer;
    }
    h4 {
        font-weight: 200;
    }
</style>
