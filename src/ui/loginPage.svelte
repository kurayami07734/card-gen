<script lang="ts">
    import { signInWithPopup } from "firebase/auth";
    import { auth, googleProvider } from "../firebase";
    function login() {
        signInWithPopup(auth, googleProvider).then((res) => (user = res.user));
        console.log(user);
    }
    export let user;
</script>

<section>
    <button on:click={login}>Sign in with google</button>
</section>
