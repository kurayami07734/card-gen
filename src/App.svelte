<script lang="ts">
  import Topbar from "./pages/topbar.svelte";
  import HomePage from "./pages/homePage.svelte";
  import LoginPage from "./pages/loginPage.svelte";
  import EditPage from "./pages/editPage.svelte";
  import SearchPage from "./pages/searchPage.svelte";
  let user;
  let selectedTab = "Home";
  let event;
  $: console.log(event);
</script>

<Topbar
  bind:selectedTab
  on:go-home={() => (selectedTab = "Home")}
  on:go-login={() => (selectedTab = "Login")}
  on:go-search={() => {
    selectedTab = "Search";
    event = { detail: "" };
  }}
/>
<main>
  {#if selectedTab === "Home"}
    <HomePage
      on:go-search={(e) => {
        selectedTab = "Search";
        event = e;
      }}
    />
  {:else if selectedTab === "Login"}
    <LoginPage bind:user />
  {:else if selectedTab === "Search"}
    <SearchPage
      bind:value={event.detail}
      on:go-edit={() => (selectedTab = "Edit")}
    />
  {:else if selectedTab === "Edit"}
    <EditPage />
  {/if}
</main>

<style>
</style>
