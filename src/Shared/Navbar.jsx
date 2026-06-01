import React from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  House,
  Terminal,
  GraduationCap,
  Layers,
  Send,
  Code,
  User,
} from "lucide-react";
import "./Navbar.css";
import { Link } from "react-scroll";

export default function Navbar({ onContactClick }) {
  const [open, setOpen] = React.useState(false);

  const navItems = [
    { name: "Home", icon: <House size={18} /> },
    { name: "About", icon: <User size={18} /> },
    { name: "Skills", icon: <Terminal size={18} /> },
    { name: "Education", icon: <GraduationCap size={18} /> },
    { name: "Projects", icon: <Layers size={18} /> },
    { name: "Contact", icon: <Send size={18} /> },
  ];

  // Auto-close function for mobile menu
  const handleMobileClick = () => {
    setOpen(false);
  };

  return (
    <nav
      className="
      fixed left-1 right-1 top-0 z-50 py-2 
      flex justify-between items-center max-w-7xl mx-auto w-full px-6
      backdrop-blur-md bg-linear-to-r from-[#140021]/60 via-[#1a0033]/60 to-[#140021]/60
      border border-purple-500/30 rounded-xl mt-3
      shadow-[0_0_20px_rgba(138,43,226,0.15)]
    "
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2"
      >
        <img
          className="w-14 h-14 object-contain drop-shadow-[0_0_10px_#b026ff]"
          src="/main-logo.png"
          alt="Logo"
        />
        <h2
          className="text-xl font-bold bg-clip-text text-transparent 
          bg-linear-to-r from-fuchsia-400 via-purple-400 to-indigo-400"
        ></h2>
      </motion.div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex gap-10 font-medium items-center">
        {navItems.map((item) => (
          <motion.li
            key={item.name}
            whileHover={{ scale: 1.1 }}
            className="relative group text-white flex items-center gap-1"
          >
            {item.name === "Contact" ? (
              <button
                onClick={onContactClick} // এখানে ফাংশন কল হচ্ছে
                className="flex items-center gap-1 hover:text-fuchsia-400 transition cursor-pointer bg-transparent border-none"
              >
                {item.icon}
                {item.name}
              </button>
            ) : (
              <Link
                to={item.name}
                smooth={true}
                duration={1000}
                spy={true}
                offset={-80}
                className="flex items-center gap-1 hover:text-fuchsia-400 transition cursor-pointer"
              >
                {item.icon}
                {item.name}
              </Link>
            )}
            <div
              className="absolute bottom-0 left-0 w-full h-[2px] 
        bg-linear-to-r from-fuchsia-400 to-indigo-400 scale-x-0 
        group-hover:scale-x-100 transition-transform origin-left"
            ></div>
          </motion.li>
        ))}
      </ul>

      {/* Premium Resume Button */}
      <motion.a
        href="/Tanvir_Resume(2.0).pdf"
        download="Tanvir_Resume(2.0).pdf"
        whileHover={{ scale: 1.05 }}
        className="hidden lg:inline-block relative px-6 py-2 rounded-xl font-semibold overflow-hidden text-white cursor-pointer"
      >
        <span
          className="
            absolute inset-0 rounded-xl border-[2px] border-transparent
            bg-linear-to-r from-fuchsia-500 via-purple-500 to-indigo-500
            bg-[length:200%_200%] animate-gradient-shift
          "
        ></span>
        <span className="relative z-10 flex items-center gap-2">
          <Code size={18} />
          Resume
        </span>
      </motion.a>

      {/* Mobile Menu Toggle */}
      <div
        className="lg:hidden cursor-pointer text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            lg:hidden fixed top-24 left-1/2 -translate-x-1/2
            bg-[#140021]/95 backdrop-blur-xl 
            border border-purple-400/30 rounded-xl p-6
            flex flex-col gap-5 text-white font-semibold z-40
            shadow-[0_0_25px_rgba(168,85,247,0.4)]
          "
        >
          {navItems.map((item) => (
            <motion.li
              key={item.name}
              whileHover={{ scale: 1.07 }}
              className="flex items-center gap-2"
            >
              {item.name === "Contact" ? (
                <button
                  onClick={() => {
                    onContactClick();
                    handleMobileClick(); // mobile menu auto close
                  }}
                  className="flex items-center gap-2 bg-transparent border-none"
                >
                  {item.icon}
                  {item.name}
                </button>
              ) : (
                <Link
                  to={`${item.name}`}
                  smooth={true}
                  duration={1000}
                  spy={true}
                  offset={-80}
                  onClick={handleMobileClick}
                >
                  {item.name}
                </Link>
              )}
            </motion.li>
          ))}

          {/* Mobile Resume Button */}
          <motion.li whileHover={{ scale: 1.07 }}>
            <a
              href="/Tanvir_Resume (2.0).pdf"
              download="Tanvir_Resume (2.0).pdf"
              onClick={handleMobileClick}
              className="relative block px-6 py-2 rounded-xl font-semibold text-white overflow-hidden"
            >
              <span
                className="
                absolute inset-0 rounded-xl border-[2px] 
                bg-linear-to-r from-fuchsia-500 via-purple-500 to-indigo-500 
                bg-[length:200%_200%] animate-gradient-shift
              "
              ></span>
              <span className="relative z-10 flex gap-2 items-center justify-center">
                <Code size={18} />
                Resume
              </span>
            </a>
          </motion.li>
        </motion.ul>
      )}
    </nav>
  );
}
