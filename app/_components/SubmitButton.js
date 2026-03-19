"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingLabel }) {
  // 'useFormStatus' is a hook by react, which basically tells us about the status of the form.
  // One thing to make sure that this hook can only be used inside the component which is being rendered inside a form not for the form itself.
  // It tells about the status of the form inside which this component is being rendered.
  // This component needs to be a client componenet.
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? `${pendingLabel}...` : children}
    </button>
  );
}
