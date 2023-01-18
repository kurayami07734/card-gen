<script lang="ts">
    async function loginGoogle() {
        const { signInWithPopup } = await import("firebase/auth");
        const { auth, googleProvider } = await import("../firebase");
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                user = res.user;
                getDesigns();
            })
            .catch((err) => alert(err.detail));
    }
    async function loginFacebook() {
        const { signInWithPopup } = await import("firebase/auth");
        const { auth, facebookProvider } = await import("../firebase");
        signInWithPopup(auth, facebookProvider)
            .then((res) => {
                user = res.user;
                getDesigns();
            })
            .catch((err) => alert(err.detail));
    }
    async function logout() {
        const { auth } = await import("../firebase");
        auth.signOut();
        designs = [];
        user = null;
    }
    async function getDesigns() {
        const { collection, query, where, getDocs } = await import(
            "firebase/firestore"
        );
        const { db } = await import("../firebase");
        const q = query(
            collection(db, "designs"),
            where("user_id", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) =>
            designs.push({ id: doc.id, data: doc.data() })
        );
        console.log(designs);
    }
    let designs = [];
    export let user;
</script>

<section>
    <div class="login-box">
        {#if user}
            <p>{user.displayName}</p>
            {#if designs.length > 0}
                {#each designs as design}
                    <p>{design}</p>
                {/each}
            {/if}
            <button id="logout" on:click={logout}>Logout</button>
        {:else}
            <h1>Login</h1>
            <div class="login-btns">
                <button id="google-btn" on:click={loginGoogle}>
                    <img src="./icons8-google.svg" alt="Google Logo" />
                    Continue with Google
                </button>
                <button id="facebook-btn" on:click={loginFacebook}>
                    <img src="./icons8-facebook.svg" alt="Facebook Logo" />
                    Continue with Facebook
                </button>
            </div>
        {/if}
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 90vh;
    }
    h1 {
        font-size: 2.3rem;
    }
    #facebook-btn {
        background-color: #1877f2;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    #google-btn {
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #303030;
    }
    #logout {
        background-color: red;
        font-weight: 300;
        font-size: 1.2rem;
    }

    .login-box {
        display: flex;
        flex-direction: column;
        max-width: 70vw;
        text-align: center;
        justify-content: space-around;
        background-color: #151515;
        padding: 2rem;
        border-radius: 5px;
        box-shadow: 3px 8px rgba(0, 0, 0, 0.87);
        align-items: center;
    }
    .login-btns {
        display: flex;
        flex-direction: column;
        font-size: 1.3rem;
        justify-content: space-around;
        gap: 1rem;
    }
</style>
