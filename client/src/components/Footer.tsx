import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#f5f2eb] border-t border-[#e8e4dc] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="group inline-block">
              <Logo size="md" />
            </Link>
            <p className="text-sm text-[#5a4138] leading-relaxed max-w-xs">
              Modern kitchen and bar dedicated to honest ingredients, thoughtful preparations, and sensory culinary dining experiences.
            </p>
            <div className="flex items-center gap-4 text-[#8e7166] pt-2">
              <Link to="/contact" className="hover:text-primary transition-colors" title="Location">
                <MapPin className="w-5 h-5" />
              </Link>
              <a href="tel:2125550194" className="hover:text-primary transition-colors" title="Call">
                <Phone className="w-5 h-5" />
              </a>
              <a href="mailto:reservations@cravo.com" className="hover:text-primary transition-colors" title="Email">
                <Mail className="w-5 h-5" />
              </a>
              <Link to="/admin/login" className="hover:text-primary transition-colors" title="Staff Portal">
                <ShieldCheck className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-display font-semibold text-base text-[#111c2d]">
              Explore
            </h4>
            <nav className="flex flex-col space-y-2 text-sm text-[#5a4138]">
              <Link to="/" className="hover:text-primary transition-colors">
                Home Overview
              </Link>
              <Link to="/menu" className="hover:text-primary transition-colors">
                Full Menu & Orders
              </Link>
              <Link to="/cart" className="hover:text-primary transition-colors">
                Cart & Checkout
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Location & Reservations
              </Link>
              <Link to="/admin/login" className="hover:text-primary transition-colors text-xs font-semibold text-primary pt-1">
                Admin & Staff Portal →
              </Link>
            </nav>
          </div>

          {/* Service Hours */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <h4 className="font-display font-semibold text-base text-[#111c2d]">
                Service Hours
              </h4>
            </div>
            <ul className="flex flex-col space-y-2 text-sm text-[#5a4138]">
              <li className="flex justify-between border-b border-[#e8e4dc]/50 pb-1">
                <span className="font-medium text-[#111c2d]">Tue – Thu:</span>
                <span>11:30 AM – 10:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-[#e8e4dc]/50 pb-1">
                <span className="font-medium text-[#111c2d]">Fri – Sat:</span>
                <span>11:30 AM – 11:30 PM</span>
              </li>
              <li className="flex justify-between border-b border-[#e8e4dc]/50 pb-1">
                <span className="font-medium text-[#111c2d]">Sunday:</span>
                <span>10:30 AM – 9:00 PM</span>
              </li>
              <li className="flex justify-between text-[#8e7166]">
                <span className="font-medium">Monday:</span>
                <span>Closed (Private Events)</span>
              </li>
            </ul>
          </div>

          {/* Visit Cravo */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <h4 className="font-display font-semibold text-base text-[#111c2d]">
                Visit Cravo
              </h4>
            </div>
            <p className="text-sm text-[#5a4138] leading-relaxed">
              482 Artisan Boulevard, Suite 100<br />
              Culinary Arts District, NY 10012
            </p>
            <div className="pt-2 text-sm text-[#5a4138] space-y-1">
              <p><span className="font-semibold text-[#111c2d]">Direct Line:</span> (212) 555-0194</p>
              <p><span className="font-semibold text-[#111c2d]">Concierge:</span> reservations@cravo.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#e8e4dc] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8e7166]">
          <p>© {new Date().getFullYear()} Cravo Kitchen & Bar. Built with Stitch AI Design System.</p>
          <div className="flex items-center gap-6">
            <span>Fresh Ingredients</span>
            <span>•</span>
            <span>Artisanal Kitchen</span>
            <span>•</span>
            <span>Direct Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
