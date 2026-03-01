// File which contains all server actions of the app.
// 'use server' directive is required to make sure that all functions in this file are server actions.
// We are basically in the backend here, so you need to verify that the currently logged in user has the right to perform the action, and also you can directly access the database from here.
"use server";

import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function updateGuest(formData) {
  const session = await auth();

  // The recommended practice here is to just throw an error and let the global error handler take care of it. No need to use try catch block here.
  if (!session)
    throw new Error("You must be logged in to perform this action.");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid national ID.");
  }

  const updateData = { nationality, countryFlag, nationalID };

  const {data, error} = await supabase.from("guests").update(updateData).eq('id', session.user.guestId).select().single();

  if (error) {
    throw new Error("Guest could not be updated.");
  }
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
