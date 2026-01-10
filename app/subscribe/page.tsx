'use client';

import { useState, useEffect } from 'react';
import StripeCheckout from '@/components/stripe-checkout';
import { useRouter } from 'next/navigation';

export default function SubscribePage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Create checkout session when page loads
    const createCheckoutSession = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/stripe/create-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok && data.url) {
          // Redirect to Stripe hosted checkout
          window.location.href = data.url;
        } else {
          setError(data.error || 'Failed to create checkout session');
          setLoading(false);
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        setLoading(false);
      }
    };

    createCheckoutSession();
  }, []);

  const handleSuccess = () => {
    router.push('/account?success=1');
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-600 mb-2">
              Subscribe to PinealVision
            </h1>
            <p className="text-gray-600">
              Unlock premium features and guided exercises
            </p>
          </div>

          {/* Pricing Info */}
          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                $9.99<span className="text-lg text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 text-sm">Cancel anytime</p>
            </div>

            <ul className="mt-6 space-y-3">
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Access to all video exercises
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                AI-powered guidance
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Progress tracking
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Community access
              </li>
            </ul>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Redirecting to checkout...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mb-6">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Checkout Form (if using embedded checkout) */}
          {clientSecret && !loading && (
            <StripeCheckout
              clientSecret={clientSecret}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          )}

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Secure payment powered by Stripe</p>
            <p className="mt-2">
              By subscribing, you agree to our{' '}
              <a href="/terms" className="text-purple-600 hover:underline">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
