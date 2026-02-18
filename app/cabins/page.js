import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

// Here, we are telling Next.js that this page should not be cached bcause the value is 0.
// If it were some other value it would mean the amount of time next.js will wait before invalidating it.
// Another thing is that it needs to be a value not some variable.

// Refetch data once per hour.
export const revalidate = 3600;
// Above only applies to statically generated pages, but as we are using 'searchParams' below, this page will now be treated as dynamically rendered page.

export const metadata = {
  title: "Cabins",
};

// 'searchParams' -> gives the object of current query in the url.
// 'searchParams' can only be known at runtime so that will make this page dynamically rendered.
// Whenever 'searchParams' changes this component will also rerender
export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* Suspense needs to be outside that component that does asynchronous work. */}
      {/* Why have we used 'key' below? By default next navigation is done using start transition, which is not supported by 'suspense'. So when the user is interacting with the filter component, there will be no visual feedback for the user while the data is loading in the background. It will just display the already available content until the new content arrives which is not good. */}
      {/* We can solve this using 'key' prop */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
