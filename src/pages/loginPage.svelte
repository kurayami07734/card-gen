<script lang="ts">
    import { user } from "../store";
    import {
        loginFacebook,
        loginGoogle,
        logout,
        getDesigns,
    } from "../firebase";
    import { createEventDispatcher } from "svelte";
    import DesignPreview from "./designPreview.svelte";
    const dispatch = createEventDispatcher();
    let updateList = false;
</script>

<section>
    <div class="login-box">
        {#if $user}
            <h2>{$user.displayName}</h2>
            {#key updateList}
                <DesignPreview
                    designPromise={getDesigns($user.uid)}
                    on:go-edit={(e) => dispatch("go-edit", e.detail)}
                    on:re-render={() => (updateList = !updateList)}
                />
            {/key}
            <button id="logout" on:click={logout}>Logout</button>
        {:else}
            <h1>Login</h1>
            <div class="login-btns">
                <button id="google-btn" on:click={loginGoogle}>
                    <img src="./icons8-google.svg" alt="Google Logo" />
                    Continue with Google
                </button>
                <button id="facebook-btn" on:click={loginFacebook}>
                    <img src="./icons8-facebook.svg" alt="Facebook Logo" />
                    Continue with Facebook
                </button>
            </div>
        {/if}
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 90vh;
    }
    h1 {
        font-size: 2.3rem;
    }

    #facebook-btn {
        background-color: #1877f2;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: white;
    }
    #google-btn {
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #303030;
        color: white;
    }
    #logout {
        background-color: red;
        font-weight: 300;
        font-size: 1.2rem;
    }

    .login-box {
        display: flex;
        flex-direction: column;
        max-width: 70vw;
        text-align: center;
        justify-content: space-around;
        background-color: #151515;
        padding: 2rem;
        border-radius: 5px;
        box-shadow: 3px 8px rgba(0, 0, 0, 0.87);
        align-items: center;
    }
    .login-btns {
        display: flex;
        flex-direction: column;
        font-size: 1.3rem;
        justify-content: space-around;
        gap: 1rem;
    }
</style>
