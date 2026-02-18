import Image from "next/image";

import Reservation from "@/app/_components/Reservation";
import TextExpander from "@/app/_components/TextExpander";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

// Generate metadata dynamically.
// Gets access to the same params as the object.
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);

  return {
    title: `Cabin ${name}`,
  };
}

// This will make sure that below pages are loaded as static.
// Here we are basically giving all the possible values of this dynamic route.
export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
}

// Each dynamic route gets access to the params of the url.
// It will be a object with the same name as the dynamic route segment which in this case is 'cabinId'
export default async function Page({ params }) {
  // below three creates a waterfall problem.
  // Each request will block the next one, and so on.
  // But the request don't depend on each other, so they should not wait for each other.
  const cabin = await getCabin(params.cabinId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId);

  // One way to resolve above problems is to use 'Promise.All'
  // Now the overall result will depend on the slowest promise. The time taken by the slowest request will be the time of overall operation.
  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(params.cabinId),
  //   getSettings(),
  //   getBookedDatesByCabinId(params.cabinId),
  // ]);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        {/* Suspense enables streaming. What it means is that that above thing will be rendered as soon as it is available but for the component inside suspense, it will wait for the data to arrive. */}
        {/* As we are using suspense, it will wait for the data to arrive and until the data have not arrived it will render a spinner. It will not block the entire page. */}
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
