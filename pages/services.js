import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="bg-slate-800 text-white py-24 px-6 text-center border-b-4 border-blue-600">
          [span_0](start_span)<h1 className="text-4xl md:text-6xl font-bold mb-6">Kairos Global Solutions[span_0](end_span)</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            [span_1](start_span)Established in 2024 and headquartered in Chennai, Kairos Global Solutions is a leading provider of integrated business services and consulting solutions, we proudly support a growing workforce[span_1](end_span).
          </p>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-blue-500 hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-slate-800 mb-4"><i className="fas fa-eye text-blue-500 mr-2"></i>Our Vision</h2>
            [span_2](start_span)<p className="text-gray-600 mb-4">We innovate tailored solutions that enhance efficiency, compliance, and business successwe enable businesses to focus on core objectives while managing workforce complexities, technology, legal compliance, and vendor relationships[span_2](end_span).</p>
            [span_3](start_span)<p className="text-gray-600">Through trust and integrity, we build lasting partnerships and achieve sustainable success in a dynamic global market[span_3](end_span).</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-emerald-500 hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-slate-800 mb-4"><i className="fas fa-bullseye text-emerald-500 mr-2"></i>Our Mission</h2>
            [span_4](start_span)<p className="text-gray-600 mb-4">To be the leading global provider of integrated solutions in HR, IT software, application development, law, compliance, and vendor management[span_4](end_span).</p>
            [span_5](start_span)<p className="text-gray-600">We envision empowering businesses worldwide through seamless integration, innovation, and client-focused excellence, driving sustainable growth and operational success[span_5](end_span).</p>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-slate-900 text-white px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                <h3 className="font-bold text-blue-400 mb-2">Knowledge-Sharing</h3>
                [span_6](start_span)<p className="text-sm text-gray-400">We believe in the power of sharing knowledge and expertise to drive growth and innovation[span_6](end_span).</p>
              </div>
              <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                <h3 className="font-bold text-blue-400 mb-2">Adaptability</h3>
                [span_7](start_span)<p className="text-sm text-gray-400">We embrace change and are agile in our approach to overcoming challenges and seizing opportunities[span_7](end_span).</p>
              </div>
              <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                <h3 className="font-bold text-blue-400 mb-2">Integrity</h3>
                [span_8](start_span)<p className="text-sm text-gray-400">We uphold the highest standards of ethical behavior and transparency in all our actions[span_8](end_span).</p>
              </div>
              <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                <h3 className="font-bold text-blue-400 mb-2">Responsiveness</h3>
                [span_9](start_span)<p className="text-sm text-gray-400">We respond promptly and effectively to the needs of our clients and colleagues[span_9](end_span).</p>
              </div>
              <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                <h3 className="font-bold text-blue-400 mb-2">Optimism</h3>
                [span_10](start_span)<p className="text-sm text-gray-400">We approach challenges with a positive attitude and focus on finding solutions[span_10](end_span).</p>
              </div>
              <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                <h3 className="font-bold text-blue-400 mb-2">Sustainability</h3>
                [span_11](start_span)<p className="text-sm text-gray-400">We are committed to sustainable practices that support long-term success for our clients and the environment[span_11](end_span).</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-slate-950 text-white text-center py-6">
        <p className="text-sm text-gray-500">&copy; 2026 Kairos Global Solutions Pvt Ltd. All Rights Reserved.</p>
      </footer>
    </div>
  );
}