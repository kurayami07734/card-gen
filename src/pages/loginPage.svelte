<script lang="ts">
    import { userStore, designStore } from "../store";
    import { signInWithPopup } from "firebase/auth";
    import { collection, query, where, getDocs } from "firebase/firestore";
    import { auth, db, googleProvider, facebookProvider } from "../firebase";
    function loginGoogle() {
        // let { signInWithPopup } = await import("firebase/auth");
        // let { auth, googleProvider } = await import("../firebase");
        // let designs = [];
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                userStore.set(res.user);
                designStore.set(getDesigns());
            })
            .catch((err) => alert(err.detail));
    }
    function getDesigns() {
        // let { collection, query, where, getDocs } = await import(
        //     "firebase/firestore"
        // );
        // let { db } = await import("../firebase");
        const q = query(
            collection(db, "designs"),
            where("user_id", "==", user.uid)
        );
        let designs = [];
        getDocs(q)
            .then((res) =>
                res.forEach((doc) => {
                    designs.push({ id: doc.id, data: doc.data() });
                })
            )
            .catch((err) => alert(`Failed to fetch designs: ${err.detail}`));
        return designs;
    }
    function loginFacebook() {
        // let { signInWithPopup } = await import("firebase/auth");
        // let { auth, facebookProvider } = await import("../firebase");
        signInWithPopup(auth, facebookProvider)
            .then((res) => {
                userStore.set(res.user);
                designStore.set(getDesigns());
            })
            .catch((err) => alert(err.detail));
    }
    function logout() {
        // let { auth } = await import("../firebase");
        auth.signOut()
            .then(() => {
                designStore.set([]);
                userStore.set({});
            })
            .catch((err) => alert(`Failed to logout: ${err}`));
    }

    let user,
        designs = [];
    userStore.subscribe((usr) => (user = usr));
    designStore.subscribe((res) => (designs = res));
</script>

<section>
    <div class="login-box">
        {#if Object.keys(user).length !== 0}
            <h2>{user.displayName}</h2>
            <div class="preview">
                {#each designs as des}
                    <img
                        src="data:image/svg+xml,{des.data.svg}"
                        alt="preview of design"
                    />
                {/each}
            </div>
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
    .preview {
        display: flex;
        gap: 1rem;
        margin: 0.5rem;
    }
    .preview img {
        height: 25vh;
        width: 43.75vh;
        border: greenyellow solid 2px;
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
