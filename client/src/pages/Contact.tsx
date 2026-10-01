import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Connect With Us
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#111c2d] mt-1">
          Contact Cravo Kitchen & Bar
        </h1>
        <p className="text-sm text-[#5a4138] mt-2">
          We welcome table reservations, private event inquiries, and dietary questions. Reach out to our concierge or visit us in the Culinary Arts District.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: Direct Details */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e4dc] shadow-warm space-y-6">
            <h3 className="font-display font-bold text-xl text-[#111c2d]">
              Restaurant Information
            </h3>

            <div className="space-y-4 text-sm text-[#5a4138]">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#ffefe9] text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#111c2d] uppercase tracking-wider">Address</h4>
                  <p className="text-xs mt-0.5 leading-relaxed">
                    482 Artisan Boulevard, Suite 100<br />
                    Culinary Arts District, NY 10012
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#ffefe9] text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#111c2d] uppercase tracking-wider">Phone</h4>
                  <p className="text-xs mt-0.5">
                    Direct Line: <a href="tel:2125550194" className="font-semibold text-primary hover:underline">(212) 555-0194</a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#ffefe9] text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#111c2d] uppercase tracking-wider">Email</h4>
                  <p className="text-xs mt-0.5">
                    Reservations: <a href="mailto:reservations@cravo.com" className="font-semibold text-primary hover:underline">reservations@cravo.com</a>
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 pt-2 border-t border-[#f5f2eb]">
                <div className="w-10 h-10 rounded-xl bg-[#ffefe9] text-primary flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-xs text-[#111c2d] uppercase tracking-wider mb-2">Opening Hours</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="font-medium text-[#111c2d]">Tue – Thu:</span>
                      <span>11:30 AM – 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-[#111c2d]">Fri – Sat:</span>
                      <span>11:30 AM – 11:30 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-[#111c2d]">Sunday:</span>
                      <span>10:30 AM – 9:00 PM</span>
                    </div>
                    <div className="flex justify-between text-[#8e7166]">
                      <span>Monday:</span>
                      <span>Closed for Private Dining</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white rounded-3xl border border-[#e8e4dc] overflow-hidden shadow-warm">
            <div className="p-4 bg-[#fcfbf9] border-b border-[#e8e4dc] flex items-center justify-between">
              <span className="font-bold text-xs text-[#111c2d] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" /> Map & Directions
              </span>
              <span className="text-[10px] text-[#8e7166] uppercase font-semibold">Live GPS Node</span>
            </div>
            <div className="relative h-56 bg-slate-100 flex items-center justify-center p-6 text-center overflow-hidden">
              {/* Stylized simulated interactive map preview */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#a33900_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#e8e4dc] shadow-warm max-w-xs">
                <p className="font-display font-bold text-sm text-[#111c2d]">Cravo Kitchen & Bar</p>
                <p className="text-[11px] text-[#5a4138] mt-0.5">482 Artisan Blvd, Suite 100, NY</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2.5 inline-block px-3 py-1 bg-primary text-white text-[11px] font-bold rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#e8e4dc] shadow-warm">
          <h3 className="font-display font-bold text-2xl text-[#111c2d] mb-2">
            Send Us a Message
          </h3>
          <p className="text-xs text-[#5a4138] mb-6">
            Have a question regarding allergies, catering, or event bookings? Leave a note and our front-of-house team will reply promptly.
          </p>

          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center flex flex-col items-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mb-3" />
              <h4 className="font-display font-bold text-lg text-emerald-900">Message Received!</h4>
              <p className="text-xs text-emerald-700 mt-1 max-w-sm">
                Thank you for contacting Cravo. Our hospitality manager has received your message and will be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5a4138] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 px-4 text-xs bg-[#fcfbf9] text-[#111c2d] border border-[#e8e4dc] rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5a4138] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 px-4 text-xs bg-[#fcfbf9] text-[#111c2d] border border-[#e8e4dc] rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5a4138] mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Table reservation for 6 guests"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full h-11 px-4 text-xs bg-[#fcfbf9] text-[#111c2d] border border-[#e8e4dc] rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5a4138] mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about your inquiry, requested date/time, or dietary requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 text-xs bg-[#fcfbf9] text-[#111c2d] border border-[#e8e4dc] rounded-xl focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-warm flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
