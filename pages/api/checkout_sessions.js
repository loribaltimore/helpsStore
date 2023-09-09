const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import Session from 'models/sessionSchema';
import database from 'models/database';
import User from 'models/userSchema';

export default async function handler(req, res) {
  await database();
  if (req.method === 'POST') {
    try {
      const { sessionId, userId } = req.body;
    const currentSession = await Session.findById(sessionId);
      const currentUser = await User.findById(userId);
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1NYUp5JdX2WdfgCJCUhqMoAU',
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${req.headers.origin}/bank?success=true`,
        cancel_url: `${req.headers.origin}/bank?canceled=true`,
        automatic_tax: {enabled: true},
      });
      currentSession.flash = { type: 'success', message: 'Your payment was successful!' };
      await currentSession.save();
      currentUser.membership.membershipType = 'pro';
      await currentUser.save();
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};