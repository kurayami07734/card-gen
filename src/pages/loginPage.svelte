<script lang="ts">
    
    async function loginGoogle(){
        let {signInWithPopup} = await import("firebase/auth");
        let {auth, googleProvider} = await import("../firebase");
        signInWithPopup(auth, googleProvider).then((res) => (user = res.user));
        console.log(user);
    }
    async function loginFacebook() {
        let {signInWithPopup} = await import("firebase/auth");
        let {auth, facebookProvider} = await import("../firebase");
        signInWithPopup(auth, facebookProvider).then((res) => (user = res.user));
        console.log(user);
    }
    async function logout() {
        let {auth} = await import("../firebase");
        auth.signOut();
        user = null;
    }
    export let user;
</script>

<section>
    {#if user}
        <p>{user.displayName}</p>
        <button on:click={logout}>Logout</button>
    {:else}
    <div class="login-box">
        <button on:click={loginGoogle}>Sign in with google</button>
        <button on:click={loginFacebook}>Sign in with facebook</button>
    </div>
    {/if}
    
</section>
