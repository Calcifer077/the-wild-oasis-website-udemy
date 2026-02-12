import Spinner from "@/app/_components/Spinner";

// This loading file is inside a folder, so it will be used for a specific route.
// Every subfolder will also use this loading file only, unless you have specified something specific for them.

// When you use loading, it enables streaming(a server-rendering strategy that allows you to progressively render UI from the server to the client in chunks as they become ready, without waiting for the entire page to load).

// For this to work js should be enabled in the browser.
export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
}
