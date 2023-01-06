<script>
    let value = "";
</script>

<div class="background">
    <section>
        <div class="hero">
            <h1>Business Cards</h1>
            <h3>Make a business card in minutes</h3>
        </div>
        <div class="cta">
            <input type="search" bind:value placeholder="Enter a business name" />
            <button>Go</button>
        </div>
    </section>
</div>

<style>
    section {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: flex-start;
        height: 91vh;
        margin-left: 15vh;
    }
    h1 {
        font-size: 40px;
        line-height: 1.24rem;
    }
    h3 {
        font-weight: 200;
    }
    .background {
        background-image: url("../assets/dark-card-bg.jpg");
        background-size: cover;
    }
    .cta > button {
        background-color: #0066ff;
        width: 60vw;
    }
    .cta > input {
        padding: 0.23rem;
        padding-left: 1rem;
        background-color: white;
        border-radius: 8px;
        font-size: 1.3rem;
        width: 60vw;
        color: black;
    }
    @media (min-width: 800px) {
        .cta > input {
            padding: 0.23rem;
            padding-left: 1rem;
            background-color: white;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            font-size: 1.4rem;
            width: 400px;
            color: black;
        }
        .cta > button {
            transform: translate(-2rem, -0.238rem);
            z-index: 2;
            background-color: #0066ff;
            border-top-left-radius: 0;
            width: auto;
            border-bottom-left-radius: 0;
        }
    }
</style>
