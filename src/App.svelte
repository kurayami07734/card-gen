<script lang="ts">
  import Topbar from "./pages/topbar.svelte";
  import HomePage from "./pages/homePage.svelte";
  import LoginPage from "./pages/loginPage.svelte";
  import EditPage from "./pages/editPage.svelte";
  import AboutPage from "./pages/aboutPage.svelte";
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
