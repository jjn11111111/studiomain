'use client';

export default function Home() {
  return (
    <div style={{ height: '100vh', background: 'radial-gradient(circle, cyan, purple, magenta, yellow, white)', backgroundSize: '400% 400%', animation: 'swirl 60s ease-in-out infinite' }}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', opacity: 0, animation: 'fadeIn 3s ease-out forwards' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Pineal Vision - Third Eye Cross Trainer
        </h1>
        <a href="/training/red-sample" style={{ padding: '1rem 2rem', background: 'linear-gradient(to right, purple, cyan)', borderRadius: '9999px', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Enter Here (Sample)
        </a>
      </div>
    </div>
  );
}
