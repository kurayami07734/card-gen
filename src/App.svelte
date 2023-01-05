<script lang="ts">
    import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
  import { auth, googleProvider } from "./firebase";
  let user;
  function login() {
    signInWithPopup(auth, googleProvider).then((res) => user = res.user);
    console.log(user);
  }
</script>

<main>
  {#if user}
    <p>{user.displayName}</p>
    <p>{user.uid}</p>
    <img referrerpolicy="no-referrer" width="100" alt="user avatar">
    <button on:click={() => auth.signOut()}>Log out</button>
  {:else}
    <button on:click={login}> Sign in with google </button>
  {/if}
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
