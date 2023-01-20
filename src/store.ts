import type { UserCredential } from "firebase/auth";
import { writable } from "svelte/store";

export const user = writable<UserCredential["user"]>();
