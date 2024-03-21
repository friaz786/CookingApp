const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OwjelIu1YXMSFeykDTeGFmy9uq7J2wWu9SX352B68aJYuhPudlKGEPmwDSIhl3SYUsqKqv3UmNvFJ1QF4jAjSUT0033ZJf086"
);
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

router.get("/home", (req, res) => {
  res.send(`<h2>hello</h2>`);
});

router.post("/payments/intents", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "pkr",
      automatic_payment_methods: { enabled: true },
    });
    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Use the router with a prefix (if desired, or directly as shown below)
app.use("api", router);

const port = 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
