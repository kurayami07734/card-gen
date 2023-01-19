<script lang="ts">
    import { userStore, designStore } from "../store";
    import { signInWithPopup } from "firebase/auth";
    import {
        auth,
        googleProvider,
        facebookProvider,
        getDesigns,
    } from "../firebase";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    function loginGoogle() {
        // let { signInWithPopup } = await import("firebase/auth");
        // let { auth, googleProvider } = await import("../firebase");
        // let designs = [];
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                userStore.set(res.user);
                getDesigns(res.user.uid);
            })
            .catch((err) => alert(err.detail));
    }

    function loginFacebook() {
        // let { signInWithPopup } = await import("firebase/auth");
        // let { auth, facebookProvider } = await import("../firebase");
        signInWithPopup(auth, facebookProvider)
            .then((res) => {
                userStore.set(res.user);
                getDesigns(res.user.uid);
            })
            .catch((err) => alert(err.detail));
    }
    function logout() {
        // let { auth } = await import("../firebase");
        auth.signOut()
            .then(() => {
                designStore.set([]);
                userStore.set({});
            })
            .catch((err) => alert(`Failed to logout: ${err}`));
    }

    let user,
        designs = [];
    userStore.subscribe((usr) => (user = usr));
    designStore.subscribe((res) => (designs = res));
</script>

<section>
    <div class="login-box">
        {#if Object.keys(user).length !== 0}
            <h2>{user.displayName}</h2>
            <div class="preview">
                {#each designs as des}
                    <img
                        src="data:image/svg+xml,{des.data.svg}"
                        alt="preview of design"
                        on:click={() => dispatch("go-edit", des)}
                        on:keypress={() => dispatch("go-edit", des)}
                    />
                {/each}
            </div>
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
    #facebook-btn {
        background-color: #1877f2;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    #google-btn {
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #303030;
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
