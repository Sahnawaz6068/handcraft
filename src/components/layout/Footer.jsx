import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://facebook.com",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com",
    },
    {
      icon: FaXTwitter,
      href: "https://twitter.com",
    },
    {
      icon: FaLinkedinIn,
      href: "https://linkedin.com",
    },
  ];

  return (
    <footer className="border-t border-[#2D2926] bg-[#0F0E0D] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-[#D8C3A5]">
              HandCraft
            </h2>

            <p className="mt-5 leading-7 text-[#A8A29E]">
              Discover handcrafted jewellery from talented artisans across
              India. Every purchase supports independent creators and preserves
              traditional craftsmanship.
            </p>

            <div className="mt-8 flex gap-4">
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3A332C] bg-[#181614] text-[#D8C3A5] transition-all duration-300 hover:bg-[#A47551] hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-[#D8C3A5]">
              Marketplace
            </h3>

            <ul className="space-y-3 text-[#A8A29E]">
              <li>
                <Link href="#">Shop</Link>
              </li>
              <li>
                <Link href="#">Collections</Link>
              </li>
              <li>
                <Link href="#">New Arrivals</Link>
              </li>
              <li>
                <Link href="#">Best Sellers</Link>
              </li>
              <li>
                <Link href="#">Gift Cards</Link>
              </li>
            </ul>
          </div>

          {/* Seller */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-[#D8C3A5]">
              Sellers
            </h3>

            <ul className="space-y-3 text-[#A8A29E]">
              <li>
                <Link href="#">Become a Seller</Link>
              </li>
              <li>
                <Link href="#">Seller Dashboard</Link>
              </li>
              <li>
                <Link href="#">Seller Guidelines</Link>
              </li>
              <li>
                <Link href="#">Commission</Link>
              </li>
              <li>
                <Link href="#">Help Center</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-[#D8C3A5]">
              Contact
            </h3>

            <div className="space-y-5 text-[#A8A29E]">
              <div className="flex items-center gap-3">
                <Mail className="text-[#A47551]" size={18} />
                <span>hello@handcraft.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-[#A47551]" size={18} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 text-[#A47551]" size={18} />
                <span>
                  Jaipur,
                  <br />
                  Rajasthan, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 rounded-3xl border border-[#3A332C] bg-[#181614] p-8">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div>
              <h3 className="text-2xl font-semibold">
                Join Our Newsletter
              </h3>

              <p className="mt-2 text-[#A8A29E]">
                Receive updates about new artisan collections and exclusive
                offers.
              </p>
            </div>

            <form className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-l-full border border-[#3A332C] bg-[#0F0E0D] px-5 py-4 text-white outline-none placeholder:text-[#7B746D]"
              />

              <button
                type="submit"
                className="rounded-r-full bg-[#A47551] px-8 font-semibold text-white transition hover:bg-[#8B5E3C]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#2D2926]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-[#8F8A84] md:flex-row">
          <p>© 2026 HandCraft. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;