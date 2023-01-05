<script lang="ts">
  import Topbar from "./ui/topbar.svelte";
  import HomePage from "./ui/homePage.svelte";
  import LoginPage from "./ui/loginPage.svelte";
  import EditPage from "./ui/editPage.svelte";
  import AboutPage from "./ui/aboutPage.svelte";
  let user;
  let selectedTab = "Home";
</script>

<Topbar
  on:go-home={() => (selectedTab = "Home")}
  on:go-login={() => (selectedTab = "Login")}
  on:go-about={() => (selectedTab = "About")}
  on:go-edit={() => (selectedTab = "Edit")}
/>
<main>
  {#if selectedTab === "Home"}
    <HomePage />
  {:else if selectedTab === "Login"}
    <LoginPage bind:user />
  {:else if selectedTab === "Edit"}
    <EditPage />
  {:else if selectedTab === "About"}
    <AboutPage />
  {/if}
</main>

<style>
</style>
