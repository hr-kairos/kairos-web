import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center bg-slate-800 text-white text-center p-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Tailored Human Capital Solutions</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          Matching the right talent with the right role across IT and Non-IT sectors globally.
        </p>
      </main>
      <footer className="bg-slate-900 text-white text-center py-6 border-t border-slate-800">
        <p>&copy; 2026 Kairos Global Solutions Pvt Ltd. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
