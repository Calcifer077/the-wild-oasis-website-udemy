"use client";

import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
import { deleteBooking } from "../_lib/actions";

function ReservationList({ bookings }) {
  // If the optimistic update fails, the state would be go back to previus state.

  // 'useOptimistic' takes two arguments. current state, and a function which will determine the next optimistic state.
  // The function can calculate the next optimistic state. It is given the same arguments as the action.
  // It returns two values, one is the optimistic state, and the other is a function which will update the state.
  // The function will be called when the action is performed. We can use it outside.
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currBookings, bookingId) => {
      return currBookings.filter((booking) => booking.id !== bookingId);
    },
  );

  async function handleDelete(bookingId) {
    // first optimistically deleting
    optimisticDelete(bookingId);
    // than actually deleting on the server
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
