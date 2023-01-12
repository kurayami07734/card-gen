<script lang="ts">
    async function loginGoogle() {
        let { signInWithPopup } = await import("firebase/auth");
        let { auth, googleProvider } = await import("../firebase");
        signInWithPopup(auth, googleProvider)
            .then((res) => (user = res.user))
            .catch((err) => alert(err.detail));
    }
    async function loginFacebook() {
        let { signInWithPopup } = await import("firebase/auth");
        let { auth, facebookProvider } = await import("../firebase");
        signInWithPopup(auth, facebookProvider)
            .then((res) => (user = res.user))
            .catch((err) => alert(err.detail));
    }
    async function logout() {
        let { auth } = await import("../firebase");
        auth.signOut();
        user = null;
    }
    export let user;
</script>

<section>
    {#if user}
        <p>{user.displayName}</p>
        <button id="logout" on:click={logout}>Logout</button>
    {:else}
        <div class="login-box">
            <h1>Login</h1>
            
            <div class="login-btns">
                <button id="google-btn" on:click={loginGoogle}>
                    <img
                        src="./icons8-google.svg"
                        alt="Google Logo"
                    />
                    Continue with Google
                </button>
                <button id="facebook-btn" on:click={loginFacebook}>
                    <img
                        src="./icons8-facebook.svg"
                        alt="Facebook Logo"
                    />
                    Continue with Facebook
                </button>
            </div>
        </div>
    {/if}
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
    }
    #google-btn {
        display: flex;
        align-items: center;
        justify-content: space-around;
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
