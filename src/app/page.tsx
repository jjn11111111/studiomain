export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-yellow-200 text-black p-10">
      <div className="text-center border-4 border-black p-8">
        <h1 className="text-6xl font-bold animate-pulse">LOOK HERE</h1>
        <p className="text-4xl mt-4">
          The list of files is on the LEFT side of your screen.
        </p>
        <p className="text-9xl mt-8 font-mono">{'<'}{'—'}{'—'}{'—'}</p>
        <p className="text-2xl mt-8">
          You will see <span className="font-mono bg-white p-1">.env</span> and <span className="font-mono bg-white p-1">README.md</span> in that list on the left.
        </p>
        <p className="text-2xl mt-4">
          That entire column is the **File List**.
        </p>
      </div>
    </div>
  );
}