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
      <div className="max-w-3xl mx-auto py-12 px-4 flex-grow w-full mt-10">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Contact HR</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="text" name="name" placeholder="Your Name" required className="w-full px-4 py-2 border rounded" />
            <input type="email" name="email" placeholder="Your Email" required className="w-full px-4 py-2 border rounded" />
            <textarea name="message" rows="4" placeholder="Your Message" required className="w-full px-4 py-2 border rounded"></textarea>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition">
              Send Message
            </button>
            {status && <p className="text-center mt-4 font-medium text-blue-600">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
