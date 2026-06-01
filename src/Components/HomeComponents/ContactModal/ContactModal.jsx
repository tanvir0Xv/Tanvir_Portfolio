import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MessageCircle,
  Linkedin,
  X,
  Facebook,
  Github,
} from "lucide-react";
import Lottie from "lottie-react";
import useAxiosInstance from "../../../Hooks/useAxiosInstance";
import contactAnimated from "/public/contactAnimation.json";

const iconMap = { Phone, Mail, MessageCircle, Linkedin, Facebook, Github };

export default function ContactModal({ onClose }) {
  const axiosInstance = useAxiosInstance();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch contact data
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axiosInstance.get("/contact");
        setContacts(res.data); // expected: type, value, icon, href
      } catch (err) {
        console.error(err);
        setError("Failed to load contact info");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, [axiosInstance]);

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 text-white">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 text-red-500">
        {error}
      </div>
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white/10 backdrop-blur-lg rounded-3xl max-w-2xl w-full text-white shadow-2xl p-6 md:p-10 flex flex-col items-center"
      >
        {/* Cross Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <X size={28} />
        </button>

        {/* Lottie Animation */}
        <div className="w-40 h-40 md:w-80 md:h-48 mb-10">
          <Lottie animationData={contactAnimated} loop />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-fuchsia-500 mb-2 text-center">
          Get In Touch with Tanvir
        </h2>
        <p className="text-white/80 text-center mb-6">
          Your next project starts here. Please select your preferred method of
          contact below. I prioritize clear communication.
        </p>

        <div className="flex flex-col md:flex-row md:flex-wrap gap-4 w-full max-h-[400px] overflow-y-auto md:overflow-y-hidden">
          {contacts.map((contact, idx) => (
            <motion.a
              key={idx}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{
                x: window.innerWidth >= 768 ? -50 : 0,
                y: window.innerWidth < 768 ? 50 : 0,
                opacity: 0,
              }}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 flex-1 min-w-[220px]"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-indigo-500 shadow-lg">
                {React.createElement(iconMap[contact.icon], {
                  size: 28,
                  className: "text-white",
                })}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg">{contact.type}</span>
                <span className="text-white/70 text-sm">{contact.value}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
