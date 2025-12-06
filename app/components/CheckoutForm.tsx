import React, { useState, FormEvent } from 'react';
import { getStripe } from '../lib/stripe';

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(5);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create checkout session
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const session = await response.json();

      // Redirect to Checkout
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.warn('Error:', error);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Amount (USD):
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            disabled={loading}
          />
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Checkout'}
      </button>
    </form>
  );
};

export default CheckoutForm;
