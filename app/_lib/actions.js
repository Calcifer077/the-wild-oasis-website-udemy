// File which contains all server actions of the app.

"use server";

import { signIn } from "./auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
