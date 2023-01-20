<script>
    import { createEventDispatcher } from "svelte";
    export let selectedTab;
    const dispatch = createEventDispatcher();
</script>

<nav>
    <div
        class="point {selectedTab === "Home" ? "selected" : ""}"
        on:click={() => dispatch("go-home")}
        on:keypress={() => dispatch("go-home")}
    >
        <h2>CardGen</h2>
    </div>
    <div
        class="point {selectedTab === "Search" ? "selected" : ""}"
        on:click={() => dispatch("go-search")}
        on:keypress={() => dispatch("go-search")}
    >
        <h4>Templates</h4>
    </div> 
    <div
        class="point {selectedTab === "Login" ? "selected" : ""}"
        on:click={() => dispatch("go-login")}
        on:keypress={() => dispatch("go-login")}
    >
        <h3>My Account</h3>
    </div>
</nav>

<style>
    nav {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .point {
        cursor: pointer;
    }
    .selected {
        text-decoration: underline #0066ff 0.3rem;
        text-underline-offset: 0.5rem;
    }
    h4 {
        font-weight: 200;
    }
</style>
