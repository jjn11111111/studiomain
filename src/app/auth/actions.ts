// FAKE AUTH — NO FIREBASE, NO SUPABASE
export async function signUp(email: string, password: string) {
  console.log('FAKE SIGN UP:', email);
  return { user: { email, uid: 'fake-uid-' + Date.now() } };
}

export async function signIn(email: string, password: string) {
  console.log('FAKE SIGN IN:', email);
  return { user: { email, uid: 'fake-uid-' + Date.now() } };
}
