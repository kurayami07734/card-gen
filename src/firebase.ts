import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore, addDoc, collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
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
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore();
const designs = collection(db, "designs");
const templates = collection(db, "templates");
export const facebookProvider = new FacebookAuthProvider();
export function saveToCloud(user_id: string, json: string, svg: string): void {
    addDoc(designs, {
        user_id: user_id,
        json: json,
        svg: svg,
        deleted: false,
    }).catch(err => alert(err));
    getDesigns(user_id);
}
export function updateCloudDesign(doc_id: string, json: string, svg: string): void {
    const docRef = doc(db, "designs", doc_id);
    setDoc(docRef, { json: json, svg: svg, deleted: false }, { merge: true })
        .catch(err => console.log(`${err.detail}`));
}

export async function getDesigns(user_id: string): Promise<any[]> {
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
                deleted: doc.data().deleted
            }
        )
    );
    return designs;
}
export function saveToTemplates(json: string, svg: string): void {
    addDoc(templates, {
        json: json,
        svg: svg,
    }).catch(err => alert(err));
}
export async function getTemplates(): Promise<any[]> {
    let temps = [];
    const querySnapshot = await getDocs(templates);
    querySnapshot.forEach(
        doc => temps.push(
            {
                json: doc.data().json,
                svg: doc.data().svg
            }
        )
    );
    return temps;
}
export function markDeleted(doc_id: string): void {
    const docRef = doc(db, "designs", doc_id);
    setDoc(docRef, { deleted: true }, { merge: true });
} 