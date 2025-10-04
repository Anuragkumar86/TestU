"use client";

import Footer from "@/components/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:anuragkr8651@gmail.com?subject=ThinkLix Query from ${form.name}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-fuchsia-100 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-900">
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-fuchsia-100 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-900 px-4 py-16">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 text-center">
          Contact ThinkLix
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Have any questions or suggestions? Fill out the form below and we'll get back to you!
        </p>

        {submitted && (
          <div className="mb-6 text-center text-green-500 font-semibold animate-pulse">
            Your message has been prepared! Please check your email client to send.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Write your message here..."
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white resize-none"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>


    </div>
      <div>

      <Footer/>
      </div>
    </div>
  );
}
