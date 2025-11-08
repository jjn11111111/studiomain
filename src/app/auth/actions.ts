// REPLACE ENTIRE FILE WITH THIS
export async function signUp(email: string, password: string) {
  console.log('FAKE SIGN UP:', email);
  return { user: { email, uid: 'fake-' + Date.now() } };
}

export async function signIn(email: string, password: string) {
  console.log('FAKE SIGN IN:', email);
  return { user: { email, uid: 'fake-' + Date.now() } };
}
// REPLACE ENTIRE FILE WITH THIS
export async function createCheckoutSession() {
  console.log('FAKE STRIPE CHECKOUT');
  return { sessionId: 'cs_test_fake' };
}

export async function createBillingPortal() {
  console.log('FAKE BILLING PORTAL');
  return { url: 'https://fake-portal.vercel.app' };
}
