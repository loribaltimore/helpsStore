const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import Session from 'models/sessionSchema';
import database from 'models/database';
import User from 'models/userSchema';

export default async function handler(req, res) {
  await database();
  let {cart} = req.body;
  console.log('THIS SHOULD BE CART');
      if (req.method === 'POST') {
        try {
          // Create Checkout Sessions from body params.
          const session = await stripe.checkout.sessions.create({
              line_items: cart.map(function (element, index) {
                      let split = element.split(':');
                   return {
                        price: split[0],
                        quantity: split[1],
                      }
                  }),
            mode: 'payment',
            success_url:
              `${req.headers.origin}/home?success=true`,
            cancel_url: `${req.headers.origin}/home?canceled=true`,
          });
          res.redirect(303, session.url);
        } catch (err) {
          res.status(err.statusCode || 500).json(err.message);
        }
      } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
      }
};