const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import Session from 'models/sessionSchema';
import database from 'models/database';
import addToQueue from 'lib/addToQueue';


export default async function handler(req, res) {
  await database();
  let { sessionId, cart, toDonate } = req.body;
  const { items } = cart;
  cart.toDonate = toDonate;
  if (req.method === 'POST') {
    try {
      const currentSession = await Session.findById(sessionId);
      const session = await stripe.checkout.sessions.create({
              line_items:  items.map(function (element, index) {
                   return {
                        price: element.code,
                        quantity: element.config.qty,
                      }
              }),
            mode: 'payment',
            success_url: `${req.headers.origin}/home?success=true`,
        cancel_url: `${req.headers.origin}/home?canceled=true`,
          });
      currentSession.flash = { type: 'success', message: 'Your payment was successful!' };
      currentSession.cart = {total: 0};
      await currentSession.save();
      await addToQueue({items: cart.items, toDonate: cart.toDonate, sessionId: currentSession.id, currentUser: currentSession.userId})
                        .then(data => { return data }).catch(err => console.log(err));
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};