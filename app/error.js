"use client";

// This is the global error boundary. It always need to be a client component.
// Only rendering error will be caught here.
// Does not catch error in root layout.
// To catch root layout error, you would have to create global-error.js, which should define its own html.
export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        // Will refresh
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
