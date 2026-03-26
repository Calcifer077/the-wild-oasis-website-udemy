"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id, name } = cabin;

  const startDate = range?.from;
  const endDate = range?.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  // 'createBookingWithData' will be prepopulated with bookingData.
  const createBookingWithData = createBooking.bind(null, bookingData);

  async function handleSubmit(formData) {
    await createBookingWithData(formData);

    resetRange();
  }

  async function handleSubmitWithPayment() {
    const form = document.querySelector("form");

    const formData = new FormData();

    if (!form.elements.numGuests.value) return;

    formData.append("numGuests", form.elements.numGuests.value);
    formData.append("observations", form.elements.observations.value);

    const booking = await createBookingWithData(formData);

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId: booking.id,
        cabinPrice,
        numNights,
        cabinName: name,
      }),
    });

    const { url } = await res.json();

    window.location.href = url;

    resetRange();
  }

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={handleSubmit}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <>
              {/* The default action will be called on submission using this */}
              <SubmitButton pendingLabel={"Reserving"}>
                Pay Later (On premise)
              </SubmitButton>

              <SubmitButton
                // By default button is of 'type='submit''. If we were to follow the default way both hanlders will be called on clicking any button. But we don't want that so that's why we made its 'type='button'', so that it will only be called when this button is clicked.

                type="button"
                onClick={handleSubmitWithPayment}
                pendingLabel={"Reserving"}
              >
                Reserve Now (Pay Online)
              </SubmitButton>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
