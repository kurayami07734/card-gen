import { initializeApp } from "firebase/app";
import { user } from "./store";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, addDoc, collection, query, where, getDocs, setDoc, doc } from "firebase/firestore/lite";
const secrets = import.meta.env;

const firebaseConfig = {
    apiKey: secrets.VITE_API_KEY,
    authDomain: secrets.VITE_AUTH_DOMAIN,
    projectId: secrets.VITE_PROJECT_ID,
    storageBucket: secrets.VITE_STORAGE_BUCKET,
    messagingSenderId: secrets.VITE_MESSAGING_SENDER_ID,
    appId: secrets.VITE_APP_ID,
    measurementId: secrets.VITE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore();
const designs = collection(db, "designs");
const templates = collection(db, "templates");
const facebookProvider = new FacebookAuthProvider();
export function saveToCloud(user_id: string, json: string, svg: string) {
    addDoc(designs, {
        user_id: user_id,
        json: json,
        svg: svg,
        deleted: false,
        isTemplate: false,
    }).catch(e => alert(e.toString()));
}
export function loginGoogle() {
    signInWithPopup(auth, googleProvider)
        .then((res) => {
            user.set(res.user);
        })
        .catch((err) => alert(err.toString()));
}

export function loginFacebook() {
    signInWithPopup(auth, facebookProvider)
        .then((res) => {
            user.set(res.user);
        })
        .catch((err) => alert(err.toString()));
}
export function logout() {
    auth.signOut()
        .then(() => (user.set(null)))
        .catch((err) => alert(`Failed to logout: ${err.toString()}`));
}
export function updateCloudDesign(doc_id: string, json: string, svg: string) {
    const docRef = doc(db, "designs", doc_id);
    setDoc(docRef, { json: json, svg: svg, deleted: false, isTemplate: false }, { merge: true })
        .catch(e => alert(e.toString()));
}

export async function getDesigns(user_id: string): Promise<any[]> {
    try {
        const q = query(
            collection(db, "designs"),
            where("user_id", "==", user_id)
        );
        let designs = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(
            doc => designs.push(
                {
                    id: doc.id,
                    json: doc.data().json,
                    svg: doc.data().svg,
                    deleted: doc.data().deleted,
                    isTemplate: doc.data().isTemplate,
                }
            )
        );
        return designs;
    } catch (e) {
        alert(e.toString());
    }
}
export function saveToTemplates(doc_id: string, json: string, svg: string) {
    addDoc(templates, {
        json: json,
        svg: svg,
    }).then(() => {
        const docRef = doc(db, "designs", doc_id);
        setDoc(docRef, { isTemplate: true }, { merge: true });
    }).catch(e => alert(e.toString()));
}
export async function getTemplates(): Promise<any[]> {
    try {
        let temps = [];
        const querySnapshot = await getDocs(templates);
        querySnapshot.forEach(
            doc => temps.push(
                {
                    id: doc.id,
                    json: doc.data().json,
                    svg: doc.data().svg
                }
            )
        );
        return temps;
    } catch (e) {
        alert(e.toString());
    }
}
export function markDeleted(doc_id: string): void {
    try {
        const docRef = doc(db, "designs", doc_id);
        setDoc(docRef, { deleted: true }, { merge: true });
    } catch (e) {
        alert(e.toString());

    }
} 