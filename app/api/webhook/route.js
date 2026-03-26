// app/api/webhook/route.js
import { supabase } from "@/app/_lib/supabase";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text(); // ✅ App Router uses req.text()
  const sig = req.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      // console.log("✅ Payment received for session:", session.id);
      const bookingId = session.metadata.bookingId;

      // We are also storing 'payment_intent' as it will be used to refunding the payment later.
      const { error } = await supabase
        .from("bookings")
        .update({ isPaid: true, stripePaymentIntentId: session.payment_intent })
        .eq("id", bookingId);

      if (error) {
        return new Response("DB update failed", { status: 400 });
      }

      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
