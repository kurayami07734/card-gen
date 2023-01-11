<script lang="ts">
    import { createEventDispatcher } from "svelte";

    async function loginGoogle() {
        let { signInWithPopup } = await import("firebase/auth");
        let { auth, googleProvider } = await import("../firebase");
        signInWithPopup(auth, googleProvider).then((res) => (user = res.user));
        console.log(user);
    }
    async function loginFacebook() {
        let { signInWithPopup } = await import("firebase/auth");
        let { auth, facebookProvider } = await import("../firebase");
        signInWithPopup(auth, facebookProvider).then(
            (res) => (user = res.user)
        );
        console.log(user);
    }
    async function logout() {
        let { auth } = await import("../firebase");
        auth.signOut();
        user = null;
    }
    let dispatch = createEventDispatcher();
    export let user;
</script>

<section>
    {#if user}
        <p>{user.displayName}</p>
        <button on:click={logout}>Logout</button>
    {:else}
        <div class="login-box">
            <h2>Login</h2>
            <div class="login-btns">
                <button on:click={loginGoogle}>Sign in with google</button>
                <button on:click={loginFacebook}>Sign in with facebook</button>
            </div>
        </div>
    {/if}
    <div class="about-us">
        <h3
            on:click={() => dispatch("go-about")}
            on:keypress={() => dispatch("go-about")}
        >
            About Us
        </h3>
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
    .login-box {
        display: flex;
        flex-direction: column;
        max-width: 70vw;
        width: 60vw;
        text-align: center;
        /* background-color: #02000c; */
        height: 50vh;
        justify-content: space-around;
        align-items: center;
    }
    .login-btns {
        display: flex;
        height: 25vh;
        flex-direction: column;
        max-width: 40vw;
        justify-content: space-around;
    }
</style>
