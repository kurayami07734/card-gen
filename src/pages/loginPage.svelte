<script lang="ts">
    import { signInWithPopup } from "firebase/auth";
    import { auth, googleProvider, facebookProvider } from "../firebase";
    function loginGoogle() {
        signInWithPopup(auth, googleProvider).then((res) => (user = res.user));
        console.log(user);
    }
    function loginFacebook() {
        signInWithPopup(auth, facebookProvider).then((res) => (user = res.user));
        console.log(user);
    }
    function logout() {
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
