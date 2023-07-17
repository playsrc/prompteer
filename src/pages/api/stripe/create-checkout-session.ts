import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { stripe } from "src/utility";
import { authOptions } from "../auth/[...nextauth]";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== "POST") {
    res.status(400).end();
  }
  // This object will contain the user's data if the user is signed in
  // const session = await getSession({ req });
  const session = await getServerSession(req, res, authOptions);

  if (session?.user?.stripeActive === true) {
    res.status(307).redirect("/prompts");
    return;
  }

  // Error handling
  if (!session?.user) {
    res.status(307).redirect("/login");
    return;
    // return res.status(401).json({
    //   error: {
    //     code: "no-access",
    //     message: "You are not signed in.",
    //   },
    // });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: session.user.stripeCustomerId,
    line_items: [
      {
        price: req.body.lookup_key,
        quantity: 1,
      },
    ],
    mode: "subscription",
    // {CHECKOUT_SESSION_ID} is a string literal which the Stripe SDK will replace; do not manually change it or replace it with a variable!
    success_url: `http://localhost:3000/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: "http://localhost:3000/?cancelledPayment=true",
    subscription_data: {
      metadata: {
        // This isn't 100% required, but it helps to have so that we can manually check in Stripe for whether a customer has an active subscription later, or if our webhook integration breaks.
        payingUserId: session.user.id,
      },
    },
  });

  if (!checkoutSession.url) {
    return res.status(500).json({
      code: "stripe-error",
      error: "Could not create checkout session",
    });
  }

  res.redirect(303, checkoutSession.url as string);
};
