// File which contains all server actions of the app.
// 'use server' directive is required to make sure that all functions in this file are server actions.
// We are basically in the backend here, so you need to verify that the currently logged in user has the right to perform the action, and also you can directly access the database from here.
"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

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

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    throw new Error("Guest could not be updated.");
  }

  // The data will not be immediately available on the client side after this action is performed, because of the caching mechanism of next.js.
  // It will show stale data from the cache. One can refetch by doing a hard reload, but that is not a good user experience. So we can use 'revalidatePath' to revalidate the cache for a specific path after the action is performed, so that the next time the user visits that path, they will see the updated data.
  // If you were to specify ('/account') only it will revalidate the cache for the entire '/account' section, which means that all pages under '/account' will show the updated data, but if you specify the exact path ('/account/profile') only that page will show the updated data, and other pages under '/account' will still show the stale data until they are revalidated.
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  // Check if the user is authenticated
  const session = await auth();

  if (!session)
    throw new Error("You must be logged in to perform this action.");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Reservation could not be deleted.");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  const session = await auth();

  if (!session)
    throw new Error("You must be logged in to perform this action.");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
