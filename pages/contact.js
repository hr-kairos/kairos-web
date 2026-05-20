import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus('Message sent securely! We will be in touch.');
      e.target.reset();
    } else {
      setStatus('Failed to send. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="max-w-6xl mx-auto py-16 px-6 flex-grow w-full grid md:grid-cols-2 gap-12 items-start">
        
        {/* Contact Info from Document */}
        <div className="bg-slate-900 text-white p-10 rounded-lg shadow-lg">
          [span_38](start_span)<h2 className="text-3xl font-bold mb-6">Don't hesitate to contact us[span_38](end_span)</h2>
          <div className="space-y-6 text-lg">
            <p className="flex items-center">
              <i className="fas fa-envelope text-blue-400 w-8"></i>
              [span_39](start_span)hr@kairosglobalsolutions.com[span_39](end_span)
            </p>
            <p className="flex items-center">
              <i className="fas fa-phone text-blue-400 w-8"></i>
              [span_40](start_span)+91 9947944047[span_40](end_span)
            </p>
            <p className="flex items-center">
              <i className="fas fa-map-marker-alt text-blue-400 w-8"></i>
              [span_41](start_span)Chennai[span_41](end_span)
            </p>
            <p className="flex items-center">
              <i className="fas fa-globe text-blue-400 w-8"></i>
              [span_42](start_span)www.kariosglobalsolutions.com[span_42](end_span)
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Send an Inquiry</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" name="name" required className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" name="email" required className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">How can we help?</label>
              <textarea name="message" rows="5" required className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500 bg-gray-50"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition shadow">
              Send Message
            </button>
            {status && <p className="text-center mt-4 font-medium text-blue-600">{status}</p>}
          </form>
        </div>
      </div>
      <footer className="bg-slate-950 text-white text-center py-6 mt-auto">
        <p className="text-sm text-gray-500">&copy; 2026 Kairos Global Solutions Pvt Ltd. All Rights Reserved.</p>
      </footer>
    </div>
  );
}