import Stripe from "stripe";

import { config } from "../../../../configs/config.js";

export const stripeClient = new Stripe(config.payment.stripe.secretKey);
