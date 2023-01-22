<script lang="ts">
  import Topbar from "./pages/topbar.svelte";
  import HomePage from "./pages/homePage.svelte";
  let loginPage, searchPage, editPage;
  let selectedTab = "Home";
  let canvasData;
  function loadLoginPage() {
    loginPage = import("./pages/loginPage.svelte");
  }
  function loadSearchPage() {
    searchPage = import("./pages/searchPage.svelte");
  }
  function loadEditPage() {
    editPage = import("./pages/editPage.svelte");
  }
</script>

<Topbar
  bind:selectedTab
  on:go-home={() => (selectedTab = "Home")}
  on:go-login={() => {
    selectedTab = "Login";
    loadLoginPage();
  }}
  on:go-search={() => {
    selectedTab = "Search";
    loadSearchPage();
  }}
/>
<main>
  {#if selectedTab === "Home"}
    <HomePage
      on:go-search={() => {
        selectedTab = "Search";
        loadSearchPage();
      }}
    />
  {:else if selectedTab === "Login"}
    {#await loginPage then { default: LoginPage }}
      <LoginPage
        on:go-edit={(e) => {
          selectedTab = "Edit";
          canvasData = e.detail;
        }}
      />
    {/await}
  {:else if selectedTab === "Search"}
    {#await searchPage then { default: SearchPage }}
      <SearchPage
        on:go-edit={(e) => {
          selectedTab = "Edit";
          canvasData = e.detail;
          loadEditPage();
        }}
      />
    {/await}
  {:else if selectedTab === "Edit"}
    {#await editPage then { default: EditPage }}
      <EditPage bind:canvasData />
    {/await}
  {/if}
</main>

<style>
</style>
