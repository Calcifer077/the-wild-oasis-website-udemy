import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        Payment Successful! Thank you for your reservation!
      </h1>
      <Link
        href="/account/reservations"
        className="underline text-xl text-accent-500 inline-block"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
}
