// app/api/cabins/[cabinId]/

import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// It receives a request and params object as arguments, where params contains the dynamic route parameters (in this case, cabinId).
export async function GET(request, params) {
  // params will be the object containing the dynamic route parameters, in this case, cabinId.
  const { cabinId } = params.params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch (error) {
    // console.log(error);

    return Response.json({ error: "Failed to fetch cabin data" });
  }
}

// export async function POST() {}
