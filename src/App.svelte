<script lang="ts">
  import Topbar from "./pages/topbar.svelte";
  import HomePage from "./pages/homePage.svelte";
  import LoginPage from "./pages/loginPage.svelte";
  import EditPage from "./pages/editPage.svelte";
  import SearchPage from "./pages/searchPage.svelte";
  let selectedTab = "Home";
  let canvasData;
</script>

<Topbar
  bind:selectedTab
  on:go-home={() => (selectedTab = "Home")}
  on:go-login={() => (selectedTab = "Login")}
  on:go-search={() => (selectedTab = "Search")}
/>
<main>
  {#if selectedTab === "Home"}
    <HomePage on:go-search={() => (selectedTab = "Search")} />
  {:else if selectedTab === "Login"}
    <LoginPage
      on:go-edit={(e) => {
        selectedTab = "Edit";
        canvasData = e.detail;
      }}
    />
  {:else if selectedTab === "Search"}
    <SearchPage on:go-edit={() => (selectedTab = "Edit")} />
  {:else if selectedTab === "Edit"}
    <EditPage bind:canvasData />
  {/if}
</main>

<style>
</style>
