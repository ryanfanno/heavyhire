'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-primary-light mb-1">Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-primary-light mb-1">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-primary-light mb-1">Subject</label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-primary-light mb-1">Message</label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary h-32"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-secondary hover:bg-secondary-dark text-primary font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        {isLoading ? 'Sending...' : 'Send Message'}
      </button>

      {isSuccess && (
        <p className="text-green-600">Message sent successfully!</p>
      )}
    </form>
  );
} 